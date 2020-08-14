import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { LogfileService } from '../common-file/logfile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  isLoggedIn: boolean;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private logService: LogfileService) {
    this.isLoggedIn = false;
  }
  async canActivate(): Promise<boolean> {
    await this.authenticationService.isAuth0Authenticated();
     this.logService.logInfo('AuthGaurdService', 'canActivate()', 'this.authenticationService.isUserAuthenticated : ' + this.authenticationService.isUserAuthenticated);
    if (this.authenticationService.isUserAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }

}
