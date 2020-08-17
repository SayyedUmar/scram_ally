(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["warning-warning-warning-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/homepage/warning/warning/warning.page.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/homepage/warning/warning/warning.page.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n  <ion-list lines=\"none\" *ngIf=\"warningAlertList.length > 0\">\n    <ion-item-divider class=\"divider-margin-top\" *ngIf=\"isTodayDataAvailable\">\n      <ion-label class=\"lbl-width\">\n        <ion-row>\n          <ion-col size=\"8\" (click)=\"closeClearAll()\">\n            <h2 class=\"today-head\">Today</h2>\n          </ion-col>\n          <ion-col size=\"4\">\n            <p class=\"icon-close\" *ngIf=\"!clearAllBtn\" (click)=\"clearAll()\">\n              <ion-icon name=\"close-circle\"></ion-icon>\n            </p>\n            <p\n              class=\"btn-clear-all\"\n              *ngIf=\"clearAllBtn\"\n              (click)=\"clearAllAlerts()\"\n            >\n              Clear All\n            </p>\n          </ion-col>\n        </ion-row>\n      </ion-label>\n    </ion-item-divider>\n\n    <ion-item-sliding\n      id=\"idCriticalList\"\n      (click)=\"expandItem(item)\"\n      *ngFor=\"let item of warningFilteredList; let i = index;\"\n    >\n      <ion-item\n        class=\"ion-item-border\"\n        [ngClass]=\"{'unread-border-left': (!item.readBy), 'read-border-remove': (item.readBy), 'active-item': item.expanded}\"\n        *ngIf=\"item.isDeleted === false && (checkForTodaysDate(item.exceptionDateTime))\"\n      >\n        <ion-label>\n          <ion-row>\n            <ion-col>\n              <h2 class=\"row-header\">{{item.exceptionTypeName}}</h2>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <p class=\"time-space\">\n                {{item.exceptionDateTime | date : \"MM/dd/yyyy @ hh:mm a\" }}\n              </p>\n            </ion-col>\n          </ion-row>\n          <app-expandable expandHeight=\"100px\" [expanded]=\"item.expanded\">\n            <ion-row class=\"row-margin-bottom\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Location:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">\n                  {{item.location ? item.location : 'Address Not Available'}}\n                </p>\n              </ion-col>\n            </ion-row>\n\n            <ion-row class=\"row-margin-bottom\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Account:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">{{item.victimAccountName}}</p>\n              </ion-col>\n            </ion-row>\n\n            <ion-row class=\"row-margin-bottom\" *ngIf=\"item.zoneName !== ''\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Zone:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">{{item.zoneName}}</p>\n              </ion-col>\n            </ion-row>\n          </app-expandable>\n        </ion-label>\n      </ion-item>\n\n      <ion-item-options side=\"start\">\n        <ion-item-option\n          color=\"danger\"\n          class=\"item-option-txt\"\n          (click)=\"deleteItem(item)\"\n        >\n          <ion-icon slot=\"top\" name=\"trash\"></ion-icon>\n          Delete\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-list\n    lines=\"none\"\n    class=\"list-margin-bottom\"\n    *ngIf=\"warningAlertList.length > 0\"\n  >\n    <ion-item-divider class=\"divider-margin-top\" *ngIf=\"isTodayDataAvailable\">\n      <ion-label class=\"lbl-width\">\n        <ion-row>\n          <ion-col size=\"4\">\n            <h2 class=\"today-head\">Older</h2>\n          </ion-col>\n        </ion-row>\n      </ion-label>\n    </ion-item-divider>\n\n    <ion-item-divider class=\"divider-margin-top\" *ngIf=\"!isTodayDataAvailable\">\n      <ion-label class=\"lbl-width\">\n        <ion-row>\n          <ion-col size=\"8\">\n            <h2 class=\"today-head\">Older</h2>\n          </ion-col>\n          <ion-col size=\"4\">\n            <p class=\"icon-close\" *ngIf=\"!clearAllBtn\" (click)=\"clearAll()\">\n              <ion-icon name=\"close-circle\"></ion-icon>\n            </p>\n            <p\n              class=\"btn-clear-all\"\n              *ngIf=\"clearAllBtn\"\n              (click)=\"clearAllAlerts()\"\n            >\n              Clear All\n            </p>\n          </ion-col>\n        </ion-row>\n      </ion-label>\n    </ion-item-divider>\n\n    <ion-item-sliding\n      id=\"idCriticalList\"\n      (click)=\"expandItem(item)\"\n      *ngFor=\"let item of warningFilteredList; let i = index;\"\n    >\n      <ion-item\n        class=\"ion-item-border\"\n        [ngClass]=\"{'unread-border-left': (!item.readBy), 'read-border-remove': (item.readBy), 'active-item': item.expanded}\"\n        *ngIf=\"item.isDeleted === false && !(checkForTodaysDate(item.exceptionDateTime))\"\n      >\n        <ion-label>\n          <ion-row>\n            <ion-col>\n              <h2 class=\"row-header\">{{item.exceptionTypeName}}</h2>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <p class=\"time-space\">\n                {{item.exceptionDateTime | date : \"MM/dd/yyyy @ hh:mm a\" }}\n              </p>\n            </ion-col>\n          </ion-row>\n          <app-expandable expandHeight=\"100px\" [expanded]=\"item.expanded\">\n            <ion-row class=\"row-margin-bottom\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Location:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">\n                  {{item.location ? item.location : 'Address Not Available'}}\n                </p>\n              </ion-col>\n            </ion-row>\n\n            <ion-row class=\"row-margin-bottom\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Account:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">{{item.victimAccountName}}</p>\n              </ion-col>\n            </ion-row>\n\n            <ion-row class=\"row-margin-bottom\" *ngIf=\"item.zoneName !== ''\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Zone:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">{{item.zoneName}}</p>\n              </ion-col>\n            </ion-row>\n          </app-expandable>\n        </ion-label>\n      </ion-item>\n\n      <ion-item-options side=\"start\">\n        <ion-item-option\n          color=\"danger\"\n          class=\"item-option-txt\"\n          (click)=\"deleteItem(item)\"\n        >\n          <ion-icon slot=\"top\" name=\"trash\"></ion-icon>\n          Delete\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadMoreData($event)\">\n    <ion-infinite-scroll-content\n      loadingSpinner=\"bubbles\"\n      loadingText=\"Loading more data...\"\n    >\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n  <div\n    id=\"no-notification\"\n    *ngIf=\"warningAlertList.length < 1\"\n    class=\"no-notification\"\n  >\n    No Notifications\n  </div>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/homepage/warning/warning/warning-routing.module.ts":
/*!**************************************************************************!*\
  !*** ./src/app/pages/homepage/warning/warning/warning-routing.module.ts ***!
  \**************************************************************************/
/*! exports provided: WarningPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WarningPageRoutingModule", function() { return WarningPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _warning_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./warning.page */ "./src/app/pages/homepage/warning/warning/warning.page.ts");




const routes = [
    {
        path: '',
        component: _warning_page__WEBPACK_IMPORTED_MODULE_3__["WarningPage"]
    }
];
let WarningPageRoutingModule = class WarningPageRoutingModule {
};
WarningPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], WarningPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/homepage/warning/warning/warning.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/homepage/warning/warning/warning.module.ts ***!
  \******************************************************************/
