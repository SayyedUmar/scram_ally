(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-assigned-clients-assigned-clients-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/assigned-clients/assigned-clients.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/assigned-clients/assigned-clients.page.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title class=\"header-txt-left\">\n      <ion-label>\n        <ion-row>\n          <ion-col>\n            <ion-title>\n              My Assigned Individuals\n            </ion-title>\n          </ion-col>\n        </ion-row>\n      </ion-label>\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <div *ngIf=\"!isClientAssigned\" class=\"no-assigned\">\n    No individuals assigned\n  </div>\n\n  <ion-list *ngFor=\"let item of assignedClientsList; let i = index;\" id=\"idAssignedClientList\">\n    <ion-list-header lines=\"full\">\n      <ion-label class=\"list-header\">\n        <ion-icon name=\"person\" class=\"users-icon\"></ion-icon>\n        {{item.firstName}} {{item.lastName}}\n      </ion-label>\n    </ion-list-header>\n\n    <ion-item class=\"margin-item\">\n      <ion-label>\n        <ion-row class=\"row-margin-bottom\">\n          <ion-col size=\"6\">\n            <p><b>End Of Service</b></p>\n          </ion-col>\n          <ion-col size=\"6\">\n            <p class=\"lbl-p\">{{item.endOfService | date :  \"MM/dd/yyyy\"}}</p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col size=\"6\">\n            <p><b>Court Date</b></p>\n          </ion-col>\n          <ion-col size=\"6\">\n            <p class=\"lbl-p\">{{item.courtDate | date :  \"MM/dd/yyyy\"}}</p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col size=\"6\">\n            <p><b>Primary Agent</b></p>\n          </ion-col>\n          <ion-col size=\"6\">\n            <p class=\"lbl-p\">{{item.primaryAgent.firstName}} {{item.primaryAgent.lastName}}</p>\n          </ion-col>\n        </ion-row>\n      </ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/assigned-clients/assigned-clients-routing.module.ts":
/*!***************************************************************************!*\
  !*** ./src/app/pages/assigned-clients/assigned-clients-routing.module.ts ***!
  \***************************************************************************/
/*! exports provided: AssignedClientsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignedClientsPageRoutingModule", function() { return AssignedClientsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _assigned_clients_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assigned-clients.page */ "./src/app/pages/assigned-clients/assigned-clients.page.ts");




var routes = [
    {
        path: '',
        component: _assigned_clients_page__WEBPACK_IMPORTED_MODULE_3__["AssignedClientsPage"]
    }
];
var AssignedClientsPageRoutingModule = /** @class */ (function () {
    function AssignedClientsPageRoutingModule() {
    }
    AssignedClientsPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        })
    ], AssignedClientsPageRoutingModule);
    return AssignedClientsPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/assigned-clients/assigned-clients.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/assigned-clients/assigned-clients.module.ts ***!
  \*******************************************************************/
/*! exports provided: AssignedClientsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignedClientsPageModule", function() { return AssignedClientsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _assigned_clients_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assigned-clients-routing.module */ "./src/app/pages/assigned-clients/assigned-clients-routing.module.ts");
/* harmony import */ var _assigned_clients_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assigned-clients.page */ "./src/app/pages/assigned-clients/assigned-clients.page.ts");







var AssignedClientsPageModule = /** @class */ (function () {
    function AssignedClientsPageModule() {
    }
    AssignedClientsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _assigned_clients_routing_module__WEBPACK_IMPORTED_MODULE_5__["AssignedClientsPageRoutingModule"]
            ],
            declarations: [_assigned_clients_page__WEBPACK_IMPORTED_MODULE_6__["AssignedClientsPage"]]
        })
    ], AssignedClientsPageModule);
    return AssignedClientsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/assigned-clients/assigned-clients.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/assigned-clients/assigned-clients.page.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".margin-item {\n  margin-left: 4% !important;\n}\n\n.users-icon {\n  margin-bottom: -3px !important;\n  font-size: 18px !important;\n}\n\n.list-header {\n  font-size: 16px !important;\n}\n\n.no-assigned {\n  text-align: center !important;\n  margin-top: 10% !important;\n}\n\n.lbl-p {\n  margin-left: 10px !important;\n}\n\n.header-txt-left {\n  padding-left: 0px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy91bWFyL0Rvd25sb2Fkcy9TY3JhbU5ldC5BbGx5LkFuZHJvaWROYXRpdmVfMi9zcmMvYXBwL3BhZ2VzL2Fzc2lnbmVkLWNsaWVudHMvYXNzaWduZWQtY2xpZW50cy5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2Fzc2lnbmVkLWNsaWVudHMvYXNzaWduZWQtY2xpZW50cy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwwQkFBQTtBQ0NKOztBREVBO0VBQ0ksOEJBQUE7RUFDQSwwQkFBQTtBQ0NKOztBREVBO0VBQ0ksMEJBQUE7QUNDSjs7QURFQTtFQUNJLDZCQUFBO0VBQ0EsMEJBQUE7QUNDSjs7QURFQTtFQUNJLDRCQUFBO0FDQ0o7O0FERUE7RUFDSSw0QkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvYXNzaWduZWQtY2xpZW50cy9hc3NpZ25lZC1jbGllbnRzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXJnaW4taXRlbSB7XG4gICAgbWFyZ2luLWxlZnQ6IDQlICFpbXBvcnRhbnQ7XG59XG5cbi51c2Vycy1pY29uIHtcbiAgICBtYXJnaW4tYm90dG9tOiAtM3B4ICFpbXBvcnRhbnQ7XG4gICAgZm9udC1zaXplOiAxOHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5saXN0LWhlYWRlciB7XG4gICAgZm9udC1zaXplOiAxNnB4ICFpbXBvcnRhbnQ7XG59XG5cbi5uby1hc3NpZ25lZCB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luLXRvcDogMTAlICFpbXBvcnRhbnQ7XG59XG5cbi5sYmwtcCB7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHggIWltcG9ydGFudDtcbn1cblxuLmhlYWRlci10eHQtbGVmdCB7XG4gICAgcGFkZGluZy1sZWZ0OiAwcHggIWltcG9ydGFudDtcbn0iLCIubWFyZ2luLWl0ZW0ge1xuICBtYXJnaW4tbGVmdDogNCUgIWltcG9ydGFudDtcbn1cblxuLnVzZXJzLWljb24ge1xuICBtYXJnaW4tYm90dG9tOiAtM3B4ICFpbXBvcnRhbnQ7XG4gIGZvbnQtc2l6ZTogMThweCAhaW1wb3J0YW50O1xufVxuXG4ubGlzdC1oZWFkZXIge1xuICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcbn1cblxuLm5vLWFzc2lnbmVkIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi10b3A6IDEwJSAhaW1wb3J0YW50O1xufVxuXG4ubGJsLXAge1xuICBtYXJnaW4tbGVmdDogMTBweCAhaW1wb3J0YW50O1xufVxuXG4uaGVhZGVyLXR4dC1sZWZ0IHtcbiAgcGFkZGluZy1sZWZ0OiAwcHggIWltcG9ydGFudDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/assigned-clients/assigned-clients.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/assigned-clients/assigned-clients.page.ts ***!
  \*****************************************************************/
/*! exports provided: AssignedClientsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignedClientsPage", function() { return AssignedClientsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/provider/common-api/common-api.service */ "./src/app/provider/common-api/common-api.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/provider/common-file/logfile.service */ "./src/app/provider/common-file/logfile.service.ts");






var AssignedClientsPage = /** @class */ (function () {
    function AssignedClientsPage(menuCtrl, commonAPIService, logService) {
        this.menuCtrl = menuCtrl;
        this.commonAPIService = commonAPIService;
        this.logService = logService;
        this.isClientAssigned = false;
        this.assignedClientsList = [
            {
                clientId: '',
                firstName: '',
                lastName: '',
                middleName: '',
                accountId: '',
                accountName: '',
                primaryAgent: {
                    applicationUserId: '',
                    firstName: '',
                    lastName: '',
                    middleName: '',
                    roleType: '',
                    phoneNumber: '',
                    accountId: '',
                    accountName: ''
                },
                startOfService: '',
                endOfService: null,
                courtDate: null
            }
        ];
    }
    AssignedClientsPage.prototype.ionViewWillEnter = function () {
        this.menuCtrl.enable(true);
    };
    AssignedClientsPage.prototype.ngOnInit = function () {
        this.getAssignedClientsList();
    };
    AssignedClientsPage.prototype.getAssignedClientsList = function () {
        var _this = this;
        this.commonAPIService.showLoader('Loading data..');
        this.logService.logDebug('AssignedClientsPage', 'getAssignedClientsList()', 'Calling victimClientsAPI : ' +
            src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].gatewayUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].victimClientsAPI + this.commonAPIService.victimDetails.victimId);
        this.commonAPIService.getData(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].victimClientsAPI + this.commonAPIService.victimDetails.victimId).subscribe(function (res) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, res.body];
                    case 1:
                        _a.assignedClientsList = _b.sent();
                        this.logService.logDebug('AssignedClientsPage', 'getAssignedClientsList()', 'Called victimClientsAPI with response :' + JSON.stringify(this.assignedClientsList));
                        if (this.assignedClientsList === null) {
                            this.isClientAssigned = false;
                            this.logService.logDebug('AssignedClientsPage', 'getAssignedClientsList()', 'Called victimClientsAPI with response :' + 'No individuals assigned');
                            this.commonAPIService.hideLoader();
                        }
                        else {
                            this.isClientAssigned = true;
                            this.assignedClientsList.forEach(function (element) {
                                if (element.endOfService !== null) {
                                    element.endOfService = element.endOfService.split('T')[0];
                                }
                                if (element.courtDate !== null) {
                                    element.courtDate = element.courtDate.split('T')[0];
                                }
                            });
                            this.commonAPIService.hideLoader();
                        }
                        return [2 /*return*/];
                }
            });
        }); }, function (err) {
            _this.logService.logDebug('AssignedClientsPage', 'getAssignedClientsList()', 'Called victimClientsAPI with failed response :' + JSON.stringify(err));
            _this.commonAPIService.hideLoader();
        });
    };
    AssignedClientsPage.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["MenuController"] },
        { type: src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_3__["CommonAPIService"] },
        { type: src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_5__["LogfileService"] }
    ]; };
    AssignedClientsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-assigned-clients',
            template: __webpack_require__(/*! raw-loader!./assigned-clients.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/assigned-clients/assigned-clients.page.html"),
            styles: [__webpack_require__(/*! ./assigned-clients.page.scss */ "./src/app/pages/assigned-clients/assigned-clients.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["MenuController"], src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_3__["CommonAPIService"],
            src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_5__["LogfileService"]])
    ], AssignedClientsPage);
    return AssignedClientsPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-assigned-clients-assigned-clients-module-es5.js.map