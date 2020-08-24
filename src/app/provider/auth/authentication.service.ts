import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { AlertController, Events, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { UserDetails } from 'src/app/store/models/user-details.model';
import { IAppState } from 'src/app/provider/business-model/index';
import { environment } from 'src/environments/environment';
import { CommonAPIService } from '../common-api/common-api.service';
import { DeviceInfoService } from '../device-api/device-info.service';
import { LogfileService } from '../common-file/logfile.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

const { Device, CustomNativePlugin } = Plugins;


const host = environment.auth0Host;
const auth0Config: IonicAuthOptions = {
  // the auth provider
  authConfig: 'auth0',
  // The platform which we are running on
  platform: 'capacitor',
  // client or application id for provider
  clientID: environment.auth0ClientId,
  // the discovery url for the provider
  // OpenID configuration
  discoveryUrl: environment.auth0DiscoveryUrl,
  // the URI to redirect to after log in
  redirectUri: `${host}auth`,
  // requested scopes from provider
  scope: 'openid offline_access email picture profile',
  // the audience, if applicable
  audience: environment.auth0Audience,
  // the URL to redirect to after log out
  logoutUrl: `${host}auth`,
  // The type of iOS webview to use. 'shared' will use a webview that can share session/cookies
  // on iOS to provide SSO across multiple apps but will cause a prompt for the user which asks them
  // to confirm they want to share site data with the app. 'private' uses a webview which will not
  // prompt the user but will not be able to share session/cookie data either for true SSO across
  // multiple apps.
  iosWebView: 'shared'
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService extends IonicAuth implements OnDestroy {
  private commonAPIService: CommonAPIService;
  private router: Router;
  private store: Store<IAppState>;
  private userDetailsObj: UserDetails;
  public deviceInfo: any;
  public deviceInfoAuth: any;

  private deviceUniqueId: any;
  private phoneName: any;
  public simInfo: any;
  private loggedInUserDetails: any;
  private events: Events;
  private deviceInfoService: DeviceInfoService;
  private loadingIndicator: HTMLIonLoadingElement;
  private httpClient: HttpClient;
  private initialTokenValue: any;
  private deviceInformation: any;
  private alertController: AlertController;
  public isUserAuthenticated: boolean;
  public mobileConfig: any;

  constructor(router: Router, platform: Platform, commonAPIService: CommonAPIService, store: Store<IAppState>,
    deviceInfoService: DeviceInfoService,
    events: Events, handler: HttpBackend,
    alertController: AlertController, private logService: LogfileService,
    private uniqueDeviceID: UniqueDeviceID) {

    super(auth0Config);


    this.commonAPIService = commonAPIService;
    this.router = router;
    this.store = store;
    this.alertController = alertController;

    this.deviceInfoService = deviceInfoService;
    this.events = events;

    this.userDetailsObj = {
      name: '',
      email: '',
      emailVerified: false,
      nickname: '',
      picture: ''
    };

    this.httpClient = new HttpClient(handler);
  }

  ngOnDestroy(): void {
  }

  async attemptlogin(): Promise<void> {
    this.commonAPIService.showLoader('Signing in ...');
    this.logService.logDebug('AuthenticationService', 'login()', 'Signing in ...');
    //
    await this.login().then(() => {

    }).catch(err => {
      if (err.message === 'user is blocked') {
        this.presentAlertForInActiveVictim();
      } else {
        this.logService.logError('AuthenticationService', 'login()', 'Error while login.. : ' + JSON.stringify(err));
        // alert("Error while login");
      }
      this.logService.logError('AuthenticationService', 'login()', JSON.stringify(err));
    });

    this.commonAPIService.hideLoader();
  }

  async isAuth0Authenticated() {
    await this.isAuthenticated().then(response => {
      this.isUserAuthenticated = response;
      this.logService.logDebug('AuthenticationService', 'isAuth0Authenticated()', 'isAuth0Authenticated : ' + JSON.stringify(response));
    }
    );
  }


  async onLoginSuccess(): Promise<void> {
    this.commonAPIService.hideLoader();
    await this.isAuth0Authenticated();
    this.logService.logDebug('AuthenticationService', 'onLoginSuccess()', 'onLoginSuccess : ' + this.isUserAuthenticated);
    this.getUserInfo().then(info => {
      this.logService.logDebug('AuthenticationService', 'onLoginSuccess()', 'Auth User Info : ' + JSON.stringify(info));
      this.commonAPIService.setStorageValue('loggedInUserDetails', info);
    });
    await this.setToken();
  }

  async getUserInfo() {
    this.logService.logDebug('AuthenticationService', 'getUserInfo()', 'getUserInfo');
    return await super.getIdToken();
  }

  async setToken(): Promise<void> {
    const token = await this.getAccessToken();
    this.logService.logDebug('AuthenticationService', 'setToken()', 'token: ' + token);
    this.getDeviceName();
    this.getSimInformation();

    CustomNativePlugin.sendTokenToApp({ 'token': token });
    // const info = Device.getInfo();
    // await info.then((data) => {
    //   this.sendDeviceIMEItoNativeApp(data.uuid);
    //   this.logService.logDebug('AuthenticationService', 'setToken()', 'deviceInformation: ' + JSON.stringify(this.deviceInformation));
    // });

    this.uniqueDeviceID.get()
    .then((uuid: any) => {
      console.log('uniqueDeviceID',uuid)
      this.sendDeviceIMEItoNativeApp(uuid);
    })
    .catch((error: any) => console.log('uniqueDeviceID',error));

    if (token) {
      // this.router.navigateByUrl('/homepage');
      this.getVictimDetailsByAPI();
    }
  }

  sendDeviceIMEItoNativeApp(imei) {
    this.logService.logDebug('AuthenticationService', 'sendDeviceIMEItoNativeApp()', 'deviceImei: ' + imei);
    CustomNativePlugin.sendDeviceIMEItoApp({ 'deviceImei': imei });
  }

  // Check if Authenticated
  async checkAuthentication(): Promise<void> {
    const authenticated = await super.isAuthenticated().then(suc => {
      this.logService.logDebug('AuthenticationService', 'checkAuthentication()', 'Success: '
        + JSON.stringify(suc));
      this.setToken();
    }).catch(err => {
      this.logService.logError('AuthenticationService', 'checkAuthentication()', 'Error: ' + JSON.stringify(err));
    });
  }

  async logout(): Promise<void> {
    await super.logout().then(() => {
      this.logService.logDebug('AuthenticationService', 'logout()', 'Logged out successfully');
      this.commonAPIService.deleteStorageValue();

    });
  }

  getDeviceName() {
    this.phoneName = this.deviceInfoService.getDeviceName();
    this.logService.logDebug('AuthenticationService', 'getDeviceName()', 'Device Name : ' + this.phoneName);
  }

  getSimInformation() {
    this.deviceInfoService.checkHasReadPermissionForSim().then(res => {
      this.simInfo = res;
      this.logService.logDebug('AuthenticationService', 'getSimInformation()', 'Sim Information login : ' + this.simInfo);

    }).catch(err => {
      this.logService.logError('AuthenticationService', 'getSimInformation()', 'Sim Information Error : ' + JSON.stringify(err));
      this.simInfo = err;
    });
  }


  async presentAlertForInActiveVictim() {
    this.logService.logDebug('AuthenticationService', 'presentAlertForInActiveVictim', 'Account Inactivated!');
    const alert = await this.alertController.create({
      header: 'Account Inactivated!',
      // tslint:disable-next-line:max-line-length
      message: 'Your account has been inactivated. You will no longer be monitored. For more information, please contact your Primary Agent.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.logService.logInfo('AuthenticationService', 'presentAlertForInActiveVictim()', 'Logout');
            this.logoutVictim();
          },
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  logoutVictim() {
    this.logService.logInfo('AuthenticationService', 'logoutVictim', 'Logging out start');
    this.logout();
    this.router.navigate(['auth']);
    CustomNativePlugin.customStopService();
    this.commonAPIService.isServiceStarted = false;
    this.logService.logInfo('AuthenticationService', 'logoutVictim', 'Logged out end');
  }

  async getVictimDetailsByAPI() {

    this.loggedInUserDetails = await this.commonAPIService.getStorageValue('loggedInUserDetails');
    this.logService.logDebug('AuthenticationService', 'getVictimDetailsAndRegisterDevice', 'userInfo : '
      + JSON.stringify(this.loggedInUserDetails));
    this.commonAPIService.showLoader('Loading User Details');
    // Get Victim Details by email id
    this.commonAPIService.getData(environment.getVictimDetailsAPI + this.loggedInUserDetails.email).subscribe(async data => {

      this.commonAPIService.victimDetails = await data.body;
      this.commonAPIService.hideLoader();
      this.logService.logDebug('AuthenticationService', 'getVictimDetailsByAPI', 'called getVictimDetailsAPI with response :'
        + + JSON.stringify(data.body));

      if (data == null && data.body == null) {
        this.logoutVictim();
        alert('Issue fetching user details');
      }

      if (this.commonAPIService.victimDetails.status !== 'Active') {
        this.presentAlertForInActiveVictim();
        return;
      } else {
        this.logService.logDebug('AuthenticationService', 'getVictimDetailsAndRegisterDevice', 'calling checkDeviceRegistration');
      }
      // Call device Validation
      this.commonAPIService.setStorageValue('loggedInVictimDetails', this.commonAPIService.victimDetails);
      this.deviceValidationAPICall();

    }, err => {
      this.commonAPIService.hideLoader();
      this.logService.logError('AuthenticationService', 'getVictimDetailsAndRegisterDevice',
        'called getVictimDetailsAPI with failed response :' + JSON.stringify(err));
    });
  }

  async setDeviceValidationPayLoad(): Promise<boolean> {
    //await Device.getInfo().then(deviceInfo => this.deviceInfoAuth = deviceInfo);
    const uuid = await this.uniqueDeviceID.get()
    this.deviceInfoAuth = {uuid}

    this.logService.logDebug('AuthenticationService', ' setRegistrationPayLoad()', 'Setting Registration PayLoad');

    this.mobileConfig = {
      phoneType: '',
      appVersion: this.commonAPIService.appVersionNumber,
      deviceOS: '',
      deviceOSVersion: '',
      deviceImei: this.deviceInfoAuth.uuid, // device unique id is now device imei
      simNumber: '',
      phoneNumber: '',
      phoneSerialNumber: '',
      phoneName: '',
      carrier: '',
      systemMode: 2,
      locationFrequency: 1,
      transmissionFrequency: 1,
      csq: 0,
      dateTime: new Date().toJSON(),
      pushToken: 'NoToken',
      victimId: this.commonAPIService.victimDetails.victimId
    };

    this.logService.logDebug('AuthenticationService', ' setRegistrationPayLoad() ', 'Registration Messsage payload: ' +
      JSON.stringify(this.mobileConfig));
    return true;
  }

  async deviceValidationAPICall() {
    console.log('deviceValidationAPICall', this.mobileConfig)
    this.commonAPIService.showLoader('Validating device...');
    await this.setDeviceValidationPayLoad().then(async payloadResponse => {
      
      this.logService.logDebug('AuthenticationService', ' deviceValidationAPICall()', 'Registration PayLoad:');
      this.commonAPIService.postDataWithInterceptorObservable(environment.mobileDeviceValidateDevice, this.mobileConfig)
        .toPromise()
        .then(async response => {
          console.log('Validate Device : ');
          console.log(response);
          const apiReponse = await response;
          this.commonAPIService.hideLoader();

          if (response.body.length > 0) {
            this.alertConfirmDevices('Account already registered!', response.body[0], response.body[1], this.mobileConfig);
          } else {
            console.log('Call Device Registration');
            this.router.navigateByUrl('/homepage');
          }
          this.logService.logInfo('AuthenticationService', 'deviceRegistration',
            'Called deviceRegistrationAPI with response: ' + apiReponse);
          return true;
        }, err => {
          this.logService.logError('AuthenticationService', 'deviceRegistration', 'Called deviceRegistrationAPI with failed response: '
            + JSON.stringify(err));
          if (err.status === 406) {
            this.alertConfirmToDisplayLogout('Alert!', err.error[0]);
          }
          this.commonAPIService.hideLoader();
          // this.authenticationService.logoutVictim();
        });
    });
  }

  async alertConfirmDevices(title, body, nextMessage, mobileCofig) {
    const alert = await this.alertController.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('OK');
            this.alertConfirmToDisplayMessage('Alert!', nextMessage, mobileCofig);
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancelCLick) => {
            console.log('Confirm Cancel');
            this.logoutVictim();
          }
        }
      ],
      backdropDismiss: false
    });

    alert.onDidDismiss().then((dis) => {
      console.log(dis);
      console.log('Loading dismissed alert!');
    });

    await alert.present();
  }

  async alertConfirmToDisplayMessage(title, body, mobileConfig) {
    const alert = await this.alertController.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('OK');
            this.router.navigateByUrl('/homepage');
            // this.getAppSettingDetails();
            // this.callNewDeviceRegistrationAPI(mobileConfig);
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  async alertConfirmToDisplayLogout(title, body) {
    const alert = await this.alertController.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('OK');
            this.logoutVictim();
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }
}