/*! exports provided: WarningPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WarningPageModule", function() { return WarningPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _warning_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./warning-routing.module */ "./src/app/pages/homepage/warning/warning/warning-routing.module.ts");
/* harmony import */ var _warning_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./warning.page */ "./src/app/pages/homepage/warning/warning/warning.page.ts");








let WarningPageModule = class WarningPageModule {
};
WarningPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _warning_routing_module__WEBPACK_IMPORTED_MODULE_6__["WarningPageRoutingModule"],
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]
        ],
        declarations: [_warning_page__WEBPACK_IMPORTED_MODULE_7__["WarningPage"]]
    })
], WarningPageModule);



/***/ }),

/***/ "./src/app/pages/homepage/warning/warning/warning.page.scss":
/*!******************************************************************!*\
  !*** ./src/app/pages/homepage/warning/warning/warning.page.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".item-option-txt {\n  text-transform: capitalize !important;\n}\n\n.row-width {\n  width: 100% !important;\n}\n\n.row-header {\n  font-weight: bold !important;\n  font-size: 14px !important;\n}\n\n.time-space {\n  font-size: 12px;\n  margin-top: -12px;\n}\n\n.lbl-p {\n  font-size: 12px !important;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n}\n\n.word-text {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n}\n\n.row-margin-bottom {\n  margin-bottom: -10px !important;\n}\n\n.ion-item-border {\n  border-bottom: 1px solid #d2cdcd !important;\n}\n\n.lbl-width {\n  width: 100% !important;\n}\n\n.icon-close {\n  float: right;\n  font-size: 26px;\n  margin-bottom: -10px;\n  margin-right: 2px;\n}\n\n.today-head {\n  font-size: 18px;\n  margin-bottom: -4px;\n}\n\n.no-notification {\n  text-align: center;\n  margin: 10%;\n  font-size: 14px;\n}\n\n.list-margin-bottom {\n  margin-bottom: 34% !important;\n}\n\n.divider-margin-top {\n  margin-top: -20px !important;\n}\n\n.unread-border-left {\n  border-left: 8px solid #FFCE00 !important;\n}\n\n.read-border-remove {\n  border-left: none !important;\n  padding-left: 8px !important;\n}\n\n.btn-clear-all {\n  font-size: 12px !important;\n  background: grey !important;\n  color: white !important;\n  border-radius: 25px !important;\n  padding-left: 10px !important;\n  padding-right: 10px !important;\n  float: right !important;\n}\n\n.active-item {\n  --background: #f2f2f2 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy91bWFyL0Rvd25sb2Fkcy9TY3JhbU5ldC5BbGx5LkFuZHJvaWROYXRpdmVfMi9zcmMvYXBwL3BhZ2VzL2hvbWVwYWdlL3dhcm5pbmcvd2FybmluZy93YXJuaW5nLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvaG9tZXBhZ2Uvd2FybmluZy93YXJuaW5nL3dhcm5pbmcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUNBQUE7QUNDRjs7QURFQTtFQUNFLHNCQUFBO0FDQ0Y7O0FERUE7RUFDRSw0QkFBQTtFQUNBLDBCQUFBO0FDQ0Y7O0FERUE7RUFFRSxlQUFBO0VBQ0EsaUJBQUE7QUNBRjs7QURHQTtFQUNFLDBCQUFBO0VBQ0EscUJBQUE7RUFDQSxxQkFBQTtBQ0FGOztBREdBO0VBQ0UscUJBQUE7RUFDQSxxQkFBQTtBQ0FGOztBREdBO0VBQ0UsK0JBQUE7QUNBRjs7QURHQTtFQUNFLDJDQUFBO0FDQUY7O0FEUUE7RUFDRSxzQkFBQTtBQ0xGOztBRFFBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0FDTEY7O0FEUUE7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7QUNMRjs7QURRQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNMRjs7QURVQTtFQUNFLDZCQUFBO0FDUEY7O0FEVUE7RUFDRSw0QkFBQTtBQ1BGOztBRFVBO0VBQ0UseUNBQUE7QUNQRjs7QURVQTtFQUNFLDRCQUFBO0VBQ0EsNEJBQUE7QUNQRjs7QURVQTtFQUNFLDBCQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUNBLDhCQUFBO0VBQ0EsNkJBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0FDUEY7O0FEVUE7RUFDRSxnQ0FBQTtBQ1BGIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvaG9tZXBhZ2Uvd2FybmluZy93YXJuaW5nL3dhcm5pbmcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLml0ZW0tb3B0aW9uLXR4dCB7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplICFpbXBvcnRhbnQ7XG59XG5cbi5yb3ctd2lkdGgge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4ucm93LWhlYWRlciB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkICFpbXBvcnRhbnQ7XG4gIGZvbnQtc2l6ZTogMTRweCAhaW1wb3J0YW50O1xufVxuXG4udGltZS1zcGFjZSB7XG4gIC8vIGZsb2F0OiByaWdodCAhaW1wb3J0YW50O1xuICBmb250LXNpemU6IDEycHg7XG4gIG1hcmdpbi10b3A6IC0xMnB4O1xufVxuXG4ubGJsLXAge1xuICBmb250LXNpemU6IDEycHggIWltcG9ydGFudDtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbi53b3JkLXRleHQge1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuLnJvdy1tYXJnaW4tYm90dG9tIHtcbiAgbWFyZ2luLWJvdHRvbTogLTEwcHggIWltcG9ydGFudDtcbn1cblxuLmlvbi1pdGVtLWJvcmRlciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDJjZGNkICFpbXBvcnRhbnQ7XG4gIC8vIGJvcmRlci1sZWZ0OiAycHggc29saWQgIzM1YzJkMiAhaW1wb3J0YW50O1xufVxuXG4vLyAubGlzdC1tYXJnaW4tYm90dG9tIHtcbi8vICAgICBtYXJnaW4tYm90dG9tOiA0OCUgIWltcG9ydGFudDtcbi8vIH1cblxuLmxibC13aWR0aCB7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG59XG5cbi5pY29uLWNsb3NlIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBmb250LXNpemU6IDI2cHg7XG4gIG1hcmdpbi1ib3R0b206IC0xMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDJweDtcbn1cblxuLnRvZGF5LWhlYWQge1xuICBmb250LXNpemU6IDE4cHg7XG4gIG1hcmdpbi1ib3R0b206IC00cHg7XG59XG5cbi5uby1ub3RpZmljYXRpb24ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogMTAlO1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi8vIE5ldyBUYWIgQ1NTXG5cbi5saXN0LW1hcmdpbi1ib3R0b20ge1xuICBtYXJnaW4tYm90dG9tOiAzNCUgIWltcG9ydGFudDtcbn1cblxuLmRpdmlkZXItbWFyZ2luLXRvcCB7XG4gIG1hcmdpbi10b3A6IC0yMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi51bnJlYWQtYm9yZGVyLWxlZnQge1xuICBib3JkZXItbGVmdDogOHB4IHNvbGlkICNGRkNFMDAgIWltcG9ydGFudDtcbn1cblxuLnJlYWQtYm9yZGVyLXJlbW92ZSB7XG4gIGJvcmRlci1sZWZ0OiBub25lICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctbGVmdDogOHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5idG4tY2xlYXItYWxsIHtcbiAgZm9udC1zaXplOiAxMnB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQ6IGdyZXkgIWltcG9ydGFudDtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHggIWltcG9ydGFudDtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4ICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctcmlnaHQ6IDEwcHggIWltcG9ydGFudDtcbiAgZmxvYXQ6IHJpZ2h0ICFpbXBvcnRhbnQ7XG59XG5cbi5hY3RpdmUtaXRlbSB7XG4gIC0tYmFja2dyb3VuZDogI2YyZjJmMiAhaW1wb3J0YW50O1xufSIsIi5pdGVtLW9wdGlvbi10eHQge1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZSAhaW1wb3J0YW50O1xufVxuXG4ucm93LXdpZHRoIHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLnJvdy1oZWFkZXIge1xuICBmb250LXdlaWdodDogYm9sZCAhaW1wb3J0YW50O1xuICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcbn1cblxuLnRpbWUtc3BhY2Uge1xuICBmb250LXNpemU6IDEycHg7XG4gIG1hcmdpbi10b3A6IC0xMnB4O1xufVxuXG4ubGJsLXAge1xuICBmb250LXNpemU6IDEycHggIWltcG9ydGFudDtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbi53b3JkLXRleHQge1xuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuLnJvdy1tYXJnaW4tYm90dG9tIHtcbiAgbWFyZ2luLWJvdHRvbTogLTEwcHggIWltcG9ydGFudDtcbn1cblxuLmlvbi1pdGVtLWJvcmRlciB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDJjZGNkICFpbXBvcnRhbnQ7XG59XG5cbi5sYmwtd2lkdGgge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4uaWNvbi1jbG9zZSB7XG4gIGZsb2F0OiByaWdodDtcbiAgZm9udC1zaXplOiAyNnB4O1xuICBtYXJnaW4tYm90dG9tOiAtMTBweDtcbiAgbWFyZ2luLXJpZ2h0OiAycHg7XG59XG5cbi50b2RheS1oZWFkIHtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBtYXJnaW4tYm90dG9tOiAtNHB4O1xufVxuXG4ubm8tbm90aWZpY2F0aW9uIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW46IDEwJTtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4ubGlzdC1tYXJnaW4tYm90dG9tIHtcbiAgbWFyZ2luLWJvdHRvbTogMzQlICFpbXBvcnRhbnQ7XG59XG5cbi5kaXZpZGVyLW1hcmdpbi10b3Age1xuICBtYXJnaW4tdG9wOiAtMjBweCAhaW1wb3J0YW50O1xufVxuXG4udW5yZWFkLWJvcmRlci1sZWZ0IHtcbiAgYm9yZGVyLWxlZnQ6IDhweCBzb2xpZCAjRkZDRTAwICFpbXBvcnRhbnQ7XG59XG5cbi5yZWFkLWJvcmRlci1yZW1vdmUge1xuICBib3JkZXItbGVmdDogbm9uZSAhaW1wb3J0YW50O1xuICBwYWRkaW5nLWxlZnQ6IDhweCAhaW1wb3J0YW50O1xufVxuXG4uYnRuLWNsZWFyLWFsbCB7XG4gIGZvbnQtc2l6ZTogMTJweCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kOiBncmV5ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICBib3JkZXItcmFkaXVzOiAyNXB4ICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctbGVmdDogMTBweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nLXJpZ2h0OiAxMHB4ICFpbXBvcnRhbnQ7XG4gIGZsb2F0OiByaWdodCAhaW1wb3J0YW50O1xufVxuXG4uYWN0aXZlLWl0ZW0ge1xuICAtLWJhY2tncm91bmQ6ICNmMmYyZjIgIWltcG9ydGFudDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/homepage/warning/warning/warning.page.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/homepage/warning/warning/warning.page.ts ***!
  \****************************************************************/
