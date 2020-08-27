import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PluginListenerHandle, Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken } from '@capacitor/core';
import { Badge } from '@ionic-native/badge/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Events, MenuController, ModalController, AlertController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DialNumberPage } from 'src/app/modal/dial-number/dial-number.page';
import { AuthenticationService } from 'src/app/provider/auth/authentication.service';
import { BusinessModelService } from 'src/app/provider/business-model/business-model.service';
import { IAppState } from 'src/app/provider/business-model/index';
import { CommonAPIService } from 'src/app/provider/common-api/common-api.service';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';
import { DeviceInfoService } from 'src/app/provider/device-api/device-info.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

import { environment } from 'src/environments/environment';
import { stringify } from 'querystring';
import { JsonPipe } from '@angular/common';
// import { FCM } from '@ionic-native/fcm/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NotificationsService } from '../../provider/notification-api/notifications.service';

const { PushNotifications, Device, LocalNotifications, CustomNativePlugin, Network } = Plugins;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss']
})
export class HomepagePage implements OnInit {
  flag: boolean;

  ringing = 0;
  isReceived = false;
  public deviceInfo: any;
  public deviceInfoNew: any;
  public mobileConfig: any;
  private deviceUniqueId: any;

  private pushListeners: PluginListenerHandle[] = [];
  pushNotificationToken$: Observable<string>;
  pushNotificationTokenError$: Observable<boolean>;
  private pushNotificationToken: PushNotificationToken;
  pushDidInitialize = false;
  pushTokenNewId: string = "";
  pushTokenId: string = "";
  deviceId: string = "";
  deviceNewId: string = "";
  errorMessage: string = "";
  emailId: string = "";
  isClientAssigned: boolean = false;

  Events: [
    {
      MessageType: string;
      DateTime: string;
      Event: string;
      data: string;
    }
  ];

  uniqueDeviceId: any;
  commonObj: any;
  locationInfo: any;

  // Swipe variables
  getSlider: any;
  getBtn: any;
  panicBtnValue: string;

  allEventAlertList: [];
  seriousBadgeCount: number = 0;
  criticalBadgeCount: number = 0;
  warningBadgeCount: number = 0;
  messageBadgeCount: number = 0;
  daysToKeepEvents: number = 0;
  assignedClientsList: any;

  totalUnreadCount: any;
  isTappedPressed = false;

  resetSwipeButton = Observable.create(function (observer) {
    this.getSlider = document.getElementById('slider');
    this.getSlider.style.marginLeft = '';
    this.getSlider.style.transition = '0s';
    this.getBtn = document.getElementById('button-background');
    this.getBtn.classList.add('resetEffect');
    let addText = document.getElementsByClassName('slide-text');
    addText[0].textContent = 'Swipe to dial ' + this.panicBtnValue;
  });


  constructor(
    private menuCtrl: MenuController, private businessModelService: BusinessModelService,
    private deviceInfoService: DeviceInfoService, private commonAPIService: CommonAPIService,
    private callNumber: CallNumber, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation,
    public modalController: ModalController,
    private events: Events, public router: Router, private zone: NgZone, private changeDetectorRef: ChangeDetectorRef,
    private store: Store<IAppState>, private authenticationService: AuthenticationService,
    private badge: Badge, private logService: LogfileService, public alertController: AlertController,
    private uniqueDeviceID: UniqueDeviceID,
    // private fcm: FCM,
    private diagnostic: Diagnostic,
    private platform: Platform,
    public notificationsService: NotificationsService,
    ) {

      console.log

      this.uniqueDeviceID.get()
  .then((uuid: any) => console.log('uniqueDeviceID',uuid))
  .catch((error: any) => console.log('uniqueDeviceID',error));

    this.getVictimDetailsFromStorage();
    this.pushNotificationToken = this.commonAPIService.globalPushToken;
    // TODO: Check position of this code
    this.logService.logDebug('HomePage', 'constructor', "Home Page started");
    this.getTourValue();

    this.daysToKeepEvents = 0;

    this.badge.hasPermission().then(res => {
      console.log('Badge Permission check');
      console.log(res);
      this.badge.requestPermission().then(res2 => {
        console.log('Badge requestPermission check');
        console.log(res2);
      });
    }).catch(err => {
      console.log('Badge error : ');
      console.log(err);
    });

    this.eventSubscribtions();
    this.resetSwipeButtonInit();

    this.seriousBadgeCount = this.commonAPIService.seriousBadgeCount;
    this.criticalBadgeCount = this.commonAPIService.criticalBadgeCount;
    this.warningBadgeCount = this.commonAPIService.warningBadgeCount;
    this.messageBadgeCount = this.commonAPIService.messageBadgeCount;

  }

