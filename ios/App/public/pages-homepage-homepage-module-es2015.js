(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-homepage-homepage-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/homepage/homepage.page.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/homepage/homepage.page.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      <ion-label>\n        <ion-row class=\"header-txt\">\n          <ion-col>\n            <img alt=\"Ally Home\" src=\"../../../assets/imgs/AppHeader.png\" class=\"header-img\" id=\"idAlly\" />\n          </ion-col>\n        </ion-row>\n      </ion-label>\n    </ion-title>\n\n    <ion-buttons slot=\"end\" class=\"margin-0\">\n      <ion-button class=\"margin-0\" [routerLink]=\"['/show-map']\" routerDirection=\"forward\">\n        <label class=\"lbl-location\">\n          <ion-icon name=\"pin\" class=\"location-icon\"></ion-icon> <br> My Location\n        </label>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-refresher slot=\"fixed\" pullFactor=\"0.5\" pullMin=\"100\" pullMax=\"200\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull to refresh\" refreshingSpinner=\"circles\"\n      refreshingText=\"Refreshing data...\">\n    </ion-refresher-content>\n  </ion-refresher>\n\n\n  <ion-tabs class=\"tabs-margin\" id=\"commonTabs\">\n    <ion-tab-bar slot=\"top\" class=\"tab-bar\">\n      <ion-tab-button tab=\"critical\" class=\"btn-tabs\" id=\"critical\">\n        <ion-icon src=\"../../../assets/icon/critical.svg\" class=\"critical-icon\">\n        </ion-icon>\n        <ion-label>Critical</ion-label>\n        <ion-badge *ngIf=\"criticalBadgeCount > 0\" id=\"badgeCritical\" color=\"danger\" class=\"icon-badge\">\n          {{criticalBadgeCount}}</ion-badge>\n      </ion-tab-button>\n      <ion-tab-button tab=\"serious\" class=\"btn-tabs\" id=\"serious\">\n        <ion-icon src=\"../../../assets/icon/notification_imp.svg\" class=\"serious-icon\"></ion-icon>\n        <ion-label>Serious</ion-label>\n        <ion-badge *ngIf=\"seriousBadgeCount > 0\" id=\"badgeSerious\" color=\"danger\" class=\"icon-badge\">\n          {{seriousBadgeCount}}</ion-badge>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"warning\" class=\"btn-tabs\" id=\"warning\">\n        <ion-icon src=\"../../../assets/icon/warning.svg\" class=\"warning-icon\"></ion-icon>\n        <ion-label>Warning</ion-label>\n        <ion-badge *ngIf=\"warningBadgeCount > 0\" id=\"badgeWarning\" color=\"danger\" class=\"icon-badge\">\n          {{warningBadgeCount}}</ion-badge>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"message\" class=\"btn-tabs\" id=\"message\">\n        <ion-icon src=\"../../../assets/icon/message.svg\" class=\"message-icon\"></ion-icon>\n        <ion-label>Low</ion-label>\n        <ion-badge *ngIf=\"messageBadgeCount > 0\" id=\"badgeMessage\" color=\"danger\" class=\"icon-badge\">\n          {{messageBadgeCount}}</ion-badge>\n      </ion-tab-button>\n    </ion-tab-bar>\n  </ion-tabs>\n\n</ion-content>\n\n<ion-footer class=\"footer-new-css\">\n  <ion-label>\n    <ion-row class=\"row-footer\">\n      <ion-col *ngIf=\"isClientAssigned\">\n        <div id=\"button-background\">\n          <span *ngIf=\"panicBtnValue\" class=\"slide-text\">Swipe to dial {{panicBtnValue}} </span>\n          <span *ngIf=\"!panicBtnValue\" class=\"slide-text\">Swipe to dial </span>\n          <div id=\"slider\" (touchmove)=\"touchmove($event)\" (touchend)=\"touchend($event)\">\n            <ion-icon src=\"../../../assets/icon/phone.svg\" class=\"phone-icon\">\n            </ion-icon>\n          </div>\n        </div>\n      </ion-col>\n\n      <ion-col *ngIf=\"!isClientAssigned\">\n        <div id=\"button-background\">\n          <span *ngIf=\"panicBtnValue\" class=\"slide-text\">Swipe to dial {{panicBtnValue}} </span>\n          <span *ngIf=\"!panicBtnValue\" class=\"slide-text\">Swipe to dial </span>\n          <div id=\"slider\">\n            <ion-icon src=\"../../../assets/icon/phone.svg\" class=\"phone-icon-disabled\">\n            </ion-icon>\n          </div>\n        </div>\n      </ion-col>\n    </ion-row>\n  </ion-label>\n</ion-footer>"

/***/ }),

/***/ "./src/app/pages/homepage/homepage-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/homepage/homepage-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: HomepagePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepagePageRoutingModule", function() { return HomepagePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _homepage_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./homepage.page */ "./src/app/pages/homepage/homepage.page.ts");




const routes = [
    {
        path: '',
        component: _homepage_page__WEBPACK_IMPORTED_MODULE_3__["HomepagePage"],
        children: [
            {
                path: 'critical',
                children: [
                    {
                        path: '',
                        loadChildren: () => __webpack_require__.e(/*! import() | critical-critical-critical-module */ "critical-critical-critical-module").then(__webpack_require__.bind(null, /*! ./critical/critical/critical.module */ "./src/app/pages/homepage/critical/critical/critical.module.ts")).then(m => m.CriticalPageModule)
                    }
                ]
            },
            {
                path: 'warning',
                children: [
                    {
                        path: '',
                        loadChildren: () => __webpack_require__.e(/*! import() | warning-warning-warning-module */ "warning-warning-warning-module").then(__webpack_require__.bind(null, /*! ./warning/warning/warning.module */ "./src/app/pages/homepage/warning/warning/warning.module.ts")).then(m => m.WarningPageModule)
                    }
                ]
            },
            {
                path: 'message',
                children: [
                    {
                        path: '',
                        loadChildren: () => __webpack_require__.e(/*! import() | message-message-message-module */ "message-message-message-module").then(__webpack_require__.bind(null, /*! ./message/message/message.module */ "./src/app/pages/homepage/message/message/message.module.ts")).then(m => m.MessagePageModule)
                    }
                ]
            },
            {
                path: 'serious',
                children: [
                    {
                        path: '',
                        loadChildren: () => __webpack_require__.e(/*! import() | serious-serious-module */ "serious-serious-module").then(__webpack_require__.bind(null, /*! ./serious/serious.module */ "./src/app/pages/homepage/serious/serious.module.ts")).then(m => m.SeriousPageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/homepage/critical',
                pathMatch: 'full'
            }
        ]
    }
];
let HomepagePageRoutingModule = class HomepagePageRoutingModule {
};
HomepagePageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], HomepagePageRoutingModule);



/***/ }),

/***/ "./src/app/pages/homepage/homepage.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/homepage/homepage.module.ts ***!
  \***************************************************/
/*! exports provided: HomepagePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepagePageModule", function() { return HomepagePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _homepage_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./homepage-routing.module */ "./src/app/pages/homepage/homepage-routing.module.ts");
/* harmony import */ var _homepage_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./homepage.page */ "./src/app/pages/homepage/homepage.page.ts");







let HomepagePageModule = class HomepagePageModule {
};
HomepagePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _homepage_routing_module__WEBPACK_IMPORTED_MODULE_5__["HomepagePageRoutingModule"]
        ],
        declarations: [_homepage_page__WEBPACK_IMPORTED_MODULE_6__["HomepagePage"]]
    })
], HomepagePageModule);



/***/ }),

