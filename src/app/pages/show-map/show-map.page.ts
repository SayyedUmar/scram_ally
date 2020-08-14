import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeolocationOptions, PositionError } from '@ionic-native/geolocation';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { MenuController } from '@ionic/angular';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';

declare var google;

@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.page.html',
  styleUrls: ['./show-map.page.scss'],
})
export class ShowMapPage implements OnInit {

  options: GeolocationOptions;
  currentPos: any;
  @ViewChild('map', { read: '', static: true }) mapElement: ElementRef;
  map: any;

  currentLatitude: any;
  currentLongitude: any;
  currentAddress: any;
  localAddVar: any;

  constructor(public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
    private menuCtrl: MenuController,
    private logService: LogfileService) {
    this.getUserPosition();
  }

  ngOnInit() {
    this.logService.logDebug('ShowMapPage', 'ngOnInit()', 'ngOnInit');
  }

  ionViewWillEnter() {
    // this.menuCtrl.enable(false);
  }
  getReverseGeoCodeAddress(lat, lng) {
    this.logService.logDebug('ShowMapPage', 'getReverseGeoCodeAddress()', 'getReverseGeoCodeAddress Lat,Lng : ' + lat + ',' + lng);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lat, lng, options)
      .then((result: NativeGeocoderResult[]) => {
        this.logService.logDebug('ShowMapPage', 'getReverseGeoCodeAddress()', 'reverseGeocode Lat,Lng : ' + lat + ',' + lng +
        ' | New address' + result + ' , '+ JSON.stringify(result[0]));
    
        this.localAddVar = result[0];

        this.currentAddress = (this.localAddVar.subThoroughfare !== '' ? this.localAddVar.subThoroughfare + ' ' : '')
          + (this.localAddVar.thoroughfare !== '' ? this.localAddVar.thoroughfare + ', ' : '')
          + (this.localAddVar.subLocality !== '' ? this.localAddVar.subLocality + ', ' : '')
          + (this.localAddVar.locality !== '' ? this.localAddVar.locality + ', ' : '')
          + (this.localAddVar.subAdministrativeArea !== '' ? this.localAddVar.subAdministrativeArea + ', ' : '')
          + (this.localAddVar.administrativeArea !== '' ? this.localAddVar.administrativeArea + ', ' : '')
          + this.localAddVar.countryCode + ' - '
          + this.localAddVar.postalCode;

          this.logService.logDebug('ShowMapPage', 'getReverseGeoCodeAddress()', 'reverseGeocode Lat,Lng : ' + lat + ',' + lng +
          ' | Current address' + this.currentAddress);
      })
      .catch((error: any) => 
      this.logService.logError('ShowMapPage', 'getReverseGeoCodeAddress()', 'reverseGeocode Lat,Lng : ' + lat + ',' + lng +
      ' |ERROR ' + JSON.stringify(error)));
  }

  getUserPosition() {
    this.logService.logDebug('ShowMapPage', 'getUserPosition()', 'getUserPosition');
    this.options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition().then(pos => {

      this.currentPos = pos;
      this.logService.logDebug('ShowMapPage', 'getUserPosition()', 'currentPos : ' + pos);
     
      this.addMap(this.currentPos.coords.latitude, this.currentPos.coords.longitude);

    }, (err: PositionError) => {
      console.log('error : ' + err.message);
      this.logService.logError('ShowMapPage', 'getUserPosition()', 'getUserPosition ERROR ' + JSON.stringify(err));
    });
  }

  successCallBack() {
    this.logService.logDebug('ShowMapPage', 'successCallBack()', 'successCallBack test');
    return 'test';
  }

  addMap(lat, long) {
    this.logService.logDebug('ShowMapPage', 'addMap()', 'addMap');
    // tslint:disable-next-line:prefer-const
    let latLng = new google.maps.LatLng(lat, long);

    // tslint:disable-next-line:prefer-const
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(lat, long);
    this.currentLatitude = lat;
    this.currentLongitude = long;
  }

  addMarker(lat, long) {
    this.logService.logDebug('ShowMapPage', 'addMarker()', 'addMarker');
    // tslint:disable-next-line:prefer-const
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    // tslint:disable-next-line:prefer-const
    let content = '<p>This is your current position !</p>';
    // tslint:disable-next-line:prefer-const
    let infoWindow = new google.maps.InfoWindow({
      // tslint:disable-next-line:object-literal-shorthand
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
    this.getReverseGeoCodeAddress(lat, long);
  }

}