  async getVictimDetailsFromStorage() {
    this.commonAPIService.victimDetails = await this.commonAPIService.getStorageValue('loggedInVictimDetails');
    this.sendVictimDetailsToNativeApp(this.commonAPIService.victimDetails);
  }

  eventSubscribtions() {

    this.commonAPIService.victimDetails = this.commonAPIService.getStorageValue('loggedInVictimDetails');
    this.logService.logDebug('HomePage', 'eventSubscribtions', "Event Subscribed");
    this.events.subscribe('update:count', (data) => {
      this.logService.logDebug('HomePage', 'eventSubscribtions', 'update:count : ' + data);
      this.manageBadgeCount(data);
    });

    this.events.subscribe('allAlertsDeleted', (data) => {
      this.logService.logDebug('HomePage', 'eventSubscribtions', 'allAlertsDeleted called');
      this.getAllAlertEventList();
    });

    this.events.subscribe('panicBtnValue', (data) => {
      this.logService.logDebug('HomePage', 'eventSubscribtions', 'panicBtnValue : ' + data);
      this.panicBtnValue = data;
    });

    this.events.subscribe('autoRefreshAlertList', (data) => {
      console.log('autoRefreshAlertList called');
      this.logService.logDebug('HomePage', 'autoRefreshAlertList', 'autoRefreshAlertList called');
      if (!this.isTappedPressed) {
        this.getAllAlertEventListAfterNotification();
      }
    });

  }

  async ngOnInit() {

    const info = await Device.getInfo();
    this.deviceInfo = info
    const uuid = await this.uniqueDeviceID.get()
    this.deviceInfo = {...info, uuid}
    this.setSwipeButton();

    this.commonAPIService.victimDetails = await this.commonAPIService.getStorageValue('loggedInVictimDetails');
    this.sendVictimDetailsToNativeApp(this.commonAPIService.victimDetails);

    PushNotifications.requestPermission().then(result => {
      if (result) {
        // Register with Apple / Google to receive push via APNS/FCM

        this.logService.logInfo('HomePage', 'PushNotifications.requestPermissions()',
          'PushNotifications.requestPermissions success');

        this.initializePushResources();
      } else {
        // Show some error
        this.getVictimDetailsAndRegisterDevice();
        this.logService.logError('HomePage', 'PushNotifications.requestPermissions()',
          'Error in Requesting PushNotifications.requestPermissions');
      }
    });

    this.resetSwipeButton.subscribe(a => this.logService.logDebug('HomePage', 'eventSubscribtions', 'resetSwipeButton subscribed'));
    
    // CustomNativePlugin.addListener('onViewWillAppear', (info: any) => {
    //   console.log('onViewWillAppear Data:', info);
    // });
    // CustomNativePlugin.addListener('onViewDidAppear', (info: any) => {
    //   console.log('onViewDidAppear Data:', info);
    // });

    this.platform.resume.subscribe(data => {
      this.events.publish('autoRefreshAlertList', true);
      console.log('App resume');
      this.checkPermissions()
    }, error => {
      console.log('Error in app resume..');
    });

    this.platform.pause.subscribe(() => {
      this.commonAPIService.pauseTimer();
      console.log('App paused');
    });

    setTimeout(()=> this.checkPermissions(), 2000)
    this.commonAPIService.startTimer();
  }

  async checkPermissions () {
    const network = await Network.getStatus();
    if (network.connected === false ) {
      this.commonAPIService.presentOkAlert("No Internet", "Please check your internet connection!", () => {
        this.notificationsService.checkIsRemoteNotificationsEnabled();
      })
    } else {
        this.notificationsService.checkIsRemoteNotificationsEnabled();
    }
  }

  async getVictimDetailsAndRegisterDevice() {
    this.logService.logDebug('HomePage', 'getVictimDetailsAndRegisterDevice()', 'getVictimDetailsAndRegisterDevice call started');

    var userInfo = await this.commonAPIService.getStorageValue('loggedInUserDetails');
    this.logService.logDebug('HomePage', 'getVictimDetailsAndRegisterDevice', "userInfo : " + JSON.stringify(userInfo));

    // Get Victim Details by email id
    this.getAssignedClientsList();
    this.checkDeviceRegistration(this.commonAPIService.victimDetails.victimId).then(regResponse => {
      if (regResponse) {
        // For Android Native service call
        this.logService.logDebug('HomePage', 'getVictimDetailsAndRegisterDevice', 'Is this.commonAPIService.isServiceStarted : ' +
          this.commonAPIService.isServiceStarted);
        if (!this.commonAPIService.isServiceStarted) {
          console.log('customCall 2')
          CustomNativePlugin.customCall({victimId: this.commonAPIService.victimDetails.victimId});
          CustomNativePlugin.IsMobileDataEnabled().then(res => {
            console.log('IsMobileDataEnabled : ');
            console.log(res);
          });
          this.commonAPIService.isServiceStarted = true;
          this.logService.logDebug('HomePage', 'getVictimDetailsAndRegisterDevice', 'Is this.commonAPIService.isServiceStarted : ' +
            this.commonAPIService.isServiceStarted);
        }
      }
    });
    this.logService.logDebug('HomePage', 'getVictimDetailsAndRegisterDevice()', 'getVictimDetailsAndRegisterDevice call ended');
  }



