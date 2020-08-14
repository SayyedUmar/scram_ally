import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ToastController } from '@ionic/angular';
import { CommonBObjectService } from './common-bo-object/common-bobject.service';

const { Network } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DiagnosticCheckService {
  isLocationEnabled: boolean;
  Events: [
    {
      MessageType: string;
      DateTime: string;
      Event: string;
      data: string;
    }
  ];

  constructor(
    public diagnostic: Diagnostic, public toastController: ToastController,
    private commonBObjectService: CommonBObjectService) {
    this.isLocationEnabled = true;
    this.Events = [
      {
        MessageType: '',
        DateTime: '',
        Event: '',
        data: null
      }
    ];
  }

  // To check whether Location Service is enabled or Not
  async locationStatus() {
    return new Promise((resolve, reject) => {
      this.diagnostic.isLocationEnabled().then((isEnabled) => {
        console.log(isEnabled);
        if (isEnabled === false) {
          resolve(false);
        } else if (isEnabled === true) {
          resolve(true);
        }
      })
        .catch((e) => {
          this.presentToast('Please turn on Location');
          reject(false);
        });
    });
  }

  async checkLocationEnabled() {
    return new Promise((resolve, reject) => {
      this.diagnostic.isLocationEnabled().then((isEnabled) => {
        console.log(isEnabled);

        if (this.isLocationEnabled === isEnabled) {

        } else {
          this.isLocationEnabled = isEnabled;
          if (isEnabled === false) {
            console.log('Please turn on Location Service');
            // alert('Please turn on Location Service');

            this.setEvent('Location Service', 'Disabled').then(result => {
              console.log('Push Notification Service : ');
              console.log(result);
              this.commonBObjectService.createJsonDataAndPost(this.Events);
              alert('Please turn on Location Service');
            });

            resolve(false);
          } else if (isEnabled === true) {
            console.log('Location is turned on!');
            // alert('Location is turned on!');
            this.setEvent('Location Service', 'Enabled').then(result => {
              console.log('Location Service enabled : ');
              console.log(result);
              this.commonBObjectService.createJsonDataAndPost(this.Events);
              alert('Location is turned on!');
            });
            resolve(true);
          }
        }

      })
        .catch((e) => {
          this.presentToast('Please turn on Location');
          reject(false);
        });
    });
  }

  // ** Check Network Type */

  async getCurrentNwtorkStatus() {
    // Get the current network status
    const status = await Network.getStatus();
    return status;
  }

  // ** Toast message */
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  setEvent(messageType, eventMessage) {
    return new Promise((resolve, reject) => {
      this.Events[0].MessageType = messageType;
      this.Events[0].DateTime = (new Date()).toUTCString();
      this.Events[0].Event = eventMessage;
      // this.Events[0].data.Name = 'Dialed number';
      // this.Events[0].data.Value = '911';
      resolve(this.Events);
    }).catch(e => {
      console.log(e);
    });
  }
}
