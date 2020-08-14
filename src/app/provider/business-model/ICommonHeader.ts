import { IEvent, ILocation, IRegistration } from './index';

export interface ICommonHeader {
    MessageId: any;
    DeviceId: any;
    VictimId: any;
    SourceId: string;
    Source: string;
    ConnectionType: string;
    MessageVersion: number;
    DateTime: string;
    Events: IEvent[];
    Location: ILocation[];
    Registration: IRegistration;
  }