/***/ "./src/app/pages/homepage/homepage.page.scss":
/*!***************************************************!*\
  !*** ./src/app/pages/homepage/homepage.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user-name {\n  font-size: 18px;\n  font-weight: bold;\n  margin-top: -8px;\n}\n\n.icon-set {\n  float: left;\n  color: red;\n  font-size: 20px;\n  margin-right: 1%;\n  margin-left: -3%;\n}\n\n.card-title {\n  font-weight: bold;\n  color: #a2a1a1;\n}\n\n.card-content-set {\n  margin-left: 4%;\n  margin-top: -12px;\n}\n\n.card-border {\n  border: 0.5px solid red;\n}\n\n.yellow-card {\n  border: 0.5px solid #bfbf35;\n}\n\n.icon-yellow {\n  float: left;\n  color: #bfbf35;\n  font-size: 20px;\n  margin-right: 1%;\n  margin-left: -3%;\n}\n\ninput[type=range] {\n  overflow: hidden;\n  width: 100%;\n  height: 20px;\n  -webkit-appearance: none;\n  border: 1px solid red;\n  border-radius: 25px;\n}\n\ninput[type=range]::-webkit-slider-runnable-track {\n  height: 10px;\n  -webkit-appearance: none;\n  color: gray;\n}\n\ninput[type=range]::-webkit-slider-thumb {\n  width: 30px;\n  -webkit-appearance: none;\n  height: 20px;\n  background: red;\n  box-shadow: -250px 0 0 250px red;\n  border-radius: 20px;\n}\n\n#slider {\n  -webkit-transition: width 0.3s, border-radius 0.3s, height 0.3s;\n  transition: width 0.3s, border-radius 0.3s, height 0.3s;\n  position: absolute;\n  left: 1px;\n  height: 57px;\n  border-radius: 50%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n#slider.unlocked {\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n  width: inherit;\n  left: 0 !important;\n  height: inherit;\n  border-radius: inherit;\n}\n\n.material-icons {\n  background: red;\n  color: white;\n  border-radius: 25px;\n  font-size: 42px;\n  padding: 4px;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  cursor: default;\n}\n\n.slide-text {\n  font-size: 15px;\n  color: white;\n  text-transform: capitalize;\n  font-family: \"Roboto\", sans-serif;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  cursor: default;\n}\n\n.bottom {\n  position: fixed;\n  bottom: 0;\n  font-size: 14px;\n  color: white;\n}\n\n.bottom a {\n  color: white;\n}\n\n.setEffect {\n  box-shadow: inset var(--sg) 0 0 red;\n  -webkit-transition: 3s;\n  transition: 3s;\n}\n\n#button-background {\n  position: relative;\n  background-color: #afafaf;\n  width: 100%;\n  height: 50px;\n  border: white;\n  border-radius: 40px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-transition: 3s;\n  transition: 3s;\n  box-shadow: inset var(--sg) 0 0 red;\n}\n\n.resetEffect {\n  box-shadow: inset 0 0 0 #816e6e !important;\n  -webkit-transition: 1s !important;\n  transition: 1s !important;\n}\n\n.footer-new-css {\n  padding-top: 6px;\n  padding-left: 24px;\n  padding-bottom: 6px;\n  background: #F3F3F4;\n}\n\n.grid-bg {\n  background: #F3F3F4 !important;\n}\n\n.tab-badge {\n  color: white;\n  border-radius: 122px !important;\n  padding: 2px;\n  height: 15px;\n  width: 15px;\n  background-color: red;\n  display: inline-block;\n}\n\n.critical-icon {\n  color: white;\n  background: #DE1A18;\n  border-radius: 50%;\n  font-size: 26px;\n  padding: 12px;\n}\n\n.serious-icon {\n  color: white;\n  background: #FD7E14;\n  border-radius: 50%;\n  font-size: 26px;\n  padding: 12px;\n}\n\n.warning-icon {\n  color: white;\n  background: #FFCE00;\n  border-radius: 50%;\n  font-size: 26px;\n  padding: 12px;\n}\n\n.message-icon {\n  color: white;\n  background: #3880FF;\n  border-radius: 50%;\n  font-size: 26px;\n  padding: 12px;\n}\n\n.phone-icon {\n  color: white;\n  background: red;\n  border-radius: 50%;\n  font-size: 26px;\n  padding: 12px;\n}\n\n.phone-icon-disabled {\n  color: white;\n  background: #ef9f9f;\n  border-radius: 50%;\n  font-size: 26px;\n  padding: 12px;\n}\n\n.tab-selected {\n  border-bottom: 1px solid black;\n}\n\n.btn-tabs {\n  color: black;\n  font-weight: bold;\n}\n\n.tab-bar {\n  height: 78px !important;\n  border-radius: 6px !important;\n  margin: 5px !important;\n}\n\n.icon-badge {\n  font-size: 12px;\n  margin-left: 10px;\n  border: 0.2px solid white;\n}\n\n.row-footer {\n  margin-left: 0% !important;\n  margin-right: 5% !important;\n}\n\n.header-img {\n  height: 18px !important;\n}\n\n.header-txt {\n  text-align: center !important;\n}\n\n.location-icon {\n  font-size: 22px !important;\n}\n\n.lbl-location {\n  font-size: 7px !important;\n  text-transform: capitalize !important;\n}\n\n.margin-0 {\n  margin: 0px !important;\n  padding: 0px !important;\n}\n\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=range] {\n    overflow: hidden;\n    width: 100%;\n    height: 20px;\n    -webkit-appearance: none;\n    border: 1px solid red;\n    border-radius: 25px;\n  }\n\n  input[type=range]::-webkit-slider-runnable-track {\n    height: 20px;\n    -webkit-appearance: none;\n    color: gray;\n    border-radius: 25px;\n  }\n\n  input[type=range]::-webkit-slider-thumb {\n    width: 20px;\n    -webkit-appearance: none;\n    height: 20px;\n    background: url(\"/assets/imgs/call-red-icon.jpg\");\n    box-shadow: -250px 0 0 250px red;\n    border-radius: 25px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy91bWFyL0Rvd25sb2Fkcy9TY3JhbU5ldC5BbGx5LkFuZHJvaWROYXRpdmVfMi9zcmMvYXBwL3BhZ2VzL2hvbWVwYWdlL2hvbWVwYWdlLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvaG9tZXBhZ2UvaG9tZXBhZ2UucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUNDSjs7QURFQTtFQUNJLFdBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUNDSjs7QURFQTtFQUNJLGlCQUFBO0VBQ0EsY0FBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0FDQ0o7O0FERUE7RUFDSSx1QkFBQTtBQ0NKOztBREVBO0VBQ0ksMkJBQUE7QUNDSjs7QURFQTtFQUNJLFdBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUNDSjs7QURFQTtFQUNJLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSx3QkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7QUNDSjs7QURFQTtFQUNJLFlBQUE7RUFDQSx3QkFBQTtFQUNBLFdBQUE7QUNDSjs7QURFQTtFQUNJLFdBQUE7RUFDQSx3QkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7RUFDQSxtQkFBQTtBQ0NKOztBRG9CQTtFQUNJLCtEQUFBO0VBQUEsdURBQUE7RUFHQSxrQkFBQTtFQUVBLFNBQUE7RUFJQSxZQUFBO0VBQ0Esa0JBQUE7RUExQkEsb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7QUNJSjs7QUR1Qkk7RUFDSSw0QkFBQTtFQUFBLG9CQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLHNCQUFBO0FDckJSOztBRCtCQTtFQUNJLGVBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQTNDQSwyQkFBQTtFQUNBLHlCQUFBO0VBRUEsc0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQ2dCSjs7QUR5QkE7RUFDSSxlQUFBO0VBQ0EsWUFBQTtFQUNBLDBCQUFBO0VBRUEsaUNBQUE7RUFwREEsMkJBQUE7RUFDQSx5QkFBQTtFQUVBLHNCQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUM4Qko7O0FEb0JBO0VBQ0ksZUFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtBQ2pCSjs7QURtQkk7RUFDSSxZQUFBO0FDakJSOztBRDZCQTtFQUNJLG1DQUFBO0VBQ0Esc0JBQUE7RUFBQSxjQUFBO0FDMUJKOztBRDZCQTtFQUNJLGtCQUFBO0VBQ0EseUJBQUE7RUFFQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQTdGQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQTZGQSxzQkFBQTtFQUFBLGNBQUE7RUFDQSxtQ0FBQTtBQ3pCSjs7QUQ2QkE7RUFDSSwwQ0FBQTtFQUNBLGlDQUFBO0VBQUEseUJBQUE7QUMxQko7O0FENkJBO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUMxQko7O0FEK0JBO0VBQ0ksOEJBQUE7QUM1Qko7O0FEa0RBO0VBQ0ksWUFBQTtFQUNBLCtCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxxQkFBQTtBQy9DSjs7QURxREE7RUFDSSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUdBLGVBQUE7RUFDQSxhQUFBO0FDcERKOztBRHVEQTtFQUNJLFlBQUE7RUFDQSxtQkFBQTtFQUdBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUN0REo7O0FEeURBO0VBQ0ksWUFBQTtFQUNBLG1CQUFBO0VBR0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtBQ3hESjs7QUQyREE7RUFDSSxZQUFBO0VBQ0EsbUJBQUE7RUFHQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0FDMURKOztBRDZEQTtFQUNJLFlBQUE7RUFDQSxlQUFBO0VBR0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtBQzVESjs7QUQrREE7RUFDSSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0FDNURKOztBRCtEQTtFQUNJLDhCQUFBO0FDNURKOztBRCtEQTtFQUNJLFlBQUE7RUFDQSxpQkFBQTtBQzVESjs7QUQrREE7RUFDSSx1QkFBQTtFQUNBLDZCQUFBO0VBQ0Esc0JBQUE7QUM1REo7O0FEbUVBO0VBQ0ksZUFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7QUNoRUo7O0FEbUVBO0VBQ0ksMEJBQUE7RUFDQSwyQkFBQTtBQ2hFSjs7QURtRUE7RUFDSSx1QkFBQTtBQ2hFSjs7QURvRUE7RUFDSSw2QkFBQTtBQ2pFSjs7QURvRUE7RUFDSSwwQkFBQTtBQ2pFSjs7QURvRUE7RUFDSSx5QkFBQTtFQUNBLHFDQUFBO0FDakVKOztBRG9FQTtFQUNJLHNCQUFBO0VBQ0EsdUJBQUE7QUNqRUo7O0FEc0VBO0VBQ0k7SUFDSSxnQkFBQTtJQUNBLFdBQUE7SUFDQSxZQUFBO0lBQ0Esd0JBQUE7SUFDQSxxQkFBQTtJQUNBLG1CQUFBO0VDbkVOOztFRHNFRTtJQUNJLFlBQUE7SUFDQSx3QkFBQTtJQUNBLFdBQUE7SUFDQSxtQkFBQTtFQ25FTjs7RURzRUU7SUFDSSxXQUFBO0lBQ0Esd0JBQUE7SUFDQSxZQUFBO0lBQ0EsaURBQUE7SUFDQSxnQ0FBQTtJQUNBLG1CQUFBO0VDbkVOO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9ob21lcGFnZS9ob21lcGFnZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudXNlci1uYW1lIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgbWFyZ2luLXRvcDogLThweDtcbn1cblxuLmljb24tc2V0IHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBjb2xvcjogcmVkO1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDElO1xuICAgIG1hcmdpbi1sZWZ0OiAtMyU7XG59XG5cbi5jYXJkLXRpdGxlIHtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBjb2xvcjogI2EyYTFhMTtcbn1cblxuLmNhcmQtY29udGVudC1zZXQge1xuICAgIG1hcmdpbi1sZWZ0OiA0JTtcbiAgICBtYXJnaW4tdG9wOiAtMTJweDtcbn1cblxuLmNhcmQtYm9yZGVyIHtcbiAgICBib3JkZXI6IDAuNXB4IHNvbGlkIHJlZDtcbn1cblxuLnllbGxvdy1jYXJkIHtcbiAgICBib3JkZXI6IDAuNXB4IHNvbGlkICNiZmJmMzU7XG59XG5cbi5pY29uLXllbGxvdyB7XG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgY29sb3I6ICNiZmJmMzU7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICAgIG1hcmdpbi1yaWdodDogMSU7XG4gICAgbWFyZ2luLWxlZnQ6IC0zJTtcbn1cblxuaW5wdXRbdHlwZT0ncmFuZ2UnXSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xufVxuXG5pbnB1dFt0eXBlPSdyYW5nZSddOjotd2Via2l0LXNsaWRlci1ydW5uYWJsZS10cmFjayB7XG4gICAgaGVpZ2h0OiAxMHB4O1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICBjb2xvcjogZ3JheTtcbn1cblxuaW5wdXRbdHlwZT0ncmFuZ2UnXTo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuICAgIHdpZHRoOiAzMHB4O1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgYmFja2dyb3VuZDogcmVkO1xuICAgIGJveC1zaGFkb3c6IC0yNTBweCAwIDAgMjUwcHggcmVkO1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG59XG5cbi8vIHN3aXBlIGJ1dHRvblxuXG5AbWl4aW4gY2VudGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbkBtaXhpbiBub25zZWxlY3Qge1xuICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbiNzbGlkZXIge1xuICAgIHRyYW5zaXRpb246IHdpZHRoIDAuM3MsXG4gICAgICAgIGJvcmRlci1yYWRpdXMgMC4zcyxcbiAgICAgICAgaGVpZ2h0IDAuM3M7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIC8vbGVmdDogLTEwcHg7XG4gICAgbGVmdDogMXB4O1xuICAgIC8vIGxlZnQ6IC0zcHg7XG4gICAgLy8gYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgLy8gd2lkdGg6IDg1cHg7XG4gICAgaGVpZ2h0OiA1N3B4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBAaW5jbHVkZSBjZW50ZXI7XG5cbiAgICAmLnVubG9ja2VkIHtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG4gICAgICAgIHdpZHRoOiBpbmhlcml0O1xuICAgICAgICBsZWZ0OiAwICFpbXBvcnRhbnQ7XG4gICAgICAgIGhlaWdodDogaW5oZXJpdDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogaW5oZXJpdDtcbiAgICB9XG59XG5cbi8vIC5tYXRlcmlhbC1pY29ucyB7XG4vLyAgICAgY29sb3I6IGJsYWNrO1xuLy8gICAgIGZvbnQtc2l6ZTogNTBweDtcbi8vICAgICBAaW5jbHVkZSBub25zZWxlY3Q7IFxuLy8gfVxuXG4ubWF0ZXJpYWwtaWNvbnMge1xuICAgIGJhY2tncm91bmQ6IHJlZDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgICBmb250LXNpemU6IDQycHg7XG4gICAgcGFkZGluZzogNHB4O1xuICAgIEBpbmNsdWRlIG5vbnNlbGVjdDtcbn1cblxuLnNsaWRlLXRleHQge1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG5cbiAgICBmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7XG4gICAgQGluY2x1ZGUgbm9uc2VsZWN0O1xufVxuXG4uYm90dG9tIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgYm90dG9tOiAwO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogd2hpdGU7XG5cbiAgICBhIHtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cbn1cblxuLy8gI2J1dHRvbi1iYWNrZ3JvdW5ke1xuLy8gLy9iYWNrZ3JvdW5kOiB2YXIoLS1iZyk7XG4vLyAgIHRyYW5zaXRpb246M3M7XG4vLyAgYm94LXNoYWRvdzogaW5zZXQgdmFyKC0tc2cpICAwIDAgcmVkO1xuXG5cbi8vIH1cblxuLnNldEVmZmVjdCB7XG4gICAgYm94LXNoYWRvdzogaW5zZXQgdmFyKC0tc2cpIDAgMCByZWQ7XG4gICAgdHJhbnNpdGlvbjogM3M7XG59XG5cbiNidXR0b24tYmFja2dyb3VuZCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0ZW4oJGNvbG9yOiAjYWZhZmFmLCAkYW1vdW50OiAwKTtcbiAgICAvLyB3aWR0aDogMzA2cHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIGJvcmRlcjogd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogNDBweDtcbiAgICBAaW5jbHVkZSBjZW50ZXI7XG4gICAgdHJhbnNpdGlvbjogM3M7XG4gICAgYm94LXNoYWRvdzogaW5zZXQgdmFyKC0tc2cpIDAgMCByZWQ7XG59XG5cbi8vcmVzZXRcbi5yZXNldEVmZmVjdCB7XG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgIzgxNmU2ZSAhaW1wb3J0YW50O1xuICAgIHRyYW5zaXRpb246IDFzICFpbXBvcnRhbnQ7XG59XG5cbi5mb290ZXItbmV3LWNzcyB7XG4gICAgcGFkZGluZy10b3A6IDZweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDI0cHg7XG4gICAgcGFkZGluZy1ib3R0b206IDZweDtcbiAgICBiYWNrZ3JvdW5kOiAjRjNGM0Y0O1xufVxuXG4vLyB0YWJzIGNzc1xuXG4uZ3JpZC1iZyB7XG4gICAgYmFja2dyb3VuZDogI0YzRjNGNCAhaW1wb3J0YW50O1xufVxuXG4vLyAudGFicy1tYXJnaW4ge1xuLy8gICAgIG1hcmdpbi10b3A6IDEyMHB4ICFpbXBvcnRhbnQ7XG4vLyB9XG5cbi8vIC5idG4tdGFicyB7XG4vLyAgICAgYmFja2dyb3VuZDogI2Q0ZDNkMyAhaW1wb3J0YW50OyBcbi8vICAgICBjb2xvcjogYmxhY2s7XG4vLyAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4vLyB9XG4vLyAudGFiLXNlbGVjdGVkIHtcbi8vICAgICBiYWNrZ3JvdW5kOiB3aGl0ZSAhaW1wb3J0YW50O1xuLy8gfVxuXG4vLyAudGFiLWJhciB7XG4vLyAgICAgaGVpZ2h0OiAzMnB4ICFpbXBvcnRhbnQ7XG4vLyAgICAgYm9yZGVyLXJhZGl1czogNnB4ICFpbXBvcnRhbnQ7XG4vLyAgICAgbWFyZ2luOiA1cHggIWltcG9ydGFudDsgXG4vLyAgICAgYm9yZGVyOiAxcHggc29saWQgI2Q0ZDNkMztcbi8vIH1cbi50YWItYmFkZ2Uge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBib3JkZXItcmFkaXVzOiAxMjJweCAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmc6IDJweDtcbiAgICBoZWlnaHQ6IDE1cHg7XG4gICAgd2lkdGg6IDE1cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuXG4vLyBuZXcgVGFiIENTUyBcblxuLmNyaXRpY2FsLWljb24ge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBiYWNrZ3JvdW5kOiAjREUxQTE4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAvLyBmb250LXNpemU6IDMycHg7XG4gICAgLy8gcGFkZGluZzogOHB4O1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgICBwYWRkaW5nOiAxMnB4O1xufVxuXG4uc2VyaW91cy1pY29uIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZDogI0ZEN0UxNDtcbiAgICAvL2ZvbnQtc2l6ZTogMzJweDtcbiAgICAvL3BhZGRpbmc6IDhweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgZm9udC1zaXplOiAyNnB4O1xuICAgIHBhZGRpbmc6IDEycHg7XG59XG5cbi53YXJuaW5nLWljb24ge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBiYWNrZ3JvdW5kOiAjRkZDRTAwO1xuICAgIC8vIGZvbnQtc2l6ZTogMzJweDtcbiAgICAvLyBwYWRkaW5nOiA4cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgICBwYWRkaW5nOiAxMnB4O1xufVxuXG4ubWVzc2FnZS1pY29uIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZDogIzM4ODBGRjtcbiAgICAvLyBmb250LXNpemU6IDMycHg7XG4gICAgLy8gcGFkZGluZzogOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBmb250LXNpemU6IDI2cHg7XG4gICAgcGFkZGluZzogMTJweDtcbn1cblxuLnBob25lLWljb24ge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBiYWNrZ3JvdW5kOiByZWQ7XG4gICAgLy8gZm9udC1zaXplOiAzMnB4O1xuICAgIC8vIHBhZGRpbmc6IDhweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgZm9udC1zaXplOiAyNnB4O1xuICAgIHBhZGRpbmc6IDEycHg7XG59XG5cbi5waG9uZS1pY29uLWRpc2FibGVkIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZDogI2VmOWY5ZjtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgZm9udC1zaXplOiAyNnB4O1xuICAgIHBhZGRpbmc6IDEycHg7XG59XG5cbi50YWItc2VsZWN0ZWQge1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjaztcbn1cblxuLmJ0bi10YWJzIHtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi50YWItYmFyIHtcbiAgICBoZWlnaHQ6IDc4cHggIWltcG9ydGFudDtcbiAgICBib3JkZXItcmFkaXVzOiA2cHggIWltcG9ydGFudDtcbiAgICBtYXJnaW46IDVweCAhaW1wb3J0YW50O1xufVxuXG4udGFicy1tYXJnaW4ge1xuICAgIC8vIG1hcmdpbi10b3A6IDU1cHggIWltcG9ydGFudDtcbn1cblxuLmljb24tYmFkZ2Uge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICBib3JkZXI6IDAuMnB4IHNvbGlkIHdoaXRlO1xufVxuXG4ucm93LWZvb3RlciB7XG4gICAgbWFyZ2luLWxlZnQ6IDAlICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luLXJpZ2h0OiA1JSAhaW1wb3J0YW50O1xufVxuXG4uaGVhZGVyLWltZyB7XG4gICAgaGVpZ2h0OiAxOHB4ICFpbXBvcnRhbnQ7XG4gICAgLy8gbWFyZ2luLWxlZnQ6IC0yMCUgIWltcG9ydGFudDtcbn1cblxuLmhlYWRlci10eHQge1xuICAgIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xufVxuXG4ubG9jYXRpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAyMnB4ICFpbXBvcnRhbnQ7XG59XG5cbi5sYmwtbG9jYXRpb24ge1xuICAgIGZvbnQtc2l6ZTogN3B4ICFpbXBvcnRhbnQ7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemUgIWltcG9ydGFudDtcbn1cblxuLm1hcmdpbi0wIHtcbiAgICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmc6IDBweCAhaW1wb3J0YW50O1xufVxuXG4vLyBkaWFsIDkxMSBjc3MgdHJ5b3V0XG5cbkBtZWRpYSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86MCkge1xuICAgIGlucHV0W3R5cGU9J3JhbmdlJ10ge1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgICB9XG5cbiAgICBpbnB1dFt0eXBlPSdyYW5nZSddOjotd2Via2l0LXNsaWRlci1ydW5uYWJsZS10cmFjayB7XG4gICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgICBjb2xvcjogZ3JheTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgICB9XG5cbiAgICBpbnB1dFt0eXBlPSdyYW5nZSddOjotd2Via2l0LXNsaWRlci10aHVtYiB7XG4gICAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIGhlaWdodDogMjBweDtcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKCcvYXNzZXRzL2ltZ3MvY2FsbC1yZWQtaWNvbi5qcGcnKTtcbiAgICAgICAgYm94LXNoYWRvdzogLTI1MHB4IDAgMCAyNTBweCByZWQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gICAgfVxuXG4gICAgLy8gZW5kIGRpYWwgOTExIGNzcyB0cnlvdXRcblxufSIsIi51c2VyLW5hbWUge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBtYXJnaW4tdG9wOiAtOHB4O1xufVxuXG4uaWNvbi1zZXQge1xuICBmbG9hdDogbGVmdDtcbiAgY29sb3I6IHJlZDtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDElO1xuICBtYXJnaW4tbGVmdDogLTMlO1xufVxuXG4uY2FyZC10aXRsZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjb2xvcjogI2EyYTFhMTtcbn1cblxuLmNhcmQtY29udGVudC1zZXQge1xuICBtYXJnaW4tbGVmdDogNCU7XG4gIG1hcmdpbi10b3A6IC0xMnB4O1xufVxuXG4uY2FyZC1ib3JkZXIge1xuICBib3JkZXI6IDAuNXB4IHNvbGlkIHJlZDtcbn1cblxuLnllbGxvdy1jYXJkIHtcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCAjYmZiZjM1O1xufVxuXG4uaWNvbi15ZWxsb3cge1xuICBmbG9hdDogbGVmdDtcbiAgY29sb3I6ICNiZmJmMzU7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgbWFyZ2luLXJpZ2h0OiAxJTtcbiAgbWFyZ2luLWxlZnQ6IC0zJTtcbn1cblxuaW5wdXRbdHlwZT1yYW5nZV0ge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAyMHB4O1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcbn1cblxuaW5wdXRbdHlwZT1yYW5nZV06Oi13ZWJraXQtc2xpZGVyLXJ1bm5hYmxlLXRyYWNrIHtcbiAgaGVpZ2h0OiAxMHB4O1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gIGNvbG9yOiBncmF5O1xufVxuXG5pbnB1dFt0eXBlPXJhbmdlXTo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuICB3aWR0aDogMzBweDtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICBoZWlnaHQ6IDIwcHg7XG4gIGJhY2tncm91bmQ6IHJlZDtcbiAgYm94LXNoYWRvdzogLTI1MHB4IDAgMCAyNTBweCByZWQ7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG59XG5cbiNzbGlkZXIge1xuICB0cmFuc2l0aW9uOiB3aWR0aCAwLjNzLCBib3JkZXItcmFkaXVzIDAuM3MsIGhlaWdodCAwLjNzO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDFweDtcbiAgaGVpZ2h0OiA1N3B4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuI3NsaWRlci51bmxvY2tlZCB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xuICB3aWR0aDogaW5oZXJpdDtcbiAgbGVmdDogMCAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG4gIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG59XG5cbi5tYXRlcmlhbC1pY29ucyB7XG4gIGJhY2tncm91bmQ6IHJlZDtcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICBmb250LXNpemU6IDQycHg7XG4gIHBhZGRpbmc6IDRweDtcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLnNsaWRlLXRleHQge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIGZvbnQtZmFtaWx5OiBcIlJvYm90b1wiLCBzYW5zLXNlcmlmO1xuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uYm90dG9tIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBib3R0b206IDA7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6IHdoaXRlO1xufVxuLmJvdHRvbSBhIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uc2V0RWZmZWN0IHtcbiAgYm94LXNoYWRvdzogaW5zZXQgdmFyKC0tc2cpIDAgMCByZWQ7XG4gIHRyYW5zaXRpb246IDNzO1xufVxuXG4jYnV0dG9uLWJhY2tncm91bmQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNhZmFmYWY7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJvcmRlcjogd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0cmFuc2l0aW9uOiAzcztcbiAgYm94LXNoYWRvdzogaW5zZXQgdmFyKC0tc2cpIDAgMCByZWQ7XG59XG5cbi5yZXNldEVmZmVjdCB7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwICM4MTZlNmUgIWltcG9ydGFudDtcbiAgdHJhbnNpdGlvbjogMXMgIWltcG9ydGFudDtcbn1cblxuLmZvb3Rlci1uZXctY3NzIHtcbiAgcGFkZGluZy10b3A6IDZweDtcbiAgcGFkZGluZy1sZWZ0OiAyNHB4O1xuICBwYWRkaW5nLWJvdHRvbTogNnB4O1xuICBiYWNrZ3JvdW5kOiAjRjNGM0Y0O1xufVxuXG4uZ3JpZC1iZyB7XG4gIGJhY2tncm91bmQ6ICNGM0YzRjQgIWltcG9ydGFudDtcbn1cblxuLnRhYi1iYWRnZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogMTIycHggIWltcG9ydGFudDtcbiAgcGFkZGluZzogMnB4O1xuICBoZWlnaHQ6IDE1cHg7XG4gIHdpZHRoOiAxNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLmNyaXRpY2FsLWljb24ge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6ICNERTFBMTg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgZm9udC1zaXplOiAyNnB4O1xuICBwYWRkaW5nOiAxMnB4O1xufVxuXG4uc2VyaW91cy1pY29uIHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kOiAjRkQ3RTE0O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGZvbnQtc2l6ZTogMjZweDtcbiAgcGFkZGluZzogMTJweDtcbn1cblxuLndhcm5pbmctaWNvbiB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogI0ZGQ0UwMDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBmb250LXNpemU6IDI2cHg7XG4gIHBhZGRpbmc6IDEycHg7XG59XG5cbi5tZXNzYWdlLWljb24ge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6ICMzODgwRkY7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgZm9udC1zaXplOiAyNnB4O1xuICBwYWRkaW5nOiAxMnB4O1xufVxuXG4ucGhvbmUtaWNvbiB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogcmVkO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGZvbnQtc2l6ZTogMjZweDtcbiAgcGFkZGluZzogMTJweDtcbn1cblxuLnBob25lLWljb24tZGlzYWJsZWQge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6ICNlZjlmOWY7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgZm9udC1zaXplOiAyNnB4O1xuICBwYWRkaW5nOiAxMnB4O1xufVxuXG4udGFiLXNlbGVjdGVkIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG4uYnRuLXRhYnMge1xuICBjb2xvcjogYmxhY2s7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4udGFiLWJhciB7XG4gIGhlaWdodDogNzhweCAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiA2cHggIWltcG9ydGFudDtcbiAgbWFyZ2luOiA1cHggIWltcG9ydGFudDtcbn1cblxuLmljb24tYmFkZ2Uge1xuICBmb250LXNpemU6IDEycHg7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICBib3JkZXI6IDAuMnB4IHNvbGlkIHdoaXRlO1xufVxuXG4ucm93LWZvb3RlciB7XG4gIG1hcmdpbi1sZWZ0OiAwJSAhaW1wb3J0YW50O1xuICBtYXJnaW4tcmlnaHQ6IDUlICFpbXBvcnRhbnQ7XG59XG5cbi5oZWFkZXItaW1nIHtcbiAgaGVpZ2h0OiAxOHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5oZWFkZXItdHh0IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XG59XG5cbi5sb2NhdGlvbi1pY29uIHtcbiAgZm9udC1zaXplOiAyMnB4ICFpbXBvcnRhbnQ7XG59XG5cbi5sYmwtbG9jYXRpb24ge1xuICBmb250LXNpemU6IDdweCAhaW1wb3J0YW50O1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZSAhaW1wb3J0YW50O1xufVxuXG4ubWFyZ2luLTAge1xuICBtYXJnaW46IDBweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nOiAwcHggIWltcG9ydGFudDtcbn1cblxuQG1lZGlhIHNjcmVlbiBhbmQgKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMCkge1xuICBpbnB1dFt0eXBlPXJhbmdlXSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICB9XG5cbiAgaW5wdXRbdHlwZT1yYW5nZV06Oi13ZWJraXQtc2xpZGVyLXJ1bm5hYmxlLXRyYWNrIHtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIGNvbG9yOiBncmF5O1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIH1cblxuICBpbnB1dFt0eXBlPXJhbmdlXTo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgYmFja2dyb3VuZDogdXJsKFwiL2Fzc2V0cy9pbWdzL2NhbGwtcmVkLWljb24uanBnXCIpO1xuICAgIGJveC1zaGFkb3c6IC0yNTBweCAwIDAgMjUwcHggcmVkO1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/homepage/homepage.page.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/homepage/homepage.page.ts ***!
  \*************************************************/