  async checkDeviceRegistration(victimId: string): Promise<boolean> {
    this.logService.logDebug('HomePage', 'checkDeviceRegistration()', 'checkDeviceRegistration call started');
    this.deviceId = await this.commonAPIService.getStorageValue('deviceId');

    this.logService.logDebug('HomePage', ' checkDeviceRegistration()', ' deviceId ' + this.deviceId + ", New ID: "
      + this.deviceInfoService.uuid);

    this.pushTokenId = await this.commonAPIService.getStorageValue('pushTokenId');
    this.logService.logDebug('HomePage', ' checkDeviceRegistration()', ' pushTokenId ' + this.pushTokenId);
    // this.logService.logDebug('HomePage', ' checkDeviceRegistration()', ' pushTokenId ' + this.pushTokenId + ", New ID: " 
    // + this.pushNotificationToken.value);

    this.logService.logDebug('HomePage', ' checkDeviceRegistration()', 'Device registration started');
    this.commonAPIService.showLoader('Loading data...');
    var isPayload = await this.setRegistrationPayLoad().then(async payloadResponse => {
      this.logService.logDebug('HomePage', ' checkDeviceRegistration()', 'Registration PayLoad:' + isPayload);
      this.commonAPIService.hideLoader();
      var isDeviceRegistered = await this.deviceRegistration(this.mobileConfig).then(deviceRegistrationResponse => {
        this.logService.logDebug('HomePage', ' checkDeviceRegistration()', 'isDeviceRegistered:' + isDeviceRegistered);

      });
    }).catch(err => {
      this.commonAPIService.hideLoader();
      console.log(err);
    });

    this.logService.logDebug('HomePage', 'checkDeviceRegistration()', 'checkDeviceRegistration call Ended');
    return true;
  }


  async setRegistrationPayLoad(): Promise<boolean> {
    this.logService.logDebug('HomePage', ' setRegistrationPayLoad()', 'Setting Registration PayLoad');

    this.mobileConfig = {
      phoneType: this.deviceInfo.manufacturer,
      appVersion: this.commonAPIService.appVersionNumber,
      deviceOS: this.deviceInfoService.os,
      deviceOSVersion: this.deviceInfo.osVersion,
      deviceImei: this.deviceInfo.uuid, // device unique id is now device imei
      // deviceImei: '7959c215e50160f2',
      simNumber: this.authenticationService.simInfo ? this.authenticationService.simInfo.simSerialNumbe : "",
      phoneNumber: this.authenticationService.simInfo ? this.authenticationService.simInfo.phoneNumber : "",
      phoneSerialNumber: this.authenticationService.simInfo ? this.authenticationService.simInfo.deviceId : "",
      phoneName: this.getDeviceName(),
      carrier: this.authenticationService.simInfo ? this.authenticationService.simInfo.carrierName : "",
      systemMode: 2,
      locationFrequency: 1,
      transmissionFrequency: 1,
      csq: 0,
      dateTime: new Date().toJSON(),
      pushToken: (typeof this.pushNotificationToken != 'undefined' && this.pushNotificationToken!=null) ? this.pushNotificationToken.value : 'NoToken',
      victimId: this.commonAPIService.victimDetails.victimId
    };

    this.logService.logDebug('HomePage', ' setRegistrationPayLoad() ', "Registration Messsage payload: " + JSON.stringify(this.mobileConfig));
    return true;
  }

