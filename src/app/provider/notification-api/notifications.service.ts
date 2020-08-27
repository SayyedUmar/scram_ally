import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { CommonAPIService } from '../common-api/common-api.service';
import { CommonBObjectService } from '../common-bo-object/common-bobject.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  locationInfo: any;
  isNotificationsEnabled: boolean;
  commonObj: any;
  Events: [
    {
      MessageType: string;
      DateTime: string;
      Event: string;
      data: string;
    }
  ];

  constructor(
    private platform: Platform,
    private diagnostic: Diagnostic,
    private commonBObjectService: CommonBObjectService,
    private commonAPIService: CommonAPIService, private geolocation: Geolocation) {
    this.platform.ready().then(() => {
      console.log('Notification service in Platform ready');
      this.isNotificationsEnabled = true;

      this.Events = [
        {
          MessageType: '',
          DateTime: '',
          Event: '',
          data: null
        }
      ];

    });
  }

  async checkIsRemoteNotificationsEnabled() {
    await this.diagnostic.isRemoteNotificationsEnabled().then(data => {
      console.log('isRemoteNotificationsEnabled : ' + data);
      if (data === false) {
        // this.commonAPIService.startTimer();
        this.commonAPIService.presentAlertConfirmCommonWithCallback('Allow Ally to send Push Notification?', 
        'Notifications May include alerts. These can be configured in settings',
        () => this.checkIfLocationEnabled(),() => {});
      } else {
        this.commonAPIService.pauseTimer();
        this.checkIfLocationEnabled()
        // this.commonAPIService.pauseTimer();
      }
      if (this.isNotificationsEnabled === data) {

      } else {
        console.log('Send push notification message to server: ');
        this.isNotificationsEnabled = data;
        // tslint:disable-next-line:max-line-length
      }
    })
  }

  async checkIfLocationEnabled() {
    await this.diagnostic.isLocationAvailable().then(success => { 
      console.log('checkIfLocationEnabled : ' + success);
      if (success === false) {
        this.commonAPIService.presentAlertConfirmCommonWithCallback('Allow Location Service', 
        'Ally App needs to access location service to track the current user location',
        () => this.checkIfLocationAuthorized(),() => {});
      } else {
        this.checkIfLocationAuthorized()
        // this.commonAPIService.pauseTimer();
      }
    })
  }

  async checkIfLocationAuthorized() {
    await this.diagnostic.getLocationAuthorizationStatus().then(status => {
      //authorized_when_in_use | denied_always
      console.log('checkIfLocationAuthorized : ' + status);
      if (status === 'denied_always') {
        this.commonAPIService.presentAlertConfirmCommon('Allow Location Service', 'Ally App needs to access location service access as Allow Always');
      } else {
        this.commonAPIService.pauseTimer();
      }
    })
  }

  setEvent(messageType, eventMessage) {
    return new Promise((resolve, reject) => {
      this.Events[0].MessageType = messageType;
      this.Events[0].DateTime = (new Date()).toUTCString();
      this.Events[0].Event = eventMessage;
      resolve(this.Events);
    }).catch(e => {
      console.log(e);
    });
  }
}
