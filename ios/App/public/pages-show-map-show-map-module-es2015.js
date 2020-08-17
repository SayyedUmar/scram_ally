(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-show-map-show-map-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/show-map/show-map.page.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/show-map/show-map.page.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      <ion-label>\n        <ion-row class=\"header-txt\">\n          <ion-col>\n            <ion-title>\n              My Location\n            </ion-title>\n          </ion-col>\n        </ion-row>\n      </ion-label>\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div #map id=\"map\"></div>\n</ion-content>\n\n<div id='locationInfo'>\n  <div class=\"content-div\">\n    <ion-label>\n      <ion-row class=\"row-margin-bottom\">\n        <ion-col size=\"3\">\n          <p class=\"lbl-p\"><b>Address</b></p>\n        </ion-col>\n        <ion-col size=\"9\">\n          <p class=\"lbl-p\">{{currentAddress}}</p>\n        </ion-col>\n      </ion-row>\n\n      <ion-row class=\"row-margin-bottom\">\n        <ion-col size=\"3\">\n          <p class=\"lbl-p\"><b>Latitude</b></p>\n        </ion-col>\n        <ion-col size=\"9\">\n          <p class=\"lbl-p\">{{currentLatitude}}</p>\n        </ion-col>\n      </ion-row>\n\n      <ion-row class=\"row-margin-bottom\">\n        <ion-col size=\"3\">\n          <p class=\"lbl-p\"><b>Longitude</b></p>\n        </ion-col>\n        <ion-col size=\"9\">\n          <p class=\"lbl-p\">{{currentLongitude}}</p>\n        </ion-col>\n      </ion-row>\n    </ion-label>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/show-map/show-map-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/show-map/show-map-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: ShowMapPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowMapPageRoutingModule", function() { return ShowMapPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _show_map_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./show-map.page */ "./src/app/pages/show-map/show-map.page.ts");




const routes = [
    {
        path: '',
        component: _show_map_page__WEBPACK_IMPORTED_MODULE_3__["ShowMapPage"]
    }
];
let ShowMapPageRoutingModule = class ShowMapPageRoutingModule {
};
ShowMapPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ShowMapPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/show-map/show-map.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/show-map/show-map.module.ts ***!
  \***************************************************/
/*! exports provided: ShowMapPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowMapPageModule", function() { return ShowMapPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _show_map_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./show-map-routing.module */ "./src/app/pages/show-map/show-map-routing.module.ts");
/* harmony import */ var _show_map_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./show-map.page */ "./src/app/pages/show-map/show-map.page.ts");







let ShowMapPageModule = class ShowMapPageModule {
};
ShowMapPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _show_map_routing_module__WEBPACK_IMPORTED_MODULE_5__["ShowMapPageRoutingModule"]
        ],
        declarations: [_show_map_page__WEBPACK_IMPORTED_MODULE_6__["ShowMapPage"]]
    })
], ShowMapPageModule);



/***/ }),

/***/ "./src/app/pages/show-map/show-map.page.scss":
/*!***************************************************!*\
  !*** ./src/app/pages/show-map/show-map.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".scroll {\n  height: 100%;\n}\n\n#map {\n  width: 100%;\n  height: 100%;\n}\n\n.location-head {\n  margin-left: 1%;\n  font-size: 16px;\n  font-weight: bold;\n}\n\n#locationInfo {\n  background: #f5f3f3 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy91bWFyL0Rvd25sb2Fkcy9TY3JhbU5ldC5BbGx5LkFuZHJvaWROYXRpdmVfMi9zcmMvYXBwL3BhZ2VzL3Nob3ctbWFwL3Nob3ctbWFwLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvc2hvdy1tYXAvc2hvdy1tYXAucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQ0NKOztBREVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7QUNDSjs7QURFQTtFQUNJLGVBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUNDSjs7QURFQTtFQUNJLDhCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9zaG93LW1hcC9zaG93LW1hcC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2Nyb2xsIHtcbiAgICBoZWlnaHQ6IDEwMCVcbn1cblxuI21hcCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xufVxuXG4ubG9jYXRpb24taGVhZCB7XG4gICAgbWFyZ2luLWxlZnQ6IDElO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuI2xvY2F0aW9uSW5mbyB7XG4gICAgYmFja2dyb3VuZDogI2Y1ZjNmMyAhaW1wb3J0YW50O1xufSIsIi5zY3JvbGwge1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbiNtYXAge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4ubG9jYXRpb24taGVhZCB7XG4gIG1hcmdpbi1sZWZ0OiAxJTtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuI2xvY2F0aW9uSW5mbyB7XG4gIGJhY2tncm91bmQ6ICNmNWYzZjMgIWltcG9ydGFudDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/show-map/show-map.page.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/show-map/show-map.page.ts ***!
  \*************************************************/
/*! exports provided: ShowMapPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowMapPage", function() { return ShowMapPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "./node_modules/@ionic-native/native-geocoder/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/provider/common-file/logfile.service */ "./src/app/provider/common-file/logfile.service.ts");






let ShowMapPage = class ShowMapPage {
    constructor(geolocation, nativeGeocoder, menuCtrl, logService) {
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.menuCtrl = menuCtrl;
        this.logService = logService;
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
        let options = {
            useLocale: true,
            maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(lat, lng, options)
            .then((result) => {
            this.logService.logDebug('ShowMapPage', 'getReverseGeoCodeAddress()', 'reverseGeocode Lat,Lng : ' + lat + ',' + lng +
                ' | New address' + result + ' , ' + JSON.stringify(result[0]));
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
            .catch((error) => this.logService.logError('ShowMapPage', 'getReverseGeoCodeAddress()', 'reverseGeocode Lat,Lng : ' + lat + ',' + lng +
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
        }, (err) => {
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
};
ShowMapPage.ctorParameters = () => [
    { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_2__["Geolocation"] },
    { type: _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_3__["NativeGeocoder"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["MenuController"] },
    { type: src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_5__["LogfileService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('map', { read: '', static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], ShowMapPage.prototype, "mapElement", void 0);
ShowMapPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-show-map',
        template: __webpack_require__(/*! raw-loader!./show-map.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/show-map/show-map.page.html"),
        styles: [__webpack_require__(/*! ./show-map.page.scss */ "./src/app/pages/show-map/show-map.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_2__["Geolocation"], _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_3__["NativeGeocoder"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["MenuController"],
        src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_5__["LogfileService"]])
], ShowMapPage);



/***/ })

}]);
//# sourceMappingURL=pages-show-map-show-map-module-es2015.js.map