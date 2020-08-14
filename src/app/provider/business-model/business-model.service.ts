import { Injectable } from '@angular/core';
import { ICommonHeader } from './index';

@Injectable({
  providedIn: 'root'
})
export class BusinessModelService {
  jsonData: ICommonHeader;
  deviceUniqueId: any;
  constructor() {
    this.jsonData = {
      MessageId: '',
      DeviceId: '',
      VictimId: '',
      SourceId: '',
      Source: '',
      ConnectionType: '',
      MessageVersion: 0,
      DateTime: '',
      Events: [],
      Location: [],
      Registration: null
    };

  }

  setDataObject(obj) {
    this.jsonData.MessageId = obj.MessageId;
    this.jsonData.DeviceId = obj.DeviceId;
    this.jsonData.VictimId = obj.VictimId;
    this.jsonData.SourceId = obj.SourceId;
    this.jsonData.Source = obj.Source;
    this.jsonData.ConnectionType = obj.ConnectionType;
    this.jsonData.MessageVersion = obj.MessageVersion;
    this.jsonData.DateTime = obj.DateTime;
    this.jsonData.Events = obj.Events ? obj.Events : [];
    this.jsonData.Location = obj.Location ? obj.Location : [];
    this.jsonData.Registration = obj.Registration ? obj.Registration : null;

    console.log('Complete message structure: ');
    console.log(this.jsonData);
  }

  getDataObject() {
    return this.jsonData;
  }

  create_UUID() {
    let dt = new Date().getTime();
    // tslint:disable-next-line:only-arrow-functions
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}




