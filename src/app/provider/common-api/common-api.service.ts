import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { AlertController, LoadingController, Platform, ToastController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonAPIService {

  // API path
  // tslint:disable-next-line:variable-name
  // base_path = 'https://gpsmobilemessageapi.scramtest.com/api/v1/Message/SendMessage';

  // new base path with oAuth
  basePath = environment.gatewayUrl;
  data: any;
  dataSend: any;
  commonObj: any;
  eventObj: any;
  locationsArray: any[];
  eventsArray: any[];
  victimIdStore: any;
  loaderToShow: any;
  currentKeyValue: any;
  isBatteryLowSent: boolean;
  isBatteryLowClearSent: boolean;
  batteryLevelconfig: {
    batteryLowValue: number,
    batteryLowClearValue: number
  };

  isNetworkConnected: boolean;
  isLoadingData: boolean;
  networkStatus: any;
  userDetails: any;
  victimDetails: any;
  appConfiguration: any;
  primaryAgentInfo: any;

  exceptionLevelCritical: any;
  exceptionLevelSerious: any;
  exceptionLevelWarning: any;
  exceptionLevelMessage: any;

  allAlertListCombineData: any;
  appVersionNumber: any;
  isServiceStarted: boolean;
  isSingleClientAssigned: boolean;
  globalPushToken: any;
  timeLeft: number = 60;
  interval: any;
  totalUnreadBadgeCount: any;

  seriousBadgeCount: any;
  criticalBadgeCount: any;
  warningBadgeCount: any;
  messageBadgeCount: any;

  constructor(
    private platform: Platform,
    private http: HttpClient,
    public toastController: ToastController,
    private loadingCtrl: LoadingController, private storage: Storage,
    public alertController: AlertController, private openNativeSettings: OpenNativeSettings,
    private events: Events) {
    this.platform.ready().then(() => {

      this.locationsArray = [];
      this.eventsArray = [];
      this.isBatteryLowSent = false;
      this.isBatteryLowClearSent = false;
      this.batteryLevelconfig = {
        batteryLowValue: 21,
        batteryLowClearValue: 39
      };
      this.isNetworkConnected = false;
      this.isLoadingData = false;
    });
  }

  // Http Options

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer '
    })
  };

  // Handle API errors
  handleError(error) {
    console.log('Main Error : ');
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    // return throwError(
    //   'Something bad happened; please try again later.');
    console.log(error);
    return throwError(error);
  }

  handleCatchError(error: HttpErrorResponse) {
    console.log('handleCatchError');
    console.log(error);
    return throwError(error);
  }

  // Old post call
  // postDataToServer(inputData) {
  //   return this.http.post(this.base_path, inputData, this.httpOptions);
  // }

  postData(supportingPath, inputData) {
    return this.http.post(this.basePath + supportingPath, inputData, this.httpOptions);
  }

  getData(api): Observable<any> {
    return this.http.get<any>(this.basePath + api, { observe: 'response' }).pipe(
      map(response => {
        console.log(response);
        return response;
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  postDataWithInterceptorObservable(supportingPath, inputData): Observable<any> {
    return this.http.post(this.basePath + supportingPath, inputData, { observe: 'response' }).pipe(
      map(response => {
        console.log(response);
        return response;
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  putDataWithInterceptorObservable(supportingPath, inputData): Observable<any> {
    return this.http.put(this.basePath + supportingPath, inputData, { observe: 'response' }).pipe(
      map(response => {
        console.log(response);
        return response;
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  postDataWithInterceptor(supportingPath, inputData) {
    return this.http.post(this.basePath + supportingPath, inputData).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  putDataWithInterceptor(api, body) {
    return this.http.put(this.basePath + api, body).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // ** Toast message */
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async presentToastWithCloseBtn(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      showCloseButton: true,
    });
    toast.present();
  }

  postLocation(locations) {
    this.commonObj = {
      victimId: this.victimDetails.victimId,
      timestamp: new Date(locations.timestamp).toJSON(),
      latitude: locations.coords.latitude,
      longitude: locations.coords.longitude,
      accuracy: locations.coords.accuracy,
      altitude: locations.coords.altitude,
      altitudeAccuracy: 0,
      direction: locations.coords.heading,
      speed: locations.coords.speed,
      satellite: 0,
      csq: 0,
      address: '',
      fix: 0,
      locationMode: 'A',
      cacheTimeStamp: new Date(locations.currentTimestamp).toJSON(),
      eventType: locations.event,
      activityType: locations.activity.type,
      activityConfidence: locations.activity.confidence,
      batteryLevel: locations.battery.level,
      isBatteryCharging: locations.battery.is_charging,
      isMoving: locations.is_moving
    };

    this.locationsArray = [];
    this.locationsArray.push(this.commonObj);

    return this.postDataWithInterceptor(environment.locationApi, this.locationsArray);
  }

  postEvent(event, singleLocation) {

    console.log('Current Event Status : ');
    console.log(event);
    this.eventObj = {
      victimId: this.victimDetails.victimId,
      eventType: 'Location Service',
      timestamp: new Date().toJSON(),
      event: event.gps ? 'Enabled' : 'Disabled',
      eventData: [],
      location: event.gps ? {
        victimId: this.victimDetails.victimId,
        timestamp: new Date(singleLocation.timestamp).toJSON(),
        latitude: singleLocation.coords.latitude,
        longitude: singleLocation.coords.longitude,
        accuracy: singleLocation.coords.accuracy,
        altitude: singleLocation.coords.altitude,
        altitudeAccuracy: singleLocation.coords.altitude_accuracy,
        direction: singleLocation.coords.heading,
        speed: singleLocation.coords.speed,
        satellite: 0,
        csq: 0,
        address: '',
        fix: 0,
        locationMode: 'A',
        cacheTimeStamp: new Date(singleLocation.currentTimestamp).toJSON(),
        eventType: singleLocation.event,
        activityType: singleLocation.activity.type,
        activityConfidence: singleLocation.activity.confidence,
        batteryLevel: singleLocation.battery.level,
        isBatteryCharging: singleLocation.battery.is_charging,
        isMoving: singleLocation.is_moving
      } : {}
    };
    this.eventsArray = [];
    this.eventsArray.push(this.eventObj);
    return this.postDataWithInterceptor(environment.mobileDeviceEventsAPI, this.eventsArray);
  }

  postBatteryEvent(batteryObject, singleLocation) {
    this.eventObj = {
      victimId: this.victimDetails.victimId,
      eventType: 'Battery',
      timestamp: new Date(batteryObject.timestamp).toJSON(),
      event: batteryObject.event,
      eventData: [
        {
          name: 'BatteryStatus',
          value: (batteryObject.batteryStatus.level * 100).toString()
        },
        {
          name: 'ChargingStatus',
          value: batteryObject.batteryStatus.is_charging ? '0' : '4'
        }
      ],
      location: {
        victimId: this.victimDetails.victimId,
        timestamp: new Date(singleLocation.timestamp).toJSON(),
        latitude: singleLocation.coords.latitude,
        longitude: singleLocation.coords.longitude,
        accuracy: singleLocation.coords.accuracy,
        altitude: singleLocation.coords.altitude,
        altitudeAccuracy: singleLocation.coords.altitude_accuracy,
        direction: singleLocation.coords.heading,
        speed: singleLocation.coords.speed,
        satellite: 0,
        csq: 0,
        address: '',
        fix: 0,
        locationMode: 'A',
        cacheTimeStamp: new Date(singleLocation.currentTimestamp).toJSON(),
        eventType: singleLocation.event,
        activityType: singleLocation.activity.type,
        activityConfidence: singleLocation.activity.confidence,
        batteryLevel: singleLocation.battery.level,
        isBatteryCharging: singleLocation.battery.is_charging,
        isMoving: singleLocation.is_moving
      }
    };

    this.eventsArray = [];
    this.eventsArray.push(this.eventObj);
    return this.postDataWithInterceptor(environment.mobileDeviceEventsAPI, this.eventsArray);
  }

  pushNotificationEvent(eventStatus, location) {

    console.log('Current Event Status : ');
    console.log(eventStatus);
    this.eventObj = {
      victimId: this.victimDetails.victimId,
      eventType: 'Push Notification Service',
      timestamp: new Date().toJSON(),
      event: eventStatus ? 'Enabled' : 'Disabled',
      eventData: [],
      location: {
        victimId: this.victimDetails.victimId,
        timestamp: new Date(location.timestamp).toJSON(),
        latitude: location.latitude ? location.latitude : 0,
        longitude: location.longitude ? location.longitude : 0,
        accuracy: location.accuracy ? location.accuracy : 0,
        altitude: location.altitude ? location.altitude : 0,
        altitudeAccuracy: location.altitude_accuracy ? location.altitude_accuracy : 0,
        direction: location.heading ? location.heading : 0,
        speed: location.speed ? location.speed : 0,
        satellite: 0,
        csq: 0,
        address: '',
        fix: 0,
        locationMode: 'A',
        cacheTimeStamp: new Date(location.cacheTimeStamp).toJSON(),
        eventType: location.eventType,
        activityType: location.activityType,
        activityConfidence: location.activityConfidence,
        batteryLevel: location.batteryLevel,
        isBatteryCharging: location.isBatteryCharging,
        isMoving: location.isMoving
      }
    };
    this.eventsArray = [];
    this.eventsArray.push(this.eventObj);
    return this.postData('MobileDevice/DeviceEvents', this.eventsArray);
  }

  // Kept this code as colten still working on Panic button API - 02/11/2020

  // postPanicButton(event, location) {
  //   console.log('Current Event Status : ');
  //   console.log(event);
  //   this.eventObj = {
  //     dateTimePressed: event.dateTimePressed,
  //     victimId: event.victimId,
  //     numberDialed: event.numberDailed,
  //     location: {
  //       victimId: this.victimIdStore,
  //       timestamp: new Date(location.timestamp).toJSON(),
  //       latitude: location.latitude ? location.latitude : 0,
  //       longitude: location.longitude ? location.longitude : 0,
  //       accuracy: location.accuracy ? location.accuracy : 0,
  //       altitude: location.altitude ? location.altitude : 0,
  //       altitudeAccuracy: location.altitude_accuracy ? location.altitude_accuracy : 0,
  //       direction: location.heading ? location.heading : 0,
  //       speed: location.speed ? location.speed : 0,
  //       satellite: 0,
  //       csq: 0,
  //       address: 'Test Address',
  //       fix: 0,
  //       locationMode: 'A'
  //     }
  //   };

  //   return this.postData('Panic/PanicEvent', this.eventObj);
  // }

  postPanicButton(event, location) {

    console.log('Current Event Status : ');
    console.log(event);
    this.eventObj = {
      victimId: this.victimDetails.victimId,
      eventType: 'Button Pressed',
      timestamp: new Date().toJSON(),
      event: 'Panic Button Pressed',
      eventData: [
        {
          name: 'Dialed Number',
          value: event.numberDailed
        }
      ],
      location: {
        victimId: this.victimDetails.victimId,
        timestamp: new Date(location.timestamp).toJSON(),
        latitude: location.latitude ? location.latitude : 0,
        longitude: location.longitude ? location.longitude : 0,
        accuracy: location.accuracy ? location.accuracy : 0,
        altitude: location.altitude ? location.altitude : 0,
        altitudeAccuracy: location.altitude_accuracy ? location.altitude_accuracy : 0,
        direction: location.heading ? location.heading : 0,
        speed: location.speed ? location.speed : 0,
        satellite: 0,
        csq: 0,
        address: '',
        fix: 0,
        locationMode: 'A',
        cacheTimeStamp: new Date(location.currentTimestamp).toJSON(),
        eventType: location.eventType,
        activityType: location.activityType,
        activityConfidence: location.activityConfidence,
        batteryLevel: location.batteryLevel,
        isBatteryCharging: location.isBatteryCharging,
        isMoving: location.isMoving
      }
    };
    this.eventsArray = [];
    this.eventsArray.push(this.eventObj);
    return this.postDataWithInterceptor('MobileDevice/DeviceEvents', this.eventsArray);
  }

  mobileConfiguration(mobileInfo) {
    console.log('mobileInfo Status : ');
    console.log(mobileInfo);
    const mobileConfig = {
      phoneType: 'string',
      appVersion: 'string',
      deviceOS: 'string',
      deviceOSVersion: 'string',
      deviceImei: 'string',
      simNumber: 'string',
      phoneNumber: 'string',
      phoneSerialNumber: 'string',
      phoneName: 'string',
      carrier: 'string',
      systemMode: 0,
      locationFrequency: 0,
      transmissionFrequency: 0,
      csq: 0,
      dateTime: new Date().toJSON(),
      pushToken: 'string',
      victimId: this.victimDetails.victimId
    };

    return this.postData('MobileDevice/Configuration', mobileConfig);
  }

  // Show Loader in as per messages
  showLoader(msg) {
    this.loaderToShow = this.loadingCtrl.create({
      message: msg,
      duration: 1000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }

  // Hide Loader
  hideLoader() {
    this.loadingCtrl.dismiss();
  }

  setStorageValue(key, value) {
    this.storage.set(key, value);
  }

  async getStorageValue(key) {
    await this.storage.get(key).then((val) => {
      this.currentKeyValue = val;
      console.log('After execution : ');
      console.log(this.currentKeyValue);
    });

    console.log('currentKeyValue : ');
    console.log(this.currentKeyValue);
    return this.currentKeyValue;
  }

  deleteStorageValue() {
    // this.storage.clear();
    this.storage.remove('isDeviceRegistered');
    this.storage.remove('loggedInUserDetails');
    this.storage.remove('deviceId');
    this.storage.remove('pushTokenId');
    this.storage.remove('loggedInVictimDetails');
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Location Service Disabled!',
      message: 'Ally app needs to access your location. Please turn on the location services in your device settings',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Settings',
          handler: () => {
            console.log('Open settings');
            this.openNativeSettings.open('location').then(res => {
              console.log(res);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirmCommon(title, body) {
    const alert = await this.alertController.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Don\'t Allow',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Open settings');
            this.openNativeSettings.open('settings').then(res => {
              console.log(res);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  isToday(momentDate) {
    // return moment(momentDate).isSame(moment().startOf('day'), 'd');
    const today = new Date();
    const dateToCompare = new Date(momentDate);
    return dateToCompare.getDate() === today.getDate() &&
      dateToCompare.getMonth() === today.getMonth() &&
      dateToCompare.getFullYear() === today.getFullYear();
  }

  async presentAlertForInActiveVictim() {
    const alert = await this.alertController.create({
      header: 'Account inactivated!',
      // tslint:disable-next-line:max-line-length
      message: 'Your account has been inactivated. You will no longer be monitored. If you have any questions or concerns, please reach out to an officer.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok Clicked');
            console.log('Logout');
            this.logoutVictimStopService();
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }

  logoutVictimStopService() {
    console.log('Log out call');
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        // console.log('Time Val : ');
        // console.log(this.timeLeft);
      } else {
        this.timeLeft = 60;
        this.events.publish('autoRefreshAlertList', true);
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