  async deviceRegistration(mobileConfig): Promise<boolean> {
    this.logService.logDebug('HomePage', 'deviceRegistration()', 'deviceRegistration call started');
    this.commonAPIService.showLoader('Loading data...');
    this.logService.logDebug('HomePage', 'deviceRegistration', 'Calling deviceRegistrationAPI : ' +
      environment.gatewayUrl + environment.mobileDeviceConfigurationAPI);

    console.log('deviceRegistration', this.mobileConfig)
    //this.commonAPIService.postDataWithInterceptorObservable(environment.mobileDeviceConfigurationAPI, mobileConfig)
    this.commonAPIService.postDataWithInterceptorObservable(environment.mobileDeviceRegisterDevice, mobileConfig)
      .toPromise()
      .then(async response => {
        console.log('Validate Device : ');
        console.log(response);
        var apiReponse = await response;
        this.commonAPIService.hideLoader();
        this.logService.logInfo('HomePage', 'deviceRegistration', 'Called deviceRegistrationAPI with response: ' + apiReponse);

        this.commonAPIService.setStorageValue('deviceId', this.deviceInfo.uuid);
        this.commonAPIService.setStorageValue('pushTokenId', mobileConfig.pushToken);
        await this.getAppSettingDetails();
        return true;
      }, err => {
        this.logService.logError('HomePage', 'deviceRegistration', 'Called deviceRegistrationAPI with failed response: '
          + JSON.stringify(err));
        this.errorMessage = 'Device registration failed..';
        this.commonAPIService.hideLoader();
        // this.authenticationService.logoutVictim();

      });
    this.logService.logDebug('HomePage', 'deviceRegistration()', 'deviceRegistration call Ended');
    return false;
  }


  async getAppSettingDetails(): Promise<any> {
    this.logService.logDebug('HomePage', 'getAppSettingDetails()', 'getAppSettingDetails call started');
    this.commonAPIService.showLoader('Loading data...');
    // Get Configuration data

    this.logService.logDebug('HomePage', 'getAppSettingDetails()', "Calling VictimConfiguration API : " +
      environment.gatewayUrl + environment.victimConfigurationAPI + this.commonAPIService.victimDetails.victimId);

    this.commonAPIService.getData(environment.victimConfigurationAPI +
      this.commonAPIService.victimDetails.victimId).toPromise().then(async data => {
        this.commonAPIService.appConfiguration = await data.body;

        this.logService.logDebug('HomePage', 'getAppSettingDetails()',
          'Called VictimConfiguration API with response: ' + JSON.stringify(this.commonAPIService.appConfiguration));

        if (this.commonAPIService.appConfiguration && this.commonAPIService.appConfiguration) {

          this.panicBtnValue = await this.commonAPIService.appConfiguration.panicButtonPhoneNumber;

          this.events.publish('panicBtnValue', this.commonAPIService.appConfiguration.panicButtonPhoneNumber);

          this.daysToKeepEvents = this.commonAPIService.appConfiguration.daysToKeepEvents;

          await this.getAllAlertEventList();

        } else {
          //TODO: discuss with Ron what should be the action if configuration is not returning value
        }
        this.commonAPIService.hideLoader();
      }, err => {
        this.commonAPIService.hideLoader();
        this.logService.logError('HomePage', 'getAppSettingDetails()', "Called VictimConfiguration API with failed response : " + JSON.stringify(err));
      });
    this.logService.logDebug('HomePage', 'getAppSettingDetails()', 'getAppSettingDetails call ended');
  }

  async getAllAlertEventList(): Promise<any> {

    this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'getAllAlertEventList call started');
    this.commonAPIService.isLoadingData = true;
    this.commonAPIService.showLoader('Loading data...');
    // this.seriousBadgeCount = 0;
    // this.criticalBadgeCount = 0;
    // this.warningBadgeCount = 0;
    // this.messageBadgeCount = 0;
    // this.totalUnreadCount = 0;

    if (this.daysToKeepEvents === 0) {
      this.daysToKeepEvents = 31;
    }

