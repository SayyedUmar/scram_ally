import { Injectable } from '@angular/core';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {
  osVersion: any;
  uuid: any;
  name: any;
  deviceUniqueId: any;
  carrierName: any;
  IMEINumber: any;
  simSerialNumber: any;
  countryCode: any;
  phoneNumber: any;
  os: any;

  simSpecificInfo: any;
  subscription: any;

  constructor(
    private platform: Platform, private device: Device, private sim: Sim,
    public uniqueDeviceID: UniqueDeviceID, public batteryStatus: BatteryStatus,
    private storage: Storage) {
    this.onChangeBatteryStatus();
    if (this.platform.is('android')) {
      this.os = 'Android';
    } else {
      this.os = 'iOS';
    }
  }

  getDeviceName() {
    this.osVersion = this.device.version;
    this.uuid = this.device.uuid;
    this.name = (window as any).device.name;
    console.log('Device name : ');
    console.log(this.name);
    return this.name;
  }

  checkHasReadPermissionForSim() {
    return new Promise((resolve, reject) => {
      this.sim.requestReadPermission().then(
        () => {
          console.log('Permission granted');
          this.sim.getSimInfo().then(
            (info) => {
              console.log('Sim info: ', info);
              this.simSpecificInfo = info;
              this.carrierName = this.simSpecificInfo.carrierName;
              this.IMEINumber = this.simSpecificInfo.deviceId;
              this.simSerialNumber = this.simSpecificInfo.simSerialNumber;
              this.countryCode = this.simSpecificInfo.countryCode;
              this.phoneNumber = this.simSpecificInfo.phoneNumber;

              resolve(this.simSpecificInfo);
            },
            (err) => {
              console.log('Unable to get sim info: ', err);
              this.simSpecificInfo = {};
              reject(this.simSpecificInfo);
            }
          );
        },
        () => {
          console.log('Permission denied');
          reject();
        }
      );
    });
  }

  getSimCardInformation() {
    this.sim.getSimInfo().then(
      (info) => {
        console.log('Sim info: ', info);
        this.simSpecificInfo = info;
        this.carrierName = this.simSpecificInfo.carrierName;
        this.IMEINumber = this.simSpecificInfo.deviceId;
        this.simSerialNumber = this.simSpecificInfo.simSerialNumber;
        this.countryCode = this.simSpecificInfo.countryCode;
        this.phoneNumber = this.simSpecificInfo.phoneNumber;
      },
      (err) => console.log('Unable to get sim info: ', err)
    );
  }

  onChangeBatteryStatus() {
    this.subscription = this.batteryStatus.onChange().subscribe(status => {
      // console.log('Battery Status : ', status);
      // console.log(status.level, status.isPlugged);
      // set a key/value
      this.storage.set('batteryCurrentStatus', status);
    });
  }

  getCurrentBatteryStatus() {
    return new Promise((resolve, reject) => {
      this.storage.get('batteryCurrentStatus').then((val) => {
        console.log('batteryCurrentStatus is', val);
        resolve(val);
      }).catch(err => {
        reject();
      });
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('localService is destroyed');
  }
}