/*! exports provided: WarningPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WarningPage", function() { return WarningPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/provider/common-api/common-api.service */ "./src/app/provider/common-api/common-api.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/provider/common-file/logfile.service */ "./src/app/provider/common-file/logfile.service.ts");






let WarningPage = class WarningPage {
    constructor(alertController, commonAPIService, events, zone, logService) {
        this.alertController = alertController;
        this.commonAPIService = commonAPIService;
        this.events = events;
        this.zone = zone;
        this.logService = logService;
        this.warningAlertList = [];
        this.warningFilteredList = [];
        this.pageLimit = 10;
        // this.getCurrentTabData();
        events.subscribe('allEventAlertList', (data) => {
            this.logService.logDebug('WarningPage', 'allEventAlertList_subscribe', 'allEventAlertList Message');
            this.getCurrentTabData();
        });
    }
    ionViewWillEnter() {
        this.pageLimit = 10;
        this.getCurrentTabData();
    }
    // ionViewDidEnter() {
    //   this.getCurrentTabData();
    // }
    getCurrentTabData() {
        if (this.commonAPIService.allAlertListCombineData) {
            this.commonAPIService.exceptionLevelWarning = this.commonAPIService.allAlertListCombineData.filter((el) => {
                return el.exceptionLevel === 'Warning';
            });
            this.warningAlertList = this.commonAPIService.exceptionLevelWarning;
            this.warningFilteredList = [];
            this.warningFilteredList = this.warningAlertList.slice(0, this.pageLimit);
            if (this.warningFilteredList.length !== this.warningAlertList.length) {
                this.infiniteScroll.disabled = false;
            }
            this.zone.run(() => {
                this.warningAlertList = this.warningAlertList;
                this.warningFilteredList = this.warningFilteredList;
            });
        }
        this.logService.logDebug('WarningPage', 'getCurrentTabData', 'getCurrentTabData Message');
        this.unreadMessageCount = 0;
        this.warningAlertList.forEach((item, index) => {
            item.expanded = false;
            if (!item.readBy) {
                this.unreadMessageCount = this.unreadMessageCount + 1;
            }
            if (item.isDeleted === false && (this.checkForTodaysDate(item.exceptionDateTime))) {
                this.isTodayDataAvailable = true;
            }
        });
    }
    loadMoreData(event) {
        setTimeout(() => {
            this.pageLimit = this.pageLimit + 5;
            this.warningFilteredList = this.warningAlertList.slice(0, this.pageLimit);
            event.target.complete();
            if (this.warningFilteredList.length === this.warningAlertList.length) {
                event.target.disabled = true;
            }
        }, 500);
    }
    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
    ngOnInit() {
    }
    expandItem(item) {
        if (item.expanded) {
            item.expanded = false;
        }
        else {
            this.warningAlertList.map(listItem => {
                if (item === listItem) {
                    listItem.expanded = !listItem.expanded;
                }
                else {
                    listItem.expanded = false;
                }
                return listItem;
            });
            if (!item.readBy) {
                this.callReadApi(item);
                item.readBy = 'Victim 1 Mobile';
            }
        }
        this.clearAllBtn = false;
    }
    callReadApi(item) {
        if (this.commonAPIService.networkStatus.connected) {
            this.logService.logDebug('WarningPage', 'callReadApi', 'Calling API eventReadAPI : ' + src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].eventReadAPI +
                this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
            this.commonAPIService.putDataWithInterceptorObservable(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].eventReadAPI +
                this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
                .toPromise().then((response) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                yield response;
                this.logService.logDebug('WarningPage', 'callReadApi', 'Called API eventReadAPI with response : eventId=' +
                    item.eventId + ' read');
                this.events.publish('update:count', item);
            }), err => {
                this.logService.logError('WarningPage', 'callReadApi', 'Called API eventReadAPI with failed response : ' + JSON.stringify(err));
            });
        }
        else {
            this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
            this.logService.logError('WarningPage', 'callReadApi', 'No Internet! Please check your internet connectivity');
        }
    }
    deleteItem(item) {
        if (this.commonAPIService.networkStatus.connected) {
            this.commonAPIService.showLoader('Deleting item ...');
            this.logService.logDebug('WarningPage', 'deleteItem', 'Calling API eventDeleteAPI : ' + src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].eventDeleteAPI +
                this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
            this.commonAPIService.putDataWithInterceptorObservable(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].eventDeleteAPI +
                this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
                .toPromise().then((response) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                yield response;
                this.logService.logDebug('WarningPage', 'deleteItem', 'Called API eventReadAPI : eventId=' + item.eventId + ' delete');
                item.isDeleted = true;
                this.commonAPIService.hideLoader();
                this.events.publish('allAlertsDeleted', 'refreshList');
                this.commonAPIService.presentToastWithCloseBtn('Alert deleted');
            }), err => {
                this.logService.logError('WarningPage', 'deleteItem', 'Called API eventReadAPI with failed response : ' + JSON.stringify(err));
                this.commonAPIService.presentToast('Error while deleting alert!');
                this.commonAPIService.hideLoader();
            });
        }
        else {
            this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
            this.logService.logError('WarningPage', 'deleteItem', 'No Internet! Please check your internet connectivity');
        }
    }
    deleteAllItem() {
        if (this.commonAPIService.networkStatus.connected) {
            this.commonAPIService.showLoader('Deleting item ...');
            this.logService.logDebug('SeriousPage', 'deleteAllItem', 'Calling API eventDeleteAllAPI : ' + src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].eventDeleteAllAPI +
                this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Serious');
            this.commonAPIService.putDataWithInterceptorObservable(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].eventDeleteAllAPI +
                this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Warning', null)
                .toPromise().then((response) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                yield response;
                this.logService.logDebug('WarningPage', 'deleteItem', 'Called API eventReadAPI with response : victimId=' +
                    this.commonAPIService.victimDetails.victimId + '. delete all');
                this.warningAlertList.forEach((item, index) => {
                    item.isDeleted = true;
                });
                this.commonAPIService.hideLoader();
                this.events.publish('allAlertsDeleted', 'refreshList');
                this.warningAlertList = [];
                this.commonAPIService.presentToastWithCloseBtn('All alerts deleted');
            }), err => {
                this.logService.logDebug('WarningPage', 'deleteAllItem', 'Called API eventDeleteAllAPI with response: victimId=' + JSON.stringify(err));
                this.commonAPIService.hideLoader();
                this.commonAPIService.presentToast('Error while deleting all alerts!');
            });
        }
        else {
            this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
            this.logService.logError('WarningPage', 'deleteAllItem', 'No Internet! Please check your internet connectivity');
        }
    }
    clearAll() {
        this.logService.logDebug('WarningPage', 'clearAll', 'clearAll');
        this.clearAllBtn = true;
    }
    closeClearAll() {
        this.logService.logDebug('WarningPage', 'closeClearAll', 'closeClearAll');
        this.clearAllBtn = false;
    }
    clearAllAlerts() {
        this.logService.logDebug('WarningPage', 'clearAllAlerts', 'clearAllAlerts');
        this.deleteAllItem();
    }
    presentAlertConfirm(item) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Delete?',
                message: 'Do you really want to delete?',
                backdropDismiss: false,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            this.logService.logDebug('WarningPage', 'presentAlertConfirm', 'Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Delete',
                        handler: () => {
                            this.warningAlertList = this.warningAlertList.filter(list => list.messageId !== item);
                            this.logService.logDebug('WarningPage', 'presentAlertConfirm', 'Notification deleted!');
                            this.commonAPIService.presentToast('Notification deleted!');
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    alertConfirmClearAll() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Delete All?',
                message: 'Do you really want to delete all notifications?',
                backdropDismiss: false,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            this.logService.logDebug('WarningPage', 'alertConfirmClearAll', 'Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Delete',
                        handler: () => {
                            this.warningAlertList = [];
                            this.commonAPIService.presentToast('All Notifications are deleted!');
                            this.logService.logDebug('WarningPage', 'alertConfirmClearAll', 'All Notifications are deleted!');
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    checkForTodaysDate(date) {
        this.logService.logDebug('WarningPage', 'checkForTodaysDate', 'checkForTodaysDate Todate:' + date);
        return this.commonAPIService.isToday(date);
    }
};
WarningPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_3__["CommonAPIService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
    { type: src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_5__["LogfileService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonInfiniteScroll"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonInfiniteScroll"])
], WarningPage.prototype, "infiniteScroll", void 0);
WarningPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-warning',
        template: __webpack_require__(/*! raw-loader!./warning.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/homepage/warning/warning/warning.page.html"),
        styles: [__webpack_require__(/*! ./warning.page.scss */ "./src/app/pages/homepage/warning/warning/warning.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_3__["CommonAPIService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
        src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_5__["LogfileService"]])
], WarningPage);



/***/ })

}]);
//# sourceMappingURL=warning-warning-warning-module-es2015.js.map