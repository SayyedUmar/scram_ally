import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins, PushNotificationToken } from '@capacitor/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Events, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/provider/business-model/index';
import { AuthenticationService } from './provider/auth/authentication.service';
import { CommonAPIService } from './provider/common-api/common-api.service';
import { DiagnosticCheckService } from './provider/diagnostic-check.service';
import { NotificationsService } from './provider/notification-api/notifications.service';


declare global  {
  interface PluginRegistry {
    CustomNativePlugin?: CustomNativePlugin;
  }
}

interface CustomNativePlugin {
  customCall(): Promise<any>;
  customStopService(): Promise<any>;
  sendTokenToApp(): Promise<any>;
  sendDeviceIMEItoApp(): Promise<any>;
  LogInfo(): Promise<any>;
  LogError(): Promise<any>;
  LogDebug(): Promise<any>;
  LogWarning(): Promise<any>;
  appendLog(): Promise<any>;
}

const { Network, CustomNativePlugin, PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public appPages = [
    {
      title: 'Home',
      url: '/homepage',
      icon: 'home'
    },
    {
      title: 'My Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'My Location',
      url: '/show-map',
      icon: 'pin'
    },
    {
      title: 'My Assigned Individuals',
      url: '/assigned-clients',
      icon: 'people'
    }
  ];
  victimName: string;
  victimEmail: string;
  victimDetails: any;
  appVersionNumber: any;
  public androidBackButtonSubscription: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public notificationsService: NotificationsService,
    private commonAPIService: CommonAPIService,
    public foregroundService: ForegroundService,
    public diagnosticCheckService: DiagnosticCheckService,
    private authenticationService: AuthenticationService,
    private store: Store<IAppState>,
    private appVersion: AppVersion,
    private events: Events,
    private appMinimize: AppMinimize,
    private backgroundMode: BackgroundMode,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();

  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy Method of app component');
    this.androidBackButtonSubscription.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log('initializeApp');
      this.initializePushResources();
      this.platform.resume.subscribe(data => {
        this.events.publish('autoRefreshAlertList', true);
        console.log('App resume');
        // this.commonAPIService.startTimer();
        setTimeout(() => {
          this.notificationsService.checkIsRemoteNotificationsEnabled();
        }, 2000);
      }, error => {
        console.log('Error in app resume..');
      });

      this.platform.pause.subscribe(() => {
        this.commonAPIService.pauseTimer();
        console.log('App paused');
      });

      Network.addListener('networkStatusChange', (status) => {
        console.log('Network status changed', status);
        this.commonAPIService.networkStatus = status;
      });

      this.initializeBackButtonCustomHandler();

      CustomNativePlugin.addListener('myCustomEvent', (info: any) => {
        console.log('Yoga myCustomEvent was fired');
        console.log('Yoga myCustomEvent Data:' + info);

      });

      Plugins.CustomNativePlugin.addListener('apiAuthFailedEvent', (info: any) => {
        console.log('Yoga apiAuthFailedEvent was fired');
        console.log('Yoga apiAuthFailedEvent Data:' + info);

      });
    });

    CustomNativePlugin.addListener('locationPermissionFailed', (info: any) => {
      console.log('Yoga locationPermissionFailed was fired');
      console.log('Yoga locationPermissionFailed Data:' + info);
    });

    CustomNativePlugin.addListener('locationPermissionStatus', (info: any) => {
      console.log('locationPermissionStatus fired');
      console.log('locationPermissionStatus Data:' + info);
    });
    CustomNativePlugin.addListener('stopServiceMesssage', (info: any) => {
      if (info.data.includes("inactivated")) {
        this.authenticationService.alertConfirmToDisplayLogout('Account Inactivated!', info.data.replace(/['"]+/g, ''));
      } else {
        this.authenticationService.alertConfirmToDisplayLogout('Alert!', info.data.replace(/['"]+/g, ''));
      }
      console.log('stopServiceMesssage Data:' + info);
      this.commonAPIService.isServiceStarted = false;
    });

    window.addEventListener('sendBroadcastAllPermCustom', () => {
      console.log('sendBroadcastAllPermCustom');
      this.commonAPIService.setStorageValue('isAllPermissionGranted', true);
      this.checkIfTermsAndConditionAccepted();
    });

  }

  initializeBackButtonCustomHandler(): void {
    this.androidBackButtonSubscription = this.platform.backButton.subscribeWithPriority(
      999999,
      () => {
        if (this.router.url === '/homepage/critical') {
          console.log('Its a Home Page. Can not go back');
          this.appMinimize.minimize();
        } else {
          window.history.back();
        }
      }
    );
  }

  openProfile() {
    this.router.navigateByUrl('/profile');
  }

  logOutCall() {
    this.authenticationService.logout();
    this.router.navigate(['auth']);
    CustomNativePlugin.customStopService();
  }

  async ngOnInit() {

    // Get the current network status
    this.commonAPIService.networkStatus = await Network.getStatus();

    this.commonAPIService.isServiceStarted = false;

    console.log('Connection status in app component : ' + this.commonAPIService.networkStatus + ", networkStatus.connected: " + this.commonAPIService.networkStatus.connected);
    if (this.commonAPIService.networkStatus.connected) {
      this.checkIfAllPermissionGranted();
    } else {
      this.commonAPIService.presentToast('Please check your internet connectivity');
    }

    this.appVersion.getVersionNumber().then(res => {
      this.commonAPIService.appVersionNumber = res;
      this.appVersionNumber = 'v' + this.commonAPIService.appVersionNumber;
      console.log('App Version Number : ' + this.commonAPIService.appVersionNumber);
    });

  }

  ifAllPermissionsGranted() {
    if (this.commonAPIService.networkStatus.connected) {
      this.authenticationService.checkAuthentication();
    } else {
      this.commonAPIService.presentToast('Please check your internet connectivity');
    }
  }

  async checkIfAllPermissionGranted() {
    await this.commonAPIService.getStorageValue('isAllPermissionGranted').then(res => {
      console.log('isAllPermissionGranted : ' + res);

      if (res) {
        this.checkIfTermsAndConditionAccepted();
      } else {
        console.log('No all permissions granted...');
      }
    });
  }

  async checkIfTermsAndConditionAccepted() {
    await this.commonAPIService.getStorageValue('isTermsAndCondAccepted').then(res => {
      console.log('isTermsAndCondAccepted : ' + res);
      if (res) {
        this.ifAllPermissionsGranted();
      } else {
        console.log('Terms & Condition are not accepted!');
      }
    });
  }

  initializePushResources() {

    PushNotifications.register();
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {

        if (token) {
          this.commonAPIService.globalPushToken = token;
          this.commonAPIService.setStorageValue('pushTokenId', token);
          console.log('App ComponentLocal Token:');
          console.log(token);
        }
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {

    });
  }

}
