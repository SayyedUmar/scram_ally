import { IData } from './index';

export interface IEvent {
    MessageType: string;
    DateTime: string;
    Event: string;
    data: IData[];
  }