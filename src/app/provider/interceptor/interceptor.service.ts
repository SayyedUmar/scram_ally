import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IAppState } from 'src/app/provider/business-model/index';
import { AuthenticationService } from '../auth/authentication.service';
import { CommonAPIService } from '../common-api/common-api.service';
import { LogfileService } from '../common-file/logfile.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  localToken: any;
  
  constructor(private router: Router, public toastController: ToastController,
    private store: Store<IAppState>, private commonAPIService: CommonAPIService,
    private authenticationService: AuthenticationService,
    private logService: LogfileService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.interceptorMethod(request);
    this.logService.logInfo('InterceptorService', 'intercept()', 'localToken : ' + this.localToken);
    if (this.localToken) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.localToken ,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, HEAD, DELETE'
        }
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
      //TODO: revisit this code
      
        this.logService.logError('InterceptorService', 'intercept()', 'catchError : Common Error object in  interceptor ...' + JSON.stringify(error));
        this.authenticationService.refreshSession().then(res => {
          this.logService.logError('InterceptorService', 'intercept()', 'refreshSession: ' +res);
        }).catch(err => {
          this.logService.logError('InterceptorService', 'intercept()', 'catchError : refreshSession ' + JSON.stringify(err));
          if (err.status === 403) {
            this.authenticationService.logout();
            this.router.navigate(['auth']);
          }
        });

        if (error.status === 401) {
          this.logService.logError('InterceptorService', 'intercept()', 'Unauthorised interceptor ...');       
        }
        return throwError(error);
      }));
  }

  async interceptorMethod(request: HttpRequest<any>)
  {
    this.logService.logDebug('InterceptorService', 'interceptorMethod()', 'interceptorMethod started');   
    // this.store.select(selectToken).subscribe(data => {
    //   this.localToken = data;
    //   this.locationTrackingService.authToken = data;
    // });

    await this.authenticationService.isAuth0Authenticated();
    
    this.logService.logDebug('InterceptorService', 'interceptorMethod()',
    'this.authenticationService.isUserAuthenticated : '+ this.authenticationService.isUserAuthenticated + ", isAccessTokenExpired: " + this.authenticationService.isAccessTokenExpired());
    if(!this.authenticationService.isUserAuthenticated)
   {
      await this.authenticationService.refreshSession().then(res => {
        this.logService.logError('InterceptorService', 'intercept()', 'refreshSession: ' +res);  
      }).catch(err => {
        this.logService.logError('InterceptorService', 'interceptorMethod()', 'catchError : Common Error object in  interceptor ...' + JSON.stringify(err));   
        //TODO: Handle other exceptions  
        if (err.status === 403) {
          this.logService.logError('InterceptorService', 'interceptorMethod()', 'Unauthorised interceptor ...');
          this.authenticationService.logoutVictim();
          // this.router.navigate(['auth']);
        }
      });    
    }

    await this.authenticationService.getAccessToken().then(res => this.localToken = res);  
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