    this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'Calling alertEventsListAPI :' +
      environment.gatewayUrl + environment.alertEventsListAPI + this.commonAPIService.victimDetails.victimId + '/' + this.daysToKeepEvents);

    this.commonAPIService.getData(environment.alertEventsListAPI +
      this.commonAPIService.victimDetails.victimId + '/' + this.daysToKeepEvents).toPromise().then(async data => {

        this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'Called alertEventsListAPI : with response : ');

        this.allEventAlertList = await data.body;
        this.commonAPIService.allAlertListCombineData = await data.body;
        this.seriousBadgeCount = 0;
        this.criticalBadgeCount = 0;
        this.warningBadgeCount = 0;
        this.messageBadgeCount = 0;
        this.totalUnreadCount = 0;

        if (this.allEventAlertList) {

          data.body.forEach((item, index) => {
            if ((!item.readBy) && item.exceptionLevel === 'Serious') {
              this.seriousBadgeCount = this.seriousBadgeCount + 1;
              this.commonAPIService.seriousBadgeCount = this.seriousBadgeCount;
            }

            if ((!item.readBy) && item.exceptionLevel === 'Critical') {
              this.criticalBadgeCount = this.criticalBadgeCount + 1;
              this.commonAPIService.criticalBadgeCount = this.criticalBadgeCount;
            }

            if ((!item.readBy) && item.exceptionLevel === 'Warning') {
              this.warningBadgeCount = this.warningBadgeCount + 1;
              this.commonAPIService.warningBadgeCount = this.warningBadgeCount;
            }

            if ((!item.readBy) && item.exceptionLevel === 'Message') {
              this.messageBadgeCount = this.messageBadgeCount + 1;
              this.commonAPIService.messageBadgeCount = this.messageBadgeCount;
            }
            this.totalUnreadCount = this.warningBadgeCount + this.messageBadgeCount
              + this.seriousBadgeCount + this.criticalBadgeCount;
          });
          this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'totalUnreadCount :  before' + this.totalUnreadCount);

          // this.totalUnreadCount = await this.allEventAlertList.length;
          this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'totalUnreadCount : after ' + this.totalUnreadCount);

          this.commonAPIService.totalUnreadBadgeCount = this.totalUnreadCount;
          this.badge.set(this.commonAPIService.totalUnreadBadgeCount);

          this.events.publish('allEventAlertList', data.body);

          if (this.totalUnreadCount <= 0) {
            this.badge.clear();
          }

          this.zone.run(() => {
            this.seriousBadgeCount = this.seriousBadgeCount;
            this.criticalBadgeCount = this.criticalBadgeCount;
            this.warningBadgeCount = this.warningBadgeCount;
            this.messageBadgeCount = this.messageBadgeCount;

            this.allEventAlertList = data.body;
          });
        }
        this.commonAPIService.isLoadingData = false;

        this.sendDeviceIMEItoNativeApp(this.deviceInfo.uuid);

        this.commonAPIService.hideLoader();
      }, err => {
        // TODO: if exception what should be the action
        // tslint:disable-next-line:max-line-length
        this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'Called alertEventsListAPI : with failed response : ' + JSON.stringify(err));
        this.commonAPIService.isLoadingData = false;
        this.commonAPIService.hideLoader();
      });
    this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'getAllAlertEventList call Ended');
  }


  async doRefresh(event) {
    this.logService.logDebug('HomePage', 'doRefresh()', 'event: ' + event);
    this.getAllAlertEventList();
    event.target.complete();

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    // tslint:disable-next-line: deprecation
    this.menuCtrl.swipeEnable(false);
  }

  setSwipeButton() {
    setTimeout(() => {
      this.getSlider = document.getElementById('slider');
      this.getSlider.style.marginLeft = '';
      this.getSlider.style.transition = '0s';
      this.getBtn = document.getElementById('button-background');
      this.getBtn.classList.add('resetEffect');
      let addText = document.getElementsByClassName('slide-text');
      addText[0].textContent = 'Swipe to dial ' + this.panicBtnValue;
      // this.changeDetectorRef.detectChanges();
    }, (6500));
  }

  resetSwipeButtonInit() {
    setTimeout(() => {
      this.getSlider = document.getElementById('slider');
      this.getSlider.style.marginLeft = '';
      this.getSlider.style.transition = '0s';
      this.getBtn = document.getElementById('button-background');
      this.getBtn.classList.add('resetEffect');
      let addText = document.getElementsByClassName('slide-text');
      addText[0].textContent = 'Swipe to dial ' + this.panicBtnValue;
      // this.changeDetectorRef.detectChanges();
    }, (500));
  }

  setEvent() {
    this.logService.logDebug('HomePage', 'setEvent()', 'setEvent');
    return new Promise((resolve, reject) => {
      this.Events[0].MessageType = 'Button Pressed';
      this.Events[0].DateTime = (new Date()).toUTCString();
      this.Events[0].Event = 'Panic Button Pressed';
      resolve(this.Events);
    }).catch(e => {

      this.logService.logDebug('HomePage', 'setEvent()', 'Error setEvent: ' + JSON.stringify(e))
    });
  }

  openDialPad(panicBtnValue) {
    this.logService.logDebug('HomePage', 'openDialPad()', 'openDialPad');
    this.callNumber.callNumber(panicBtnValue, false)
      .then(res =>
        this.logService.logDebug('HomePage', 'openDialPad()', 'Launched dialer! ' + JSON.stringify(res))
      )
      .catch(err =>
        this.logService.logDebug('HomePage', 'openDialPad()', 'Error launching dialer: ' + JSON.stringify(err))
      );
  }

  callPanicAPI(location) {
    this.logService.logDebug('HomePage', 'callPanicAPI()', 'callPanicAPI');
    const eventObj = {
      dateTimePressed: new Date().toJSON(),
      victimId: this.commonAPIService.victimDetails.victimId,
      numberDailed: this.panicBtnValue
    };

    this.logService.logDebug('HomePage', 'callPanicAPI()', JSON.stringify(eventObj));

    this.commonAPIService.postPanicButton(eventObj, location).toPromise().then((data) => {
      this.logService.logInfo('HomePage', 'postPanicButton_Response', 'success API postPanicButton: ' + data);
      // this.resetSwipeButton();
      this.swipeButtonInit();
      this.commonAPIService.hideLoader();
      this.openDialPad(this.panicBtnValue);
    }, err => {
      // this.resetSwipeButton();
      this.swipeButtonInit();
      this.commonAPIService.hideLoader();
      this.logService.logError('HomePage', 'callPanicAPI', 'Error:' + JSON.stringify(err));
    });
  }

  // Swipe events

  fireEvent1(data, flag) {
    if (!flag) {
      this.logService.logDebug('HomePage', 'fireEvent1', 'fireEvent1: ' + data);
      this.flag = true;
    }
  }

  touchend(event) {
    this.logService.logDebug('HomePage', 'touchend', 'Touch End Called');
    this.flag = false;
    this.sendPanicButtonValToNativeApp(this.panicBtnValue, this.deviceInfo.uuid, this.commonAPIService.victimDetails);
    let timer = setTimeout(() => {
      this.fireEvent1('End Event Called Success.Now Excute Your Code', this.flag);
      let removeText = document.getElementsByClassName('slide-text');
      removeText[0].textContent = '';
      this.openDialPad(this.panicBtnValue);
      this.swipeButtonInit();
    }, 3000);
    clearTimeout(3000);
  }

  touchmove(event) {
    this.logService.logDebug('HomePage', 'touchmove', 'touchmove event: ' + event);
    this.getSlider = document.getElementById('slider');
    this.getSlider.style.marginLeft = event.changedTouches[0].clientX + 'px';
    this.getSlider.style.transition = '3s';

    // add effect
    this.getBtn = document.getElementById('button-background');
    this.getBtn.classList.remove('resetEffect');
    this.getBtn.classList.add('setEffect');
    let root = document.documentElement;

    // set icon to width of button
    let t = document.getElementById('button-background');
    // this.getSlider.style.marginLeft = (t.clientWidth - 50) + 'px';
    // root.style.setProperty('--sg', (t.clientWidth - 20) + 'px');

    this.getSlider.style.marginLeft = (t.clientWidth - 50) + 'px';
    root.style.setProperty('--sg', (t.clientWidth - 20) + 'px');
  }


  async swipeButtonInit() {
    this.logService.logDebug('HomePage', 'swipeButtonInit()', 'swipeButtonInit');
    this.getSlider = document.getElementById('slider');
    this.getSlider.style.marginLeft = '';
    this.getSlider.style.transition = '0s';
    this.getBtn = document.getElementById('button-background');
    this.getBtn.classList.add('resetEffect');
    let addText = document.getElementsByClassName('slide-text');
    addText[0].textContent = 'Swipe to dial ' + this.panicBtnValue;
    // this.changeDetectorRef.detectChanges();

  }

  async showTourModal() {
    this.logService.logDebug('HomePage', 'showTourModal', "Panic button tour displayed");
    const modal = await this.modalController.create({
      component: DialNumberPage,
      cssClass: 'my-custom-modal-css',
      backdropDismiss: false
    });
    return await modal.present();
  }

  async getTourValue() {
    this.logService.logDebug('HomePage', 'getTourValue', "Tour started");
    await this.commonAPIService.getStorageValue('showTutorial').then(res => {
      if (!res) {
        this.showTourModal();
      }
    });
  }


  manageBadgeCount(itemReceived) {
    this.totalUnreadCount = 0;
    this.commonAPIService.allAlertListCombineData.forEach((item, index) => {

      if (itemReceived.eventId === item.eventId) {

        item.readBy = this.commonAPIService.victimDetails.username;

        if ((item.readBy) && item.exceptionLevel === 'Serious') {
          this.seriousBadgeCount = this.seriousBadgeCount - 1;
          this.commonAPIService.seriousBadgeCount = this.seriousBadgeCount;
        }

        if ((item.readBy) && item.exceptionLevel === 'Critical') {
          this.criticalBadgeCount = this.criticalBadgeCount - 1;
          this.commonAPIService.criticalBadgeCount = this.criticalBadgeCount;
        }

        if ((item.readBy) && item.exceptionLevel === 'Warning') {
          this.warningBadgeCount = this.warningBadgeCount - 1;
          this.commonAPIService.warningBadgeCount = this.warningBadgeCount;
        }

        if ((item.readBy) && item.exceptionLevel === 'Message') {
          this.messageBadgeCount = this.messageBadgeCount - 1;
          this.commonAPIService.messageBadgeCount = this.messageBadgeCount;
        }
      }

    });

    this.totalUnreadCount = this.warningBadgeCount + this.messageBadgeCount
      + this.seriousBadgeCount + this.criticalBadgeCount;

    this.commonAPIService.totalUnreadBadgeCount = this.totalUnreadCount;
    this.badge.set(this.commonAPIService.totalUnreadBadgeCount);

    if (this.totalUnreadCount === 0) {
      this.badge.clear();
    }

    this.zone.run(() => {
      this.seriousBadgeCount = this.seriousBadgeCount;
      this.criticalBadgeCount = this.criticalBadgeCount;
      this.warningBadgeCount = this.warningBadgeCount;
      this.messageBadgeCount = this.messageBadgeCount;
    });

  }


  async getVictimDetailsOnNotifications(notificationItem) {
    await this.commonAPIService.getStorageValue('loggedInUserDetails').then(res => {
      // this.isTappedPressed = false;
      this.refreshAlertEventListOnNotifications(notificationItem);
    });
  }

  async refreshAlertEventListOnNotifications(Item) {

    if (this.isTappedPressed) {
      await this.getAllAlertEventList();
      this.isTappedPressed = false;
      this.router.navigate(['/homepage/' + Item.data.ExceptionLevel.toLowerCase()],
        { queryParams: { ...Item, ...Item.data }, skipLocationChange: true });
    } else {
      await this.getAllAlertEventList();
    }
  }

  // Sending Data to Android native code
  sendVictimDetailsToNativeApp(victimDetails) {
    CustomNativePlugin.sendVictimDetailsToApp({ 'victimDetails': victimDetails });
    // CustomNativePlugin.customCall({'victimId': victimDetails.victimId});
    this.logService.logInfo('HomePage', 'sendVictimDetailsToNativeApp()', 'VictimDetails:' + JSON.stringify(victimDetails));
  }

  async sendDeviceIMEItoNativeApp(imei) {
    CustomNativePlugin.sendDeviceIMEItoApp({ 'deviceImei': imei });
    this.logService.logInfo('HomePage', 'sendDeviceIMEItoNativeApp()', 'deviceImei :' + imei);
  }

  sendPanicButtonValToNativeApp(num, udid, victimDetails) {
    CustomNativePlugin.sendPanicButtonNumberToApp({ 'panicBtnNumber': num, 'deviceUDID': udid, 'victimDetailsPanic': victimDetails });
    this.logService.logInfo('HomePage', 'sendPanicButtonValToNativeApp()', 'Number : ' + num);
  }

  async initializePushResources() {


    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('PushNotificationsRegistration', token)
        this.logService.logInfo('HomePage', 'PushNotificationsRegistration()',
          'Push notifications successfully initialized. Token: ' + token.value);

        this.commonAPIService.globalPushToken = token;
        this.pushNotificationToken = token;
        const pushNotificationTokenRequest = {
          pushNotificationToken: this.pushNotificationToken.value,
          platform: 'android'
        };

        this.pushDidInitialize = true;
        this.getVictimDetailsAndRegisterDevice();
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      this.logService.logError('HomePage', 'registrationError()',
        'Push notifications unsuccessfully initialized. Error: ' + JSON.stringify(error));
      this.pushDidInitialize = false;
      this.getVictimDetailsAndRegisterDevice();
    });
    // );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
        console.log('pushNotificationReceived', notification)
        this.isTappedPressed = false;
        this.getVictimDetailsOnNotifications(notification);
        this.logService.logDebug('HomePage', 'pushNotificationReceived()', 'Push received:' + notification + 'ExceptionLevel : + ' + JSON.stringify(notification.data) + ", " + notification.data.ExceptionLevel);
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
        console.log('PushNotificationActionPerformed', notification)
        this.isTappedPressed = true;
        this.getVictimDetailsOnNotifications(notification.notification);
        this.logService.logDebug('HomePage', 'PushNotificationActionPerformed()', 'Push action performed:' + JSON.stringify(notification) + 'ExceptionLevel : ' +
          JSON.stringify(notification.notification.data) + ' ' + JSON.stringify(notification.notification.data.ExceptionLevel));
      }
    );
    PushNotifications.register();
    //this.fcm.subscribeToTopic('marketing');

    // this.fcm.getToken().then(token => {
    //   console.log("getToken", token)
    // });

    // this.fcm.onNotification().subscribe(data => {
    //   if(data.wasTapped){
    //     console.log("Received in background");
    //   } else {
    //     console.log("Received in foreground");
    //   };
    // });

    // this.fcm.onTokenRefresh().subscribe(token => {
    //   console.log("onTokenRefresh", token)
    //   //backend.registerToken(token);
    // });

    // this.fcm.hasPermission().then(hasPermission => {
    //   if (hasPermission) {
    //     console.log("Has permission!");
    //   }
    // })

    // this.fcm.clearAllNotifications();

    // this.fcm.unsubscribeFromTopic('marketing');
  }
  getDeviceName(): string {
    this.logService.logInfo('HomePage', 'getDeviceName()', 'Device Name: ' + this.deviceInfoService.getDeviceName());
    return this.deviceInfoService.getDeviceName();
  }

  getAssignedClientsList() {
    this.logService.logDebug('AssignedClientsPage', 'getAssignedClientsList()',
      'Calling victimClientsAPI : ' +
      environment.gatewayUrl + environment.victimClientsAPI + this.commonAPIService.victimDetails.victimId);

    this.commonAPIService.getData(environment.victimClientsAPI + this.commonAPIService.victimDetails.victimId).subscribe(async res => {
      this.assignedClientsList = await res.body;
      this.logService.logDebug('HomepagePage', 'getAssignedClientsList()',
        'Called victimClientsAPI with response :' + JSON.stringify(this.assignedClientsList));
      if (this.assignedClientsList === null) {
        this.isClientAssigned = false;
        this.logService.logDebug('HomepagePage', 'getAssignedClientsList()',
          'Called victimClientsAPI with response :' + 'No individuals assigned');
        this.commonAPIService.hideLoader();
      } else {
        this.isClientAssigned = true;
      }
    }, err => {
      this.logService.logDebug('HomepagePage', 'getAssignedClientsList()',
        'Called victimClientsAPI with failed response :' + JSON.stringify(err));
    });
  }

  async getAllAlertEventListAfterNotification(): Promise<any> {

    this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()', 'getAllAlertEventListAfterNotification call started');
    // this.seriousBadgeCount = 0;
    // this.criticalBadgeCount = 0;
    // this.warningBadgeCount = 0;
    // this.messageBadgeCount = 0;
    // this.totalUnreadCount = 0;

    if (this.daysToKeepEvents === 0) {
      this.daysToKeepEvents = 31;
    }

    this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()', 'Calling alertEventsListAPI :' +
      environment.gatewayUrl + environment.alertEventsListAPI + this.commonAPIService.victimDetails.victimId + '/' + this.daysToKeepEvents);

    this.commonAPIService.getData(environment.alertEventsListAPI +
      this.commonAPIService.victimDetails.victimId + '/' + this.daysToKeepEvents).toPromise().then(async data => {

        this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()', 'Called alertEventsListAPI : with response : ');

        this.allEventAlertList = await data.body;
        this.commonAPIService.allAlertListCombineData = await data.body;
        this.seriousBadgeCount = 0;
        this.criticalBadgeCount = 0;
        this.warningBadgeCount = 0;
        this.messageBadgeCount = 0;
        this.totalUnreadCount = 0;

        if (this.allEventAlertList) {

          data.body.forEach((item, index) => {
            if ((!item.readBy) && item.exceptionLevel === 'Serious') {
              this.seriousBadgeCount = this.seriousBadgeCount + 1;
              this.commonAPIService.seriousBadgeCount = this.seriousBadgeCount;
            }

            if ((!item.readBy) && item.exceptionLevel === 'Critical') {
              this.criticalBadgeCount = this.criticalBadgeCount + 1;
              this.commonAPIService.criticalBadgeCount = this.criticalBadgeCount;
            }

            if ((!item.readBy) && item.exceptionLevel === 'Warning') {
              this.warningBadgeCount = this.warningBadgeCount + 1;
              this.commonAPIService.warningBadgeCount = this.warningBadgeCount;
            }

            if ((!item.readBy) && item.exceptionLevel === 'Message') {
              this.messageBadgeCount = this.messageBadgeCount + 1;
              this.commonAPIService.messageBadgeCount = this.messageBadgeCount;
            }
            this.totalUnreadCount = this.warningBadgeCount + this.messageBadgeCount
              + this.seriousBadgeCount + this.criticalBadgeCount;
          });
          // this.totalUnreadCount = await this.allEventAlertList.length;
          this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()', 'totalUnreadCount: ' + this.totalUnreadCount);
          this.commonAPIService.totalUnreadBadgeCount = this.totalUnreadCount;
          await this.badge.set(this.commonAPIService.totalUnreadBadgeCount);

          this.events.publish('allEventAlertList', data.body);

          if (this.totalUnreadCount <= 0) {
            this.badge.clear();
          }

          this.zone.run(() => {
            this.seriousBadgeCount = this.seriousBadgeCount;
            this.criticalBadgeCount = this.criticalBadgeCount;
            this.warningBadgeCount = this.warningBadgeCount;
            this.messageBadgeCount = this.messageBadgeCount;

            this.allEventAlertList = data.body;
          });
        }
        this.commonAPIService.isLoadingData = false;

      }, err => {
        // tslint:disable-next-line:max-line-length
        this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()',
          'Called alertEventsListAPI : with failed response : ' + JSON.stringify(err));
      });
    this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()', 'getAllAlertEventList call Ended');
  }

}
