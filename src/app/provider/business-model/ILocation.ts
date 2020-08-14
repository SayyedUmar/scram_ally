
export interface ILocation {
    Timestamp: string;
    Latitude: number;
    Longitude: number;
    Accuracy: number;
    Altitude: number;
    AltitudeAccuracy: number;
    Direction: number;
    Speed: number;
    Satellite: number;
    Csq: number;
    Address: string;
    Fix: boolean;
    LocationMode: string;
  }
  