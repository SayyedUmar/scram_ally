(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["critical-critical-critical-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/homepage/critical/critical/critical.page.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/homepage/critical/critical/critical.page.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n  <ion-list lines=\"none\" *ngIf=\"criticalAlertList.length > 0\">\n    <ion-item-divider class=\"divider-margin-top\" *ngIf=\"isTodayDataAvailable\">\n      <ion-label class=\"lbl-width\">\n        <ion-row>\n          <ion-col size=\"8\" (click)=\"closeClearAll()\">\n            <h2 class=\"today-head\">Today</h2>\n          </ion-col>\n          <ion-col size=\"4\">\n            <p class=\"icon-close\" *ngIf=\"!clearAllBtn\" (click)=\"clearAll()\">\n              <ion-icon name=\"close-circle\"></ion-icon>\n            </p>\n            <p\n              class=\"btn-clear-all\"\n              *ngIf=\"clearAllBtn\"\n              (click)=\"clearAllAlerts()\"\n            >\n              Clear All\n            </p>\n          </ion-col>\n        </ion-row>\n      </ion-label>\n    </ion-item-divider>\n\n    <ion-item-sliding\n      id=\"idCriticalList\"\n      (click)=\"expandItem(item)\"\n      *ngFor=\"let item of criticalFilteredList; let i = index;\"\n    >\n      <ion-item\n        class=\"ion-item-border\"\n        [ngClass]=\"{'unread-border-left': (!item.readBy), 'read-border-remove': (item.readBy), 'active-item': item.expanded }\"\n        *ngIf=\"item.isDeleted === false && (checkForTodaysDate(item.exceptionDateTime))\"\n      >\n        <ion-label>\n          <ion-row>\n            <ion-col>\n              <h2 class=\"row-header\">{{item.exceptionTypeName}}</h2>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <p class=\"time-space\">\n                {{item.exceptionDateTime | date : \"MM/dd/yyyy @ hh:mm a\" }}\n              </p>\n            </ion-col>\n          </ion-row>\n          <app-expandable expandHeight=\"100px\" [expanded]=\"item.expanded\">\n            <ion-row class=\"row-margin-bottom\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Location:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">\n                  {{item.location ? item.location : 'Address Not Available'}}\n                </p>\n              </ion-col>\n            </ion-row>\n\n            <ion-row class=\"row-margin-bottom\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Account:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">{{item.victimAccountName}}</p>\n              </ion-col>\n            </ion-row>\n\n            <ion-row class=\"row-margin-bottom\" *ngIf=\"item.zoneName !== ''\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Zone:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">{{item.zoneName}}</p>\n              </ion-col>\n            </ion-row>\n          </app-expandable>\n        </ion-label>\n      </ion-item>\n\n      <ion-item-options side=\"start\">\n        <ion-item-option\n          color=\"danger\"\n          class=\"item-option-txt\"\n          (click)=\"deleteItem(item)\"\n        >\n          <ion-icon slot=\"top\" name=\"trash\"></ion-icon>\n          Delete\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-list\n    lines=\"none\"\n    class=\"list-margin-bottom\"\n    *ngIf=\"criticalAlertList.length > 0\"\n  >\n    <ion-item-divider class=\"divider-margin-top\" *ngIf=\"isTodayDataAvailable\">\n      <ion-label class=\"lbl-width\">\n        <ion-row>\n          <ion-col size=\"4\">\n            <h2 class=\"today-head\">Older</h2>\n          </ion-col>\n        </ion-row>\n      </ion-label>\n    </ion-item-divider>\n\n    <ion-item-divider class=\"divider-margin-top\" *ngIf=\"!isTodayDataAvailable\">\n      <ion-label class=\"lbl-width\">\n        <ion-row>\n          <ion-col size=\"8\" (click)=\"closeClearAll()\">\n            <h2 class=\"today-head\">Older</h2>\n          </ion-col>\n          <ion-col size=\"4\">\n            <p class=\"icon-close\" *ngIf=\"!clearAllBtn\" (click)=\"clearAll()\">\n              <ion-icon name=\"close-circle\"></ion-icon>\n            </p>\n            <p\n              class=\"btn-clear-all\"\n              *ngIf=\"clearAllBtn\"\n              (click)=\"clearAllAlerts()\"\n            >\n              Clear All\n            </p>\n          </ion-col>\n        </ion-row>\n      </ion-label>\n    </ion-item-divider>\n\n    <ion-item-sliding\n      id=\"idCriticalList\"\n      (click)=\"expandItem(item)\"\n      *ngFor=\"let item of criticalFilteredList; let i = index;\"\n    >\n      <ion-item\n        class=\"ion-item-border\"\n        [ngClass]=\"{'unread-border-left': (!item.readBy), 'read-border-remove': (item.readBy), 'active-item': item.expanded}\"\n        *ngIf=\"item.isDeleted === false && !(checkForTodaysDate(item.exceptionDateTime))\"\n      >\n        <ion-label>\n          <ion-row>\n            <ion-col>\n              <h2 class=\"row-header\">{{item.exceptionTypeName}}</h2>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <p class=\"time-space\">\n                {{item.exceptionDateTime | date : \"MM/dd/yyyy @ hh:mm a\" }}\n              </p>\n            </ion-col>\n          </ion-row>\n          <app-expandable expandHeight=\"100px\" [expanded]=\"item.expanded\">\n            <ion-row class=\"row-margin-bottom\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Location:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">\n                  {{item.location ? item.location : 'Address Not Available'}}\n                </p>\n              </ion-col>\n            </ion-row>\n\n            <ion-row class=\"row-margin-bottom\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Account:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">{{item.victimAccountName}}</p>\n              </ion-col>\n            </ion-row>\n\n            <ion-row class=\"row-margin-bottom\" *ngIf=\"item.zoneName !== ''\">\n              <ion-col size=\"3\">\n                <p class=\"lbl-p\"><b>Zone:</b></p>\n              </ion-col>\n              <ion-col size=\"9\">\n                <p class=\"lbl-p\">{{item.zoneName}}</p>\n              </ion-col>\n            </ion-row>\n          </app-expandable>\n        </ion-label>\n      </ion-item>\n\n      <ion-item-options side=\"start\">\n        <ion-item-option\n          color=\"danger\"\n          class=\"item-option-txt\"\n          (click)=\"deleteItem(item)\"\n        >\n          <ion-icon slot=\"top\" name=\"trash\"></ion-icon>\n          Delete\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n  <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadMoreData($event)\">\n    <ion-infinite-scroll-content\n      loadingSpinner=\"bubbles\"\n      loadingText=\"Loading more data...\"\n    >\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n  <div\n    id=\"no-notification\"\n    *ngIf=\"criticalAlertList.length < 1\"\n    class=\"no-notification\"\n  >\n    No Notifications\n  </div>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/homepage/critical/critical/critical-routing.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/homepage/critical/critical/critical-routing.module.ts ***!
  \*****************************************************************************/
/*! exports provided: CriticalPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CriticalPageRoutingModule", function() { return CriticalPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _critical_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./critical.page */ "./src/app/pages/homepage/critical/critical/critical.page.ts");




const routes = [
    {
        path: '',
        component: _critical_page__WEBPACK_IMPORTED_MODULE_3__["CriticalPage"]
    }
];
let CriticalPageRoutingModule = class CriticalPageRoutingModule {
};
CriticalPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], CriticalPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/homepage/critical/critical/critical.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/homepage/critical/critical/critical.module.ts ***!
  \*********************************************************************/
