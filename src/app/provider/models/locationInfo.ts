export class LocationInfo {
    'is_moving': true;
    'uuid': string;
    'timestamp': string;
    'odometer': number;
    'coords': {
        'latitude': string,
        'longitude': string,
        'accuracy': string,
        'speed': string,
        'heading': string,
        'altitude': string
    };
    'activity': {
        'type': string,
        'confidence': string
    };
    'battery': {
        'is_charging': boolean,
        'level': string
    };
    'extras': {};
}
