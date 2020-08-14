import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private androidPermissions: AndroidPermissions, private locationAccuracy: LocationAccuracy) {
  }

  getPhoneCallPermission() {
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.CALL_PHONE
    ).then(res => {
      console.log('CALL_PHONE Status!');
      console.log(res);
      if (res.hasPermission) {
        console.log('CALL_PHONE permission already there!');
      } else {
        // tslint:disable-next-line:no-shadowed-variable
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CALL_PHONE).then(res => {
          // alert('Persmission Granted Please Restart App!');
          console.log('CALL_PHONE permission Result!');
          console.log(res);
          if (res.hasPermission) {
            console.log('CALL_PHONE permission given!');
            // this.getLocationPermission();
          } else {
            console.log('CALL_PHONE permission denied!');
          }
        }).catch(error => {
          console.log('CALL_PHONE permission denied!');
        });
      }
    }).catch(error => {
      console.log('error');
    });
  }

  getLocationPermission() {
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
    ).then(res => {
      console.log('ACCESS_BACKGROUND_LOCATION Status!');
      console.log(res);
      if (res.hasPermission) {
        console.log('ACCESS_BACKGROUND_LOCATION permission already there!');
        // If having permission show 'Turn On GPS' dialogue
        this.askToTurnOnGPS().then((response) => {
          console.log(response, 'askToTurnOnGPS-checkGPSPermission');
          if (response === false) {
            console.log(response);
          } else {
            console.log(response);
          }
        }, err => {
          console.log(err);
          alert('requestPermission Error requesting location permissions ' + err);
        });
      } else {
        this.requestGPSPermission();
      }
    }).catch(error => {
      console.log('error');
    });
  }

  async askToTurnOnGPS() {
    return new Promise((resolve, reject) => {
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((resp) => {
        console.log(resp, 'location accuracy');
        resolve();
      }, err => {
        console.log(err, 'location error');
      });
    });
  }

  async requestGPSPermission() {
    return new Promise((resolve, reject) => {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          console.log(canRequest);
        } else {
          // Show 'GPS Permission Request' dialogue
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(() => {
            // call method to turn on GPS
            this.askToTurnOnGPS().then((response) => {
              console.log(response, 'askToTurnOnGPS-requestGPSPermission');
              resolve();
            });
          },
            error => {
              // Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error);
              reject(false);
            });
        }
      });
    });
  }
}