/*! exports provided: HomepagePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepagePage", function() { return HomepagePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/badge/ngx */ "./node_modules/@ionic-native/badge/ngx/index.js");
/* harmony import */ var _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/call-number/ngx */ "./node_modules/@ionic-native/call-number/ngx/index.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "./node_modules/@ionic-native/native-geocoder/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_app_modal_dial_number_dial_number_page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/modal/dial-number/dial-number.page */ "./src/app/modal/dial-number/dial-number.page.ts");
/* harmony import */ var src_app_provider_auth_authentication_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/provider/auth/authentication.service */ "./src/app/provider/auth/authentication.service.ts");
/* harmony import */ var src_app_provider_business_model_business_model_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/provider/business-model/business-model.service */ "./src/app/provider/business-model/business-model.service.ts");
/* harmony import */ var src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/provider/common-api/common-api.service */ "./src/app/provider/common-api/common-api.service.ts");
/* harmony import */ var src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/provider/common-file/logfile.service */ "./src/app/provider/common-file/logfile.service.ts");
/* harmony import */ var src_app_provider_device_api_device_info_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/provider/device-api/device-info.service */ "./src/app/provider/device-api/device-info.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");


















const { PushNotifications, Device, LocalNotifications, CustomNativePlugin } = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"];
let HomepagePage = class HomepagePage {
    constructor(menuCtrl, businessModelService, deviceInfoService, commonAPIService, callNumber, nativeGeocoder, geolocation, modalController, events, router, zone, changeDetectorRef, store, authenticationService, badge, logService, alertController) {
        this.menuCtrl = menuCtrl;
        this.businessModelService = businessModelService;
        this.deviceInfoService = deviceInfoService;
        this.commonAPIService = commonAPIService;
        this.callNumber = callNumber;
        this.nativeGeocoder = nativeGeocoder;
        this.geolocation = geolocation;
        this.modalController = modalController;
        this.events = events;
        this.router = router;
        this.zone = zone;
        this.changeDetectorRef = changeDetectorRef;
        this.store = store;
        this.authenticationService = authenticationService;
        this.badge = badge;
        this.logService = logService;
        this.alertController = alertController;
        this.ringing = 0;
        this.isReceived = false;
        this.pushListeners = [];
        this.pushDidInitialize = false;
        this.pushTokenNewId = "";
        this.pushTokenId = "";
        this.deviceId = "";
        this.deviceNewId = "";
        this.errorMessage = "";
        this.emailId = "";
        this.isClientAssigned = false;
        this.seriousBadgeCount = 0;
        this.criticalBadgeCount = 0;
        this.warningBadgeCount = 0;
        this.messageBadgeCount = 0;
        this.daysToKeepEvents = 0;
        this.isTappedPressed = false;
        this.resetSwipeButton = rxjs__WEBPACK_IMPORTED_MODULE_10__["Observable"].create(function (observer) {
            this.getSlider = document.getElementById('slider');
            this.getSlider.style.marginLeft = '';
            this.getSlider.style.transition = '0s';
            this.getBtn = document.getElementById('button-background');
            this.getBtn.classList.add('resetEffect');
            let addText = document.getElementsByClassName('slide-text');
            addText[0].textContent = 'Swipe to dial ' + this.panicBtnValue;
        });
        this.getVictimDetailsFromStorage();
        this.pushNotificationToken = this.commonAPIService.globalPushToken;
        // TODO: Check position of this code
        this.logService.logDebug('HomePage', 'constructor', "Home Page started");
        this.getTourValue();
        this.daysToKeepEvents = 0;
        this.badge.hasPermission().then(res => {
            console.log('Badge Permission check');
            console.log(res);
            this.badge.requestPermission().then(res2 => {
                console.log('Badge requestPermission check');
                console.log(res2);
            });
        }).catch(err => {
            console.log('Badge error : ');
            console.log(err);
        });
        this.eventSubscribtions();
        this.resetSwipeButtonInit();
        this.seriousBadgeCount = this.commonAPIService.seriousBadgeCount;
        this.criticalBadgeCount = this.commonAPIService.criticalBadgeCount;
        this.warningBadgeCount = this.commonAPIService.warningBadgeCount;
        this.messageBadgeCount = this.commonAPIService.messageBadgeCount;
    }
    getVictimDetailsFromStorage() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.commonAPIService.victimDetails = yield this.commonAPIService.getStorageValue('loggedInVictimDetails');
            this.sendVictimDetailsToNativeApp(this.commonAPIService.victimDetails);
        });
    }
    eventSubscribtions() {
        this.commonAPIService.victimDetails = this.commonAPIService.getStorageValue('loggedInVictimDetails');
        this.logService.logDebug('HomePage', 'eventSubscribtions', "Event Subscribed");
        this.events.subscribe('update:count', (data) => {
            this.logService.logDebug('HomePage', 'eventSubscribtions', 'update:count : ' + data);
            this.manageBadgeCount(data);
        });
        this.events.subscribe('allAlertsDeleted', (data) => {
            this.logService.logDebug('HomePage', 'eventSubscribtions', 'allAlertsDeleted called');
            this.getAllAlertEventList();
        });
        this.events.subscribe('panicBtnValue', (data) => {
            this.logService.logDebug('HomePage', 'eventSubscribtions', 'panicBtnValue : ' + data);
            this.panicBtnValue = data;
        });
        this.events.subscribe('autoRefreshAlertList', (data) => {
            console.log('autoRefreshAlertList called');
            this.logService.logDebug('HomePage', 'autoRefreshAlertList', 'autoRefreshAlertList called');
            if (!this.isTappedPressed) {
                this.getAllAlertEventListAfterNotification();
            }
        });
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield Device.getInfo().then(deviceInfo => this.deviceInfo = deviceInfo);
            this.setSwipeButton();
            this.commonAPIService.victimDetails = yield this.commonAPIService.getStorageValue('loggedInVictimDetails');
            this.sendVictimDetailsToNativeApp(this.commonAPIService.victimDetails);
            PushNotifications.requestPermissions().then(result => {
                if (result) {
                    // Register with Apple / Google to receive push via APNS/FCM
                    this.logService.logInfo('HomePage', 'PushNotifications.requestPermissions()', 'PushNotifications.requestPermissions success');
                    this.initializePushResources();
                }
                else {
                    // Show some error
                    this.logService.logError('HomePage', 'PushNotifications.requestPermissions()', 'Error in Requesting PushNotifications.requestPermissions');
                }
            });
            this.getVictimDetailsAndRegisterDevice();
            this.resetSwipeButton.subscribe(a => this.logService.logDebug('HomePage', 'eventSubscribtions', 'resetSwipeButton subscribed'));
        });
    }
    getVictimDetailsAndRegisterDevice() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('HomePage', 'getVictimDetailsAndRegisterDevice()', 'getVictimDetailsAndRegisterDevice call started');
            var userInfo = yield this.commonAPIService.getStorageValue('loggedInUserDetails');
            this.logService.logDebug('HomePage', 'getVictimDetailsAndRegisterDevice', "userInfo : " + JSON.stringify(userInfo));
            // Get Victim Details by email id
            this.getAssignedClientsList();
            this.checkDeviceRegistration(this.commonAPIService.victimDetails.victimId).then(regResponse => {
                if (regResponse) {
                    // For Android Native service call
                    this.logService.logDebug('HomePage', 'getVictimDetailsAndRegisterDevice', 'Is this.commonAPIService.isServiceStarted : ' +
                        this.commonAPIService.isServiceStarted);
                    if (!this.commonAPIService.isServiceStarted) {
                        CustomNativePlugin.customCall();
                        CustomNativePlugin.IsMobileDataEnabled().then(res => {
                            console.log('IsMobileDataEnabled : ');
                            console.log(res);
                        });
                        this.commonAPIService.isServiceStarted = true;
                        this.logService.logDebug('HomePage', 'getVictimDetailsAndRegisterDevice', 'Is this.commonAPIService.isServiceStarted : ' +
                            this.commonAPIService.isServiceStarted);
                    }
                }
            });
            this.logService.logDebug('HomePage', 'getVictimDetailsAndRegisterDevice()', 'getVictimDetailsAndRegisterDevice call ended');
        });
    }
    checkDeviceRegistration(victimId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('HomePage', 'checkDeviceRegistration()', 'checkDeviceRegistration call started');
            this.deviceId = yield this.commonAPIService.getStorageValue('deviceId');
            this.logService.logDebug('HomePage', ' checkDeviceRegistration()', ' deviceId ' + this.deviceId + ", New ID: "
                + this.deviceInfoService.uuid);
            this.pushTokenId = yield this.commonAPIService.getStorageValue('pushTokenId');
            this.logService.logDebug('HomePage', ' checkDeviceRegistration()', ' pushTokenId ' + this.pushTokenId);
            // this.logService.logDebug('HomePage', ' checkDeviceRegistration()', ' pushTokenId ' + this.pushTokenId + ", New ID: " 
            // + this.pushNotificationToken.value);
            this.logService.logDebug('HomePage', ' checkDeviceRegistration()', 'Device registration started');
            this.commonAPIService.showLoader('Loading data...');
            var isPayload = yield this.setRegistrationPayLoad().then((payloadResponse) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                this.logService.logDebug('HomePage', ' checkDeviceRegistration()', 'Registration PayLoad:' + isPayload);
                this.commonAPIService.hideLoader();
                var isDeviceRegistered = yield this.deviceRegistration(this.mobileConfig).then(deviceRegistrationResponse => {
                    this.logService.logDebug('HomePage', ' checkDeviceRegistration()', 'isDeviceRegistered:' + isDeviceRegistered);
                });
            })).catch(err => {
                this.commonAPIService.hideLoader();
                console.log(err);
            });
            this.logService.logDebug('HomePage', 'checkDeviceRegistration()', 'checkDeviceRegistration call Ended');
            return true;
        });
    }
    setRegistrationPayLoad() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('HomePage', ' setRegistrationPayLoad()', 'Setting Registration PayLoad');
            this.mobileConfig = {
                phoneType: this.deviceInfo.manufacturer,
                appVersion: this.commonAPIService.appVersionNumber,
                deviceOS: this.deviceInfoService.os,
                deviceOSVersion: this.deviceInfo.osVersion,
                deviceImei: this.deviceInfo.uuid,
                // deviceImei: '7959c215e50160f2',
                simNumber: this.authenticationService.simInfo ? this.authenticationService.simInfo.simSerialNumbe : "",
                phoneNumber: this.authenticationService.simInfo ? this.authenticationService.simInfo.phoneNumber : "",
                phoneSerialNumber: this.authenticationService.simInfo ? this.authenticationService.simInfo.deviceId : "",
                phoneName: this.getDeviceName(),
                carrier: this.authenticationService.simInfo ? this.authenticationService.simInfo.carrierName : "",
                systemMode: 2,
                locationFrequency: 1,
                transmissionFrequency: 1,
                csq: 0,
                dateTime: new Date().toJSON(),
                pushToken: (typeof this.pushNotificationToken != 'undefined' && this.pushNotificationToken) ? this.pushNotificationToken.value : 'NoToken',
                victimId: this.commonAPIService.victimDetails.victimId
            };
            this.logService.logDebug('HomePage', ' setRegistrationPayLoad() ', "Registration Messsage payload: " + JSON.stringify(this.mobileConfig));
            return true;
        });
    }
    deviceRegistration(mobileConfig) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('HomePage', 'deviceRegistration()', 'deviceRegistration call started');
            this.commonAPIService.showLoader('Loading data...');
            this.logService.logDebug('HomePage', 'deviceRegistration', 'Calling deviceRegistrationAPI : ' +
                src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].gatewayUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].mobileDeviceConfigurationAPI);
            //this.commonAPIService.postDataWithInterceptorObservable(environment.mobileDeviceConfigurationAPI, mobileConfig)
            this.commonAPIService.postDataWithInterceptorObservable(src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].mobileDeviceRegisterDevice, mobileConfig)
                .toPromise()
                .then((response) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                console.log('Validate Device : ');
                console.log(response);
                var apiReponse = yield response;
                this.commonAPIService.hideLoader();
                this.logService.logInfo('HomePage', 'deviceRegistration', 'Called deviceRegistrationAPI with response: ' + apiReponse);
                this.commonAPIService.setStorageValue('deviceId', this.deviceInfo.uuid);
                this.commonAPIService.setStorageValue('pushTokenId', mobileConfig.pushToken);
                yield this.getAppSettingDetails();
                return true;
            }), err => {
                this.logService.logError('HomePage', 'deviceRegistration', 'Called deviceRegistrationAPI with failed response: '
                    + JSON.stringify(err));
                this.errorMessage = 'Device registration failed..';
                this.commonAPIService.hideLoader();
                // this.authenticationService.logoutVictim();
            });
            this.logService.logDebug('HomePage', 'deviceRegistration()', 'deviceRegistration call Ended');
            return false;
        });
    }
    getAppSettingDetails() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('HomePage', 'getAppSettingDetails()', 'getAppSettingDetails call started');
            this.commonAPIService.showLoader('Loading data...');
            // Get Configuration data
            this.logService.logDebug('HomePage', 'getAppSettingDetails()', "Calling VictimConfiguration API : " +
                src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].gatewayUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].victimConfigurationAPI + this.commonAPIService.victimDetails.victimId);
            this.commonAPIService.getData(src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].victimConfigurationAPI +
                this.commonAPIService.victimDetails.victimId).toPromise().then((data) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                this.commonAPIService.appConfiguration = yield data.body;
                this.logService.logDebug('HomePage', 'getAppSettingDetails()', 'Called VictimConfiguration API with response: ' + JSON.stringify(this.commonAPIService.appConfiguration));
                if (this.commonAPIService.appConfiguration && this.commonAPIService.appConfiguration) {
                    this.panicBtnValue = yield this.commonAPIService.appConfiguration.panicButtonPhoneNumber;
                    this.events.publish('panicBtnValue', this.commonAPIService.appConfiguration.panicButtonPhoneNumber);
                    this.daysToKeepEvents = this.commonAPIService.appConfiguration.daysToKeepEvents;
                    yield this.getAllAlertEventList();
                }
                else {
                    //TODO: discuss with Ron what should be the action if configuration is not returning value
                }
                this.commonAPIService.hideLoader();
            }), err => {
                this.commonAPIService.hideLoader();
                this.logService.logError('HomePage', 'getAppSettingDetails()', "Called VictimConfiguration API with failed response : " + JSON.stringify(err));
            });
            this.logService.logDebug('HomePage', 'getAppSettingDetails()', 'getAppSettingDetails call ended');
        });
    }
    getAllAlertEventList() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'getAllAlertEventList call started');
            this.commonAPIService.isLoadingData = true;
            this.commonAPIService.showLoader('Loading data...');
            // this.seriousBadgeCount = 0;
            // this.criticalBadgeCount = 0;
            // this.warningBadgeCount = 0;
            // this.messageBadgeCount = 0;
            // this.totalUnreadCount = 0;
            if (this.daysToKeepEvents === 0) {
                this.daysToKeepEvents = 31;
            }
            this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'Calling alertEventsListAPI :' +
                src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].gatewayUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].alertEventsListAPI + this.commonAPIService.victimDetails.victimId + '/' + this.daysToKeepEvents);
            this.commonAPIService.getData(src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].alertEventsListAPI +
                this.commonAPIService.victimDetails.victimId + '/' + this.daysToKeepEvents).toPromise().then((data) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'Called alertEventsListAPI : with response : ');
                this.allEventAlertList = yield data.body;
                this.commonAPIService.allAlertListCombineData = yield data.body;
                this.seriousBadgeCount = 0;
                this.criticalBadgeCount = 0;
                this.warningBadgeCount = 0;
                this.messageBadgeCount = 0;
                this.totalUnreadCount = 0;
                if (this.allEventAlertList) {
                    data.body.forEach((item, index) => {
                        if ((!item.readBy) && item.exceptionLevel === 'Serious') {
                            this.seriousBadgeCount = this.seriousBadgeCount + 1;
                            this.commonAPIService.seriousBadgeCount = this.seriousBadgeCount;
                        }
                        if ((!item.readBy) && item.exceptionLevel === 'Critical') {
                            this.criticalBadgeCount = this.criticalBadgeCount + 1;
                            this.commonAPIService.criticalBadgeCount = this.criticalBadgeCount;
                        }
                        if ((!item.readBy) && item.exceptionLevel === 'Warning') {
                            this.warningBadgeCount = this.warningBadgeCount + 1;
                            this.commonAPIService.warningBadgeCount = this.warningBadgeCount;
                        }
                        if ((!item.readBy) && item.exceptionLevel === 'Message') {
                            this.messageBadgeCount = this.messageBadgeCount + 1;
                            this.commonAPIService.messageBadgeCount = this.messageBadgeCount;
                        }
                        this.totalUnreadCount = this.warningBadgeCount + this.messageBadgeCount
                            + this.seriousBadgeCount + this.criticalBadgeCount;
                    });
                    this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'totalUnreadCount :  before' + this.totalUnreadCount);
                    // this.totalUnreadCount = await this.allEventAlertList.length;
                    this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'totalUnreadCount : after ' + this.totalUnreadCount);
                    this.commonAPIService.totalUnreadBadgeCount = this.totalUnreadCount;
                    this.badge.set(this.commonAPIService.totalUnreadBadgeCount);
                    this.events.publish('allEventAlertList', data.body);
                    if (this.totalUnreadCount <= 0) {
                        this.badge.clear();
                    }
                    this.zone.run(() => {
                        this.seriousBadgeCount = this.seriousBadgeCount;
                        this.criticalBadgeCount = this.criticalBadgeCount;
                        this.warningBadgeCount = this.warningBadgeCount;
                        this.messageBadgeCount = this.messageBadgeCount;
                        this.allEventAlertList = data.body;
                    });
                }
                this.commonAPIService.isLoadingData = false;
                this.sendDeviceIMEItoNativeApp(this.deviceInfo.uuid);
                this.commonAPIService.hideLoader();
            }), err => {
                // TODO: if exception what should be the action
                // tslint:disable-next-line:max-line-length
                this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'Called alertEventsListAPI : with failed response : ' + JSON.stringify(err));
                this.commonAPIService.isLoadingData = false;
                this.commonAPIService.hideLoader();
            });
            this.logService.logDebug('HomePage', 'getAllAlertEventList()', 'getAllAlertEventList call Ended');
        });
    }
    doRefresh(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('HomePage', 'doRefresh()', 'event: ' + event);
            this.getAllAlertEventList();
            event.target.complete();
        });
    }
    ionViewWillEnter() {
        this.menuCtrl.enable(true);
        // tslint:disable-next-line: deprecation
        this.menuCtrl.swipeEnable(false);
    }
    setSwipeButton() {
        setTimeout(() => {
            this.getSlider = document.getElementById('slider');
            this.getSlider.style.marginLeft = '';
            this.getSlider.style.transition = '0s';
            this.getBtn = document.getElementById('button-background');
            this.getBtn.classList.add('resetEffect');
            let addText = document.getElementsByClassName('slide-text');
            addText[0].textContent = 'Swipe to dial ' + this.panicBtnValue;
            // this.changeDetectorRef.detectChanges();
        }, (6500));
    }
    resetSwipeButtonInit() {
        setTimeout(() => {
            this.getSlider = document.getElementById('slider');
            this.getSlider.style.marginLeft = '';
            this.getSlider.style.transition = '0s';
            this.getBtn = document.getElementById('button-background');
            this.getBtn.classList.add('resetEffect');
            let addText = document.getElementsByClassName('slide-text');
            addText[0].textContent = 'Swipe to dial ' + this.panicBtnValue;
            // this.changeDetectorRef.detectChanges();
        }, (500));
    }
    setEvent() {
        this.logService.logDebug('HomePage', 'setEvent()', 'setEvent');
        return new Promise((resolve, reject) => {
            this.Events[0].MessageType = 'Button Pressed';
            this.Events[0].DateTime = (new Date()).toUTCString();
            this.Events[0].Event = 'Panic Button Pressed';
            resolve(this.Events);
        }).catch(e => {
            this.logService.logDebug('HomePage', 'setEvent()', 'Error setEvent: ' + JSON.stringify(e));
        });
    }
    openDialPad(panicBtnValue) {
        this.logService.logDebug('HomePage', 'openDialPad()', 'openDialPad');
        this.callNumber.callNumber(panicBtnValue, false)
            .then(res => this.logService.logDebug('HomePage', 'openDialPad()', 'Launched dialer! ' + JSON.stringify(res)))
            .catch(err => this.logService.logDebug('HomePage', 'openDialPad()', 'Error launching dialer: ' + JSON.stringify(err)));
    }
    callPanicAPI(location) {
        this.logService.logDebug('HomePage', 'callPanicAPI()', 'callPanicAPI');
        const eventObj = {
            dateTimePressed: new Date().toJSON(),
            victimId: this.commonAPIService.victimDetails.victimId,
            numberDailed: this.panicBtnValue
        };
        this.logService.logDebug('HomePage', 'callPanicAPI()', JSON.stringify(eventObj));
        this.commonAPIService.postPanicButton(eventObj, location).toPromise().then((data) => {
            this.logService.logInfo('HomePage', 'postPanicButton_Response', 'success API postPanicButton: ' + data);
            // this.resetSwipeButton();
            this.swipeButtonInit();
            this.commonAPIService.hideLoader();
            this.openDialPad(this.panicBtnValue);
        }, err => {
            // this.resetSwipeButton();
            this.swipeButtonInit();
            this.commonAPIService.hideLoader();
            this.logService.logError('HomePage', 'callPanicAPI', 'Error:' + JSON.stringify(err));
        });
    }
    // Swipe events
    fireEvent1(data, flag) {
        if (!flag) {
            this.logService.logDebug('HomePage', 'fireEvent1', 'fireEvent1: ' + data);
            this.flag = true;
        }
    }
    touchend(event) {
        this.logService.logDebug('HomePage', 'touchend', 'Touch End Called');
        this.flag = false;
        this.sendPanicButtonValToNativeApp(this.panicBtnValue, this.deviceInfo.uuid, this.commonAPIService.victimDetails);
        let timer = setTimeout(() => {
            this.fireEvent1('End Event Called Success.Now Excute Your Code', this.flag);
            let removeText = document.getElementsByClassName('slide-text');
            removeText[0].textContent = '';
            this.openDialPad(this.panicBtnValue);
            this.swipeButtonInit();
        }, 3000);
        clearTimeout(3000);
    }
    touchmove(event) {
        this.logService.logDebug('HomePage', 'touchmove', 'touchmove event: ' + event);
        this.getSlider = document.getElementById('slider');
        this.getSlider.style.marginLeft = event.changedTouches[0].clientX + 'px';
        this.getSlider.style.transition = '3s';
        // add effect
        this.getBtn = document.getElementById('button-background');
        this.getBtn.classList.remove('resetEffect');
        this.getBtn.classList.add('setEffect');
        let root = document.documentElement;
        // set icon to width of button
        let t = document.getElementById('button-background');
        // this.getSlider.style.marginLeft = (t.clientWidth - 50) + 'px';
        // root.style.setProperty('--sg', (t.clientWidth - 20) + 'px');
        this.getSlider.style.marginLeft = (t.clientWidth - 50) + 'px';
        root.style.setProperty('--sg', (t.clientWidth - 20) + 'px');
    }
    swipeButtonInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('HomePage', 'swipeButtonInit()', 'swipeButtonInit');
            this.getSlider = document.getElementById('slider');
            this.getSlider.style.marginLeft = '';
            this.getSlider.style.transition = '0s';
            this.getBtn = document.getElementById('button-background');
            this.getBtn.classList.add('resetEffect');
            let addText = document.getElementsByClassName('slide-text');
            addText[0].textContent = 'Swipe to dial ' + this.panicBtnValue;
            // this.changeDetectorRef.detectChanges();
        });
    }
    showTourModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('HomePage', 'showTourModal', "Panic button tour displayed");
            const modal = yield this.modalController.create({
                component: src_app_modal_dial_number_dial_number_page__WEBPACK_IMPORTED_MODULE_11__["DialNumberPage"],
                cssClass: 'my-custom-modal-css',
                backdropDismiss: false
            });
            return yield modal.present();
        });
    }
    getTourValue() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('HomePage', 'getTourValue', "Tour started");
            yield this.commonAPIService.getStorageValue('showTutorial').then(res => {
                if (!res) {
                    this.showTourModal();
                }
            });
        });
    }
    manageBadgeCount(itemReceived) {
        this.totalUnreadCount = 0;
        this.commonAPIService.allAlertListCombineData.forEach((item, index) => {
            if (itemReceived.eventId === item.eventId) {
                item.readBy = this.commonAPIService.victimDetails.username;
                if ((item.readBy) && item.exceptionLevel === 'Serious') {
                    this.seriousBadgeCount = this.seriousBadgeCount - 1;
                    this.commonAPIService.seriousBadgeCount = this.seriousBadgeCount;
                }
                if ((item.readBy) && item.exceptionLevel === 'Critical') {
                    this.criticalBadgeCount = this.criticalBadgeCount - 1;
                    this.commonAPIService.criticalBadgeCount = this.criticalBadgeCount;
                }
                if ((item.readBy) && item.exceptionLevel === 'Warning') {
                    this.warningBadgeCount = this.warningBadgeCount - 1;
                    this.commonAPIService.warningBadgeCount = this.warningBadgeCount;
                }
                if ((item.readBy) && item.exceptionLevel === 'Message') {
                    this.messageBadgeCount = this.messageBadgeCount - 1;
                    this.commonAPIService.messageBadgeCount = this.messageBadgeCount;
                }
            }
        });
        this.totalUnreadCount = this.warningBadgeCount + this.messageBadgeCount
            + this.seriousBadgeCount + this.criticalBadgeCount;
        this.commonAPIService.totalUnreadBadgeCount = this.totalUnreadCount;
        this.badge.set(this.commonAPIService.totalUnreadBadgeCount);
        if (this.totalUnreadCount === 0) {
            this.badge.clear();
        }
        this.zone.run(() => {
            this.seriousBadgeCount = this.seriousBadgeCount;
            this.criticalBadgeCount = this.criticalBadgeCount;
            this.warningBadgeCount = this.warningBadgeCount;
            this.messageBadgeCount = this.messageBadgeCount;
        });
    }
    getVictimDetailsOnNotifications(notificationItem) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.commonAPIService.getStorageValue('loggedInUserDetails').then(res => {
                // this.isTappedPressed = false;
                this.refreshAlertEventListOnNotifications(notificationItem);
            });
        });
    }
    refreshAlertEventListOnNotifications(Item) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.isTappedPressed) {
                yield this.getAllAlertEventList();
                this.isTappedPressed = false;
                this.router.navigate(['/homepage/' + Item.data.ExceptionLevel.toLowerCase()], { queryParams: Object.assign({}, Item, Item.data), skipLocationChange: true });
            }
            else {
                yield this.getAllAlertEventList();
            }
        });
    }
    // Sending Data to Android native code
    sendVictimDetailsToNativeApp(victimDetails) {
        CustomNativePlugin.sendVictimDetailsToApp({ 'victimDetails': victimDetails });
        this.logService.logInfo('HomePage', 'sendVictimDetailsToNativeApp()', 'VictimDetails:' + JSON.stringify(victimDetails));
    }
    sendDeviceIMEItoNativeApp(imei) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            CustomNativePlugin.sendDeviceIMEItoApp({ 'deviceImei': imei });
            this.logService.logInfo('HomePage', 'sendDeviceIMEItoNativeApp()', 'deviceImei :' + imei);
        });
    }
    sendPanicButtonValToNativeApp(num, udid, victimDetails) {
        CustomNativePlugin.sendPanicButtonNumberToApp({ 'panicBtnNumber': num, 'deviceUDID': udid, 'victimDetailsPanic': victimDetails });
        this.logService.logInfo('HomePage', 'sendPanicButtonValToNativeApp()', 'Number : ' + num);
    }
    initializePushResources() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            PushNotifications.register();
            PushNotifications.addListener('registration', (token) => {
                this.logService.logInfo('HomePage', 'PushNotificationsRegistration()', 'Push notifications successfully initialized. Token: ' + token.value);
                this.commonAPIService.globalPushToken = token;
                this.pushNotificationToken = token;
                const pushNotificationTokenRequest = {
                    pushNotificationToken: this.pushNotificationToken.value,
                    platform: 'android'
                };
                this.pushDidInitialize = true;
            });
            PushNotifications.addListener('registrationError', (error) => {
                this.logService.logError('HomePage', 'registrationError()', 'Push notifications unsuccessfully initialized. Error: ' + JSON.stringify(error));
                this.pushDidInitialize = false;
            });
            // );
            PushNotifications.addListener('pushNotificationReceived', (notification) => {
                this.isTappedPressed = false;
                this.getVictimDetailsOnNotifications(notification);
                this.logService.logDebug('HomePage', 'pushNotificationReceived()', 'Push received:' + notification + 'ExceptionLevel : + ' + JSON.stringify(notification.data) + ", " + notification.data.ExceptionLevel);
            });
            PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
                this.isTappedPressed = true;
                this.getVictimDetailsOnNotifications(notification.notification);
                this.logService.logDebug('HomePage', 'PushNotificationActionPerformed()', 'Push action performed:' + JSON.stringify(notification) + 'ExceptionLevel : ' +
                    JSON.stringify(notification.notification.data) + ' ' + JSON.stringify(notification.notification.data.ExceptionLevel));
            });
        });
    }
    getDeviceName() {
        this.logService.logInfo('HomePage', 'getDeviceName()', 'Device Name: ' + this.deviceInfoService.getDeviceName());
        return this.deviceInfoService.getDeviceName();
    }
    getAssignedClientsList() {
        this.logService.logDebug('AssignedClientsPage', 'getAssignedClientsList()', 'Calling victimClientsAPI : ' +
            src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].gatewayUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].victimClientsAPI + this.commonAPIService.victimDetails.victimId);
        this.commonAPIService.getData(src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].victimClientsAPI + this.commonAPIService.victimDetails.victimId).subscribe((res) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.assignedClientsList = yield res.body;
            this.logService.logDebug('HomepagePage', 'getAssignedClientsList()', 'Called victimClientsAPI with response :' + JSON.stringify(this.assignedClientsList));
            if (this.assignedClientsList === null) {
                this.isClientAssigned = false;
                this.logService.logDebug('HomepagePage', 'getAssignedClientsList()', 'Called victimClientsAPI with response :' + 'No individuals assigned');
                this.commonAPIService.hideLoader();
            }
            else {
                this.isClientAssigned = true;
            }
        }), err => {
            this.logService.logDebug('HomepagePage', 'getAssignedClientsList()', 'Called victimClientsAPI with failed response :' + JSON.stringify(err));
        });
    }
    getAllAlertEventListAfterNotification() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()', 'getAllAlertEventListAfterNotification call started');
            // this.seriousBadgeCount = 0;
            // this.criticalBadgeCount = 0;
            // this.warningBadgeCount = 0;
            // this.messageBadgeCount = 0;
            // this.totalUnreadCount = 0;
            if (this.daysToKeepEvents === 0) {
                this.daysToKeepEvents = 31;
            }
            this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()', 'Calling alertEventsListAPI :' +
                src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].gatewayUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].alertEventsListAPI + this.commonAPIService.victimDetails.victimId + '/' + this.daysToKeepEvents);
            this.commonAPIService.getData(src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"].alertEventsListAPI +
                this.commonAPIService.victimDetails.victimId + '/' + this.daysToKeepEvents).toPromise().then((data) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()', 'Called alertEventsListAPI : with response : ');
                this.allEventAlertList = yield data.body;
                this.commonAPIService.allAlertListCombineData = yield data.body;
                this.seriousBadgeCount = 0;
                this.criticalBadgeCount = 0;
                this.warningBadgeCount = 0;
                this.messageBadgeCount = 0;
                this.totalUnreadCount = 0;
                if (this.allEventAlertList) {
                    data.body.forEach((item, index) => {
                        if ((!item.readBy) && item.exceptionLevel === 'Serious') {
                            this.seriousBadgeCount = this.seriousBadgeCount + 1;
                            this.commonAPIService.seriousBadgeCount = this.seriousBadgeCount;
                        }
                        if ((!item.readBy) && item.exceptionLevel === 'Critical') {
                            this.criticalBadgeCount = this.criticalBadgeCount + 1;
                            this.commonAPIService.criticalBadgeCount = this.criticalBadgeCount;
                        }
                        if ((!item.readBy) && item.exceptionLevel === 'Warning') {
                            this.warningBadgeCount = this.warningBadgeCount + 1;
                            this.commonAPIService.warningBadgeCount = this.warningBadgeCount;
                        }
                        if ((!item.readBy) && item.exceptionLevel === 'Message') {
                            this.messageBadgeCount = this.messageBadgeCount + 1;
                            this.commonAPIService.messageBadgeCount = this.messageBadgeCount;
                        }
                        this.totalUnreadCount = this.warningBadgeCount + this.messageBadgeCount
                            + this.seriousBadgeCount + this.criticalBadgeCount;
                    });
                    // this.totalUnreadCount = await this.allEventAlertList.length;
                    this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()', 'totalUnreadCount: ' + this.totalUnreadCount);
                    this.commonAPIService.totalUnreadBadgeCount = this.totalUnreadCount;
                    yield this.badge.set(this.commonAPIService.totalUnreadBadgeCount);
                    this.events.publish('allEventAlertList', data.body);
                    if (this.totalUnreadCount <= 0) {
                        this.badge.clear();
                    }
                    this.zone.run(() => {
                        this.seriousBadgeCount = this.seriousBadgeCount;
                        this.criticalBadgeCount = this.criticalBadgeCount;
                        this.warningBadgeCount = this.warningBadgeCount;
                        this.messageBadgeCount = this.messageBadgeCount;
                        this.allEventAlertList = data.body;
                    });
                }
                this.commonAPIService.isLoadingData = false;
            }), err => {
                // tslint:disable-next-line:max-line-length
                this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()', 'Called alertEventsListAPI : with failed response : ' + JSON.stringify(err));
            });
            this.logService.logDebug('HomePage', 'getAllAlertEventListAfterNotification()', 'getAllAlertEventList call Ended');
        });
    }
};
HomepagePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["MenuController"] },
    { type: src_app_provider_business_model_business_model_service__WEBPACK_IMPORTED_MODULE_13__["BusinessModelService"] },
    { type: src_app_provider_device_api_device_info_service__WEBPACK_IMPORTED_MODULE_16__["DeviceInfoService"] },
    { type: src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_14__["CommonAPIService"] },
    { type: _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_5__["CallNumber"] },
    { type: _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_7__["NativeGeocoder"] },
    { type: _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__["Geolocation"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["ModalController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["Events"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["Store"] },
    { type: src_app_provider_auth_authentication_service__WEBPACK_IMPORTED_MODULE_12__["AuthenticationService"] },
    { type: _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_4__["Badge"] },
    { type: src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_15__["LogfileService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["AlertController"] }
];
HomepagePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-homepage',
        template: __webpack_require__(/*! raw-loader!./homepage.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/homepage/homepage.page.html"),
        styles: [__webpack_require__(/*! ./homepage.page.scss */ "./src/app/pages/homepage/homepage.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__["MenuController"], src_app_provider_business_model_business_model_service__WEBPACK_IMPORTED_MODULE_13__["BusinessModelService"],
        src_app_provider_device_api_device_info_service__WEBPACK_IMPORTED_MODULE_16__["DeviceInfoService"], src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_14__["CommonAPIService"],
        _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_5__["CallNumber"], _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_7__["NativeGeocoder"], _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__["Geolocation"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["ModalController"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["Events"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
        _ngrx_store__WEBPACK_IMPORTED_MODULE_9__["Store"], src_app_provider_auth_authentication_service__WEBPACK_IMPORTED_MODULE_12__["AuthenticationService"],
        _ionic_native_badge_ngx__WEBPACK_IMPORTED_MODULE_4__["Badge"], src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_15__["LogfileService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["AlertController"]])
], HomepagePage);



/***/ })

}]);
//# sourceMappingURL=pages-homepage-homepage-module-es2015.js.map