/*! exports provided: CriticalPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CriticalPageModule", function() { return CriticalPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _critical_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./critical-routing.module */ "./src/app/pages/homepage/critical/critical/critical-routing.module.ts");
/* harmony import */ var _critical_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./critical.page */ "./src/app/pages/homepage/critical/critical/critical.page.ts");








let CriticalPageModule = class CriticalPageModule {
};
CriticalPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _critical_routing_module__WEBPACK_IMPORTED_MODULE_6__["CriticalPageRoutingModule"],
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]
        ],
        declarations: [_critical_page__WEBPACK_IMPORTED_MODULE_7__["CriticalPage"]]
    })
], CriticalPageModule);



/***/ }),

/***/ "./src/app/pages/homepage/critical/critical/critical.page.scss":
/*!*********************************************************************!*\
  !*** ./src/app/pages/homepage/critical/critical/critical.page.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".item-option-txt {\n  text-transform: capitalize !important;\n}\n\n.row-width {\n  width: 100% !important;\n}\n\n.row-header {\n  font-weight: bold !important;\n  font-size: 14px !important;\n}\n\n.time-space {\n  font-size: 12px;\n  margin-top: -12px;\n}\n\n.lbl-p {\n  font-size: 12px !important;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n}\n\n.word-text {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n}\n\n.row-margin-bottom {\n  margin-bottom: -10px !important;\n}\n\n.ion-item-border {\n  border-bottom: 1px solid #d2cdcd !important;\n}\n\n.lbl-width {\n  width: 100% !important;\n}\n\n.icon-close {\n  float: right;\n  font-size: 26px;\n  margin-bottom: -10px;\n  margin-right: 2px;\n}\n\n.today-head {\n  font-size: 18px;\n  margin-bottom: -4px;\n}\n\n.no-notification {\n  text-align: center;\n  margin: 10%;\n  font-size: 14px;\n}\n\n.list-margin-bottom {\n  margin-bottom: 34% !important;\n}\n\n.divider-margin-top {\n  margin-top: -20px !important;\n}\n\n.unread-border-left {\n  border-left: 8px solid #DE1A18 !important;\n}\n\n.read-border-remove {\n  border-left: none !important;\n  padding-left: 8px !important;\n}\n\n.btn-clear-all {\n  font-size: 12px !important;\n  background: grey !important;\n  color: white !important;\n  border-radius: 25px !important;\n  padding-left: 10px !important;\n  padding-right: 10px !important;\n  float: right !important;\n}\n\n.active-item {\n  --background: #f2f2f2 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy91bWFyL0Rvd25sb2Fkcy9TY3JhbU5ldC5BbGx5LkFuZHJvaWROYXRpdmVfMi9zcmMvYXBwL3BhZ2VzL2hvbWVwYWdlL2NyaXRpY2FsL2NyaXRpY2FsL2NyaXRpY2FsLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvaG9tZXBhZ2UvY3JpdGljYWwvY3JpdGljYWwvY3JpdGljYWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kscUNBQUE7QUNDSjs7QURFQTtFQUNJLHNCQUFBO0FDQ0o7O0FERUE7RUFDSSw0QkFBQTtFQUNBLDBCQUFBO0FDQ0o7O0FERUE7RUFFSSxlQUFBO0VBQ0EsaUJBQUE7QUNBSjs7QURHQTtFQUNJLDBCQUFBO0VBQ0EscUJBQUE7RUFDQSxxQkFBQTtBQ0FKOztBREdBO0VBQ0kscUJBQUE7RUFDQSxxQkFBQTtBQ0FKOztBREdBO0VBQ0ksK0JBQUE7QUNBSjs7QURHQTtFQUNJLDJDQUFBO0FDQUo7O0FEUUE7RUFDSSxzQkFBQTtBQ0xKOztBRFFBO0VBQ0ksWUFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0FDTEo7O0FEUUE7RUFDSSxlQUFBO0VBQ0EsbUJBQUE7QUNMSjs7QURRQTtFQUNJLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNMSjs7QURVQTtFQUNJLDZCQUFBO0FDUEo7O0FEVUE7RUFDSSw0QkFBQTtBQ1BKOztBRFVBO0VBQ0kseUNBQUE7QUNQSjs7QURVQTtFQUNJLDRCQUFBO0VBQ0EsNEJBQUE7QUNQSjs7QURVQTtFQUNJLDBCQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUNBLDhCQUFBO0VBQ0EsNkJBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0FDUEo7O0FEVUE7RUFDSSxnQ0FBQTtBQ1BKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvaG9tZXBhZ2UvY3JpdGljYWwvY3JpdGljYWwvY3JpdGljYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLml0ZW0tb3B0aW9uLXR4dCB7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemUgIWltcG9ydGFudDtcbn1cblxuLnJvdy13aWR0aCB7XG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLnJvdy1oZWFkZXIge1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkICFpbXBvcnRhbnQ7XG4gICAgZm9udC1zaXplOiAxNHB4ICFpbXBvcnRhbnQ7XG59XG5cbi50aW1lLXNwYWNlIHtcbiAgICAvLyBmbG9hdDogcmlnaHQgIWltcG9ydGFudDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbWFyZ2luLXRvcDogLTEycHg7XG59XG5cbi5sYmwtcCB7XG4gICAgZm9udC1zaXplOiAxMnB4ICFpbXBvcnRhbnQ7XG4gICAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuLndvcmQtdGV4dCB7XG4gICAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuLnJvdy1tYXJnaW4tYm90dG9tIHtcbiAgICBtYXJnaW4tYm90dG9tOiAtMTBweCAhaW1wb3J0YW50O1xufVxuXG4uaW9uLWl0ZW0tYm9yZGVyIHtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2QyY2RjZCAhaW1wb3J0YW50O1xuICAgIC8vIGJvcmRlci1sZWZ0OiAycHggc29saWQgIzM1YzJkMiAhaW1wb3J0YW50O1xufVxuXG4vLyAubGlzdC1tYXJnaW4tYm90dG9tIHtcbi8vICAgICBtYXJnaW4tYm90dG9tOiA0OCUgIWltcG9ydGFudDtcbi8vIH1cblxuLmxibC13aWR0aCB7XG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLmljb24tY2xvc2Uge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBmb250LXNpemU6IDI2cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogLTEwcHg7XG4gICAgbWFyZ2luLXJpZ2h0OiAycHg7XG59XG5cbi50b2RheS1oZWFkIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogLTRweDtcbn1cblxuLm5vLW5vdGlmaWNhdGlvbiB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbjogMTAlO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLy8gTmV3IFRhYiBDU1NcblxuLmxpc3QtbWFyZ2luLWJvdHRvbSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMzQlICFpbXBvcnRhbnQ7XG59XG5cbi5kaXZpZGVyLW1hcmdpbi10b3Age1xuICAgIG1hcmdpbi10b3A6IC0yMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi51bnJlYWQtYm9yZGVyLWxlZnQge1xuICAgIGJvcmRlci1sZWZ0OiA4cHggc29saWQgI0RFMUExOCAhaW1wb3J0YW50O1xufVxuXG4ucmVhZC1ib3JkZXItcmVtb3ZlIHtcbiAgICBib3JkZXItbGVmdDogbm9uZSAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmctbGVmdDogOHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5idG4tY2xlYXItYWxsIHtcbiAgICBmb250LXNpemU6IDEycHggIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kOiBncmV5ICFpbXBvcnRhbnQ7XG4gICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweCAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmctbGVmdDogMTBweCAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHggIWltcG9ydGFudDtcbiAgICBmbG9hdDogcmlnaHQgIWltcG9ydGFudDtcbn1cblxuLmFjdGl2ZS1pdGVtIHtcbiAgICAtLWJhY2tncm91bmQ6ICNmMmYyZjIgIWltcG9ydGFudDtcbn0iLCIuaXRlbS1vcHRpb24tdHh0IHtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemUgIWltcG9ydGFudDtcbn1cblxuLnJvdy13aWR0aCB7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG59XG5cbi5yb3ctaGVhZGVyIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAxNHB4ICFpbXBvcnRhbnQ7XG59XG5cbi50aW1lLXNwYWNlIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBtYXJnaW4tdG9wOiAtMTJweDtcbn1cblxuLmxibC1wIHtcbiAgZm9udC1zaXplOiAxMnB4ICFpbXBvcnRhbnQ7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xufVxuXG4ud29yZC10ZXh0IHtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbi5yb3ctbWFyZ2luLWJvdHRvbSB7XG4gIG1hcmdpbi1ib3R0b206IC0xMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5pb24taXRlbS1ib3JkZXIge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2QyY2RjZCAhaW1wb3J0YW50O1xufVxuXG4ubGJsLXdpZHRoIHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLmljb24tY2xvc2Uge1xuICBmbG9hdDogcmlnaHQ7XG4gIGZvbnQtc2l6ZTogMjZweDtcbiAgbWFyZ2luLWJvdHRvbTogLTEwcHg7XG4gIG1hcmdpbi1yaWdodDogMnB4O1xufVxuXG4udG9kYXktaGVhZCB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgbWFyZ2luLWJvdHRvbTogLTRweDtcbn1cblxuLm5vLW5vdGlmaWNhdGlvbiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiAxMCU7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmxpc3QtbWFyZ2luLWJvdHRvbSB7XG4gIG1hcmdpbi1ib3R0b206IDM0JSAhaW1wb3J0YW50O1xufVxuXG4uZGl2aWRlci1tYXJnaW4tdG9wIHtcbiAgbWFyZ2luLXRvcDogLTIwcHggIWltcG9ydGFudDtcbn1cblxuLnVucmVhZC1ib3JkZXItbGVmdCB7XG4gIGJvcmRlci1sZWZ0OiA4cHggc29saWQgI0RFMUExOCAhaW1wb3J0YW50O1xufVxuXG4ucmVhZC1ib3JkZXItcmVtb3ZlIHtcbiAgYm9yZGVyLWxlZnQ6IG5vbmUgIWltcG9ydGFudDtcbiAgcGFkZGluZy1sZWZ0OiA4cHggIWltcG9ydGFudDtcbn1cblxuLmJ0bi1jbGVhci1hbGwge1xuICBmb250LXNpemU6IDEycHggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZDogZ3JleSAhaW1wb3J0YW50O1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogMjVweCAhaW1wb3J0YW50O1xuICBwYWRkaW5nLWxlZnQ6IDEwcHggIWltcG9ydGFudDtcbiAgcGFkZGluZy1yaWdodDogMTBweCAhaW1wb3J0YW50O1xuICBmbG9hdDogcmlnaHQgIWltcG9ydGFudDtcbn1cblxuLmFjdGl2ZS1pdGVtIHtcbiAgLS1iYWNrZ3JvdW5kOiAjZjJmMmYyICFpbXBvcnRhbnQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/homepage/critical/critical/critical.page.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/homepage/critical/critical/critical.page.ts ***!
  \*******************************************************************/
/*! exports provided: CriticalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CriticalPage", function() { return CriticalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/store */ "./node_modules/@ngrx/store/fesm2015/store.js");
/* harmony import */ var src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/provider/common-api/common-api.service */ "./src/app/provider/common-api/common-api.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/provider/common-file/logfile.service */ "./src/app/provider/common-file/logfile.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");








let CriticalPage = class CriticalPage {
    constructor(alertController, commonAPIService, store, events, logService, route, zone) {
        this.alertController = alertController;
        this.commonAPIService = commonAPIService;
        this.store = store;
        this.events = events;
        this.logService = logService;
        this.route = route;
        this.zone = zone;
        this.criticalAlertList = [];
        this.items = [];
        this.notificationAlertList = [];
        this.notifyList = {};
        this.criticalFilteredList = [];
        this.pageLimit = 10;
        events.subscribe('allEventAlertList', (data) => {
            this.logService.logDebug('CriticalPage', 'allEventAlertList_subscribe', 'allEventAlertList Critical');
            this.getCurrentTabData();
        });
        this.clearAllBtn = false;
    }
    ionViewWillEnter() {
        this.pageLimit = 10;
        this.getCurrentTabData();
    }
    getCurrentTabData() {
        this.commonAPIService.exceptionLevelCritical = [];
        this.logService.logDebug('CriticalPage', 'allEventAlertList_subscribe', 'allEventAlertList Critical');
        if (this.commonAPIService.allAlertListCombineData) {
            this.commonAPIService.exceptionLevelCritical = this.commonAPIService.allAlertListCombineData.filter((el) => {
                return el.exceptionLevel === 'Critical';
            });
        }
        this.criticalAlertList = this.commonAPIService.exceptionLevelCritical;
        this.criticalFilteredList = [];
        this.criticalFilteredList = this.criticalAlertList.slice(0, this.pageLimit);
        if (this.criticalFilteredList.length !== this.criticalAlertList.length) {
            this.infiniteScroll.disabled = false;
        }
        this.zone.run(() => {
            this.criticalAlertList = this.commonAPIService.exceptionLevelCritical;
            this.criticalFilteredList = this.criticalFilteredList;
        });
        this.criticalAlertList.forEach((item, index) => {
            item.expanded = false;
            if (item.isDeleted === false && (this.checkForTodaysDate(item.exceptionDateTime))) {
                this.isTodayDataAvailable = true;
            }
        });
        this.route.queryParams.subscribe(params => {
            this.notifyList = params;
        });
        if (Object.keys(this.notifyList).length > 0) {
            if (this.commonAPIService.allAlertListCombineData) {
                this.itemToSearch = this.commonAPIService.allAlertListCombineData.filter((el) => {
                    // tslint:disable-next-line:radix
                    return el.eventId === parseInt(this.notifyList.EventId);
                });
                this.itemToSearch[0].expanded = false;
                this.expandItem(this.itemToSearch[0]);
            }
        }
    }
    loadMoreData(event) {
        setTimeout(() => {
            this.pageLimit = this.pageLimit + 5;
            this.criticalFilteredList = this.criticalAlertList.slice(0, this.pageLimit);
            event.target.complete();
            if (this.criticalFilteredList.length === this.criticalAlertList.length) {
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
            this.criticalAlertList.map(listItem => {
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
        this.closeClearAll();
    }
    callReadApi(item) {
        if (this.commonAPIService.networkStatus.connected) {
            this.logService.logDebug('CriticalPage', 'callReadApi', 'Calling API eventReadAPI : ' + src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].eventReadAPI +
                this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
            this.commonAPIService.putDataWithInterceptorObservable(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].eventReadAPI +
                this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
                .toPromise().then((response) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                yield response;
                this.logService.logDebug('CriticalPage', 'callReadApi', 'Called API eventReadAPI with response : eventId=' +
                    item.eventId + ' read');
                this.events.publish('update:count', item);
            }), err => {
                this.logService.logError('CriticalPage', 'callReadApi', 'Called API eventReadAPI with failed response : ' + JSON.stringify(err));
            });
        }
        else {
            this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
            this.logService.logError('CriticalPage', 'callReadApi', 'No Internet! Please check your internet connectivity');
        }
    }
    deleteItem(item) {
        if (this.commonAPIService.networkStatus.connected) {
            // this.presentAlertConfirm(item);
            this.commonAPIService.showLoader('Deleting item ...');
            this.logService.logDebug('CriticalPage', 'deleteItem', 'Calling API eventDeleteAPI : ' + src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].eventDeleteAPI +
                this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
            this.commonAPIService.putDataWithInterceptorObservable(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].eventDeleteAPI +
                this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
                .toPromise().then((response) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                yield response;
                this.logService.logDebug('CriticalPage', 'deleteItem', 'Called API eventReadAPI : eventId=' + item.eventId + ' delete');
                item.isDeleted = true;
                this.commonAPIService.hideLoader();
                this.events.publish('allAlertsDeleted', 'refreshList');
                this.commonAPIService.presentToastWithCloseBtn('Alert deleted');
            }), err => {
                this.commonAPIService.presentToast('Error while deleting alert!');
                this.commonAPIService.hideLoader();
            });
        }
        else {
            this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
            this.logService.logError('CriticalPage', 'deleteItem', 'No Internet! Please check your internet connectivity');
        }
    }
    deleteAllItem() {
        if (this.commonAPIService.networkStatus.connected) {
            this.commonAPIService.showLoader('Deleting item ...');
            this.logService.logDebug('CriticalPage', 'deleteAllItem', 'Calling API eventDeleteAllAPI : ' + src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].eventDeleteAllAPI +
                this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Critical');
            this.commonAPIService.putDataWithInterceptorObservable(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].eventDeleteAllAPI +
                this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Critical', null)
                .toPromise().then((response) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
                yield response;
                this.logService.logDebug('CriticalPage', 'deleteItem', 'Called API eventReadAPI with response : victimId=' +
                    this.commonAPIService.victimDetails.victimId + '. delete all');
                this.criticalAlertList.forEach((item, index) => {
                    item.isDeleted = true;
                });
                this.commonAPIService.hideLoader();
                this.events.publish('allAlertsDeleted', 'refreshList');
                this.criticalAlertList = [];
                this.commonAPIService.presentToastWithCloseBtn('All alerts deleted');
            }), err => {
                this.commonAPIService.hideLoader();
                this.commonAPIService.presentToast('Error while deleting all alerts!');
                this.logService.logDebug('CriticalPage', 'deleteAllItem', 'Called API eventDeleteAllAPI with response: victimId=' + JSON.stringify(err));
            });
        }
        else {
            this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
            this.logService.logError('CriticalPage', 'deleteAllItem', 'No Internet! Please check your internet connectivity');
        }
    }
    clearAll() {
        // this.alertConfirmClearAll();
        this.logService.logDebug('CriticalPage', 'clearAll', 'clearAll');
        this.clearAllBtn = true;
    }
    closeClearAll() {
        this.logService.logDebug('CriticalPage', 'closeClearAll', 'closeClearAll');
        this.clearAllBtn = false;
    }
    clearAllAlerts() {
        this.logService.logDebug('CriticalPage', 'clearAllAlerts', 'clearAllAlerts');
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
                            this.logService.logDebug('CriticalPage', 'presentAlertConfirm', 'Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Delete',
                        handler: () => {
                            this.notificationAlertList = this.notificationAlertList.filter(list => list.messageId !== item);
                            this.logService.logDebug('CriticalPage', 'presentAlertConfirm', 'Notification deleted!');
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
                            this.logService.logDebug('CriticalPage', 'alertConfirmClearAll', 'Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Delete',
                        handler: () => {
                            this.notificationAlertList = [];
                            this.logService.logDebug('CriticalPage', 'alertConfirmClearAll', 'All Notifications are deleted!');
                            this.commonAPIService.presentToast('All Notifications are deleted!');
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    checkForTodaysDate(date) {
        this.logService.logDebug('CriticalPage', 'checkForTodaysDate', 'checkForTodaysDate Todate:' + date);
        return this.commonAPIService.isToday(date);
    }
};
CriticalPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] },
    { type: src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_4__["CommonAPIService"] },
    { type: _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"] },
    { type: src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_6__["LogfileService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonInfiniteScroll"], { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonInfiniteScroll"])
], CriticalPage.prototype, "infiniteScroll", void 0);
CriticalPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-critical',
        template: __webpack_require__(/*! raw-loader!./critical.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/homepage/critical/critical/critical.page.html"),
        styles: [__webpack_require__(/*! ./critical.page.scss */ "./src/app/pages/homepage/critical/critical/critical.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"],
        src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_4__["CommonAPIService"],
        _ngrx_store__WEBPACK_IMPORTED_MODULE_3__["Store"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"],
        src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_6__["LogfileService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
], CriticalPage);



/***/ })

}]);
//# sourceMappingURL=critical-critical-critical-module-es2015.js.map