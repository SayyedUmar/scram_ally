import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { BusinessModelService } from '../business-model/business-model.service';
import { CommonAPIService } from '../common-api/common-api.service';
import { DeviceInfoService } from '../device-api/device-info.service';
const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CommonBObjectService {

  messageHeaderWithEvent: {
    MessageId: any;
    DeviceId: any;
    VictimId: any;
    SourceId: string;
    Source: string;
    ConnectionType: string;
    MessageVersion: number;
    DateTime: string;
    Events: any;
  };

  Events: [
    {
      MessageType: string;
      DateTime: string;
      Event: string;
      data: string;
    }
  ];

  uniqueDeviceId: any;

  constructor(
    private businessModelService: BusinessModelService,
    private deviceInfoService: DeviceInfoService,
    private commonAPIService: CommonAPIService) {
    this.initializeObject();
  }

  async getDeviceBatteryStatus() {
    const info = await Device.getInfo();
    console.log(info);
    return info;
  }

  initializeObject() {
    this.messageHeaderWithEvent = {
      MessageId: '',
      DeviceId: '',
      VictimId: '',
      SourceId: '',
      Source: '',
      ConnectionType: '',
      MessageVersion: 0,
      DateTime: '',
      Events: []
    };

    this.Events = [
      {
        MessageType: '',
        DateTime: '',
        Event: '',
        data: null
      }
    ];
  }

  createJsonDataAndPost(newEvent) {
    console.log(this.businessModelService.create_UUID());
    this.messageHeaderWithEvent.MessageId = this.businessModelService.create_UUID();
    this.messageHeaderWithEvent.DeviceId = this.uniqueDeviceId;
    this.messageHeaderWithEvent.VictimId = 'a77b7785-d62d-4622-8653-307310eb605f';
    this.messageHeaderWithEvent.SourceId = '';
    this.messageHeaderWithEvent.Source = 'AllyApi';
    this.messageHeaderWithEvent.DateTime = (new Date()).toUTCString();
    this.messageHeaderWithEvent.ConnectionType = '0';
    this.messageHeaderWithEvent.MessageVersion = 1;
    this.messageHeaderWithEvent.Events = newEvent;

    this.businessModelService.setDataObject(this.messageHeaderWithEvent);
    const data = this.businessModelService.getDataObject();
    // this.commonAPIService.postDataToServer(data).subscribe(result => {
    //   console.log('Success...', result);
    // });
  }
}
