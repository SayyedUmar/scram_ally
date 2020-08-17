(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-profile-profile-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/profile/profile.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/profile/profile.page.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-button routerLink=\"/homepage\" routerDirection=\"back\">\n        <ion-icon name=\"arrow-back\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-title>\n      My Profile\n    </ion-title>\n  </ion-toolbar>\n</ion-header> -->\n\n<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      <ion-label>\n        <ion-row class=\"header-txt\">\n          <ion-col>\n            <ion-title>\n              My Profile\n            </ion-title>\n          </ion-col>\n        </ion-row>\n      </ion-label>\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class=\"ion-text-center hide-card user-card\">\n    <img src=\"../assets/imgs/male-user.png\" class=\"custom-avatar\" name=\"userAvatar\" />\n    <h5 class=\"h5-margin\">{{victimDetails.name}}</h5>\n    <p>{{victimDetails.email}}</p>\n  </div>\n\n  <div class=\"content-div\">\n    <ion-label name=\"profile\">\n      <ion-row class=\"row-margin-bottom\">\n        <ion-col size=\"6\">\n          <p class=\"lbl-p\"><b>Phone Number</b></p>\n        </ion-col>\n        <ion-col size=\"6\">\n          <p class=\"lbl-p\">{{victimDetails.phone}}</p>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col size=\"6\">\n          <p class=\"lbl-p\"><b>Zone Radius</b></p>\n        </ion-col>\n        <ion-col size=\"6\">\n          <p class=\"lbl-p\">{{victimDetails.zoneRadius}}</p>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col size=\"6\">\n          <p class=\"lbl-p\"><b>Primary Agent</b></p>\n        </ion-col>\n        <ion-col size=\"6\">\n          <p class=\"lbl-p\">{{victimDetails.primaryAgent}}</p>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col size=\"6\">\n          <p class=\"lbl-p\"><b>Account</b></p>\n        </ion-col>\n        <ion-col size=\"6\">\n          <p class=\"lbl-p\">{{victimDetails.account}}</p>\n        </ion-col>\n      </ion-row>\n    </ion-label>\n  </div>\n\n  <div class=\"links-div bottom-div-space\" (click)=\"openURL()\">\n    <ion-label name=\"termsCondition\">\n      <ion-icon name=\"create\" class=\"create-icon\"></ion-icon>\n      Terms & Conditions\n    </ion-label>\n  </div>\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/profile/profile.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/profile/profile.module.ts ***!
  \*************************************************/
/*! exports provided: ProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile.page */ "./src/app/pages/profile/profile.page.ts");







const routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]
    }
];
let ProfilePageModule = class ProfilePageModule {
};
ProfilePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
        ],
        declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]]
    })
], ProfilePageModule);



/***/ }),

/***/ "./src/app/pages/profile/profile.page.scss":
/*!*************************************************!*\
  !*** ./src/app/pages/profile/profile.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".user-card {\n  background: #F3F3F4 !important;\n  padding-bottom: 16px;\n}\n\n.custom-avatar {\n  height: 20vw;\n  width: 20vw;\n  border-radius: 50%;\n  display: inline-block;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 28px !important;\n}\n\n.h5-margin {\n  margin-top: 5px !important;\n  margin-bottom: -10px !important;\n}\n\n.content-div {\n  margin: 8% !important;\n}\n\n.links-div {\n  font-size: 14px !important;\n  color: #3880FF;\n  margin-left: 8%;\n}\n\n.create-icon {\n  background: #3880FF;\n  color: white;\n}\n\n.bottom-div-space {\n  margin-bottom: 8% !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy91bWFyL0Rvd25sb2Fkcy9TY3JhbU5ldC5BbGx5LkFuZHJvaWROYXRpdmVfMi9zcmMvYXBwL3BhZ2VzL3Byb2ZpbGUvcHJvZmlsZS5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL3Byb2ZpbGUvcHJvZmlsZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSw4QkFBQTtFQUNBLG9CQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7QUNDRjs7QURFQTtFQUNFLDBCQUFBO0VBQ0EsK0JBQUE7QUNDRjs7QURFQTtFQUNFLHFCQUFBO0FDQ0Y7O0FERUE7RUFDRSwwQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FERUE7RUFDRSxtQkFBQTtFQUNBLFlBQUE7QUNDRjs7QURFQTtFQUNFLDRCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9wcm9maWxlL3Byb2ZpbGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnVzZXItY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNGM0YzRjQgIWltcG9ydGFudDtcbiAgcGFkZGluZy1ib3R0b206IDE2cHg7XG59XG5cbi5jdXN0b20tYXZhdGFyIHtcbiAgaGVpZ2h0OiAyMHZ3O1xuICB3aWR0aDogMjB2dztcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIG1hcmdpbi10b3A6IDI4cHggIWltcG9ydGFudDtcbn1cblxuLmg1LW1hcmdpbiB7XG4gIG1hcmdpbi10b3A6IDVweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tYm90dG9tOiAtMTBweCAhaW1wb3J0YW50O1xufVxuXG4uY29udGVudC1kaXYge1xuICBtYXJnaW46IDglICFpbXBvcnRhbnQ7XG59XG5cbi5saW5rcy1kaXYge1xuICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcbiAgY29sb3I6ICMzODgwRkY7XG4gIG1hcmdpbi1sZWZ0OiA4JTtcbn1cblxuLmNyZWF0ZS1pY29uIHtcbiAgYmFja2dyb3VuZDogIzM4ODBGRjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uYm90dG9tLWRpdi1zcGFjZSB7XG4gIG1hcmdpbi1ib3R0b206IDglICFpbXBvcnRhbnQ7XG59IiwiLnVzZXItY2FyZCB7XG4gIGJhY2tncm91bmQ6ICNGM0YzRjQgIWltcG9ydGFudDtcbiAgcGFkZGluZy1ib3R0b206IDE2cHg7XG59XG5cbi5jdXN0b20tYXZhdGFyIHtcbiAgaGVpZ2h0OiAyMHZ3O1xuICB3aWR0aDogMjB2dztcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIG1hcmdpbi10b3A6IDI4cHggIWltcG9ydGFudDtcbn1cblxuLmg1LW1hcmdpbiB7XG4gIG1hcmdpbi10b3A6IDVweCAhaW1wb3J0YW50O1xuICBtYXJnaW4tYm90dG9tOiAtMTBweCAhaW1wb3J0YW50O1xufVxuXG4uY29udGVudC1kaXYge1xuICBtYXJnaW46IDglICFpbXBvcnRhbnQ7XG59XG5cbi5saW5rcy1kaXYge1xuICBmb250LXNpemU6IDE0cHggIWltcG9ydGFudDtcbiAgY29sb3I6ICMzODgwRkY7XG4gIG1hcmdpbi1sZWZ0OiA4JTtcbn1cblxuLmNyZWF0ZS1pY29uIHtcbiAgYmFja2dyb3VuZDogIzM4ODBGRjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uYm90dG9tLWRpdi1zcGFjZSB7XG4gIG1hcmdpbi1ib3R0b206IDglICFpbXBvcnRhbnQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/profile/profile.page.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/profile/profile.page.ts ***!
  \***********************************************/
/*! exports provided: ProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePage", function() { return ProfilePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ "./node_modules/@capacitor/core/dist/esm/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/provider/common-api/common-api.service */ "./src/app/provider/common-api/common-api.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _terms_conditions_terms_conditions_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../terms-conditions/terms-conditions.page */ "./src/app/pages/terms-conditions/terms-conditions.page.ts");
/* harmony import */ var src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/provider/common-file/logfile.service */ "./src/app/provider/common-file/logfile.service.ts");








const { Browser } = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["Plugins"];
let ProfilePage = class ProfilePage {
    constructor(menuCtrl, commonAPIService, modalController, logService) {
        this.menuCtrl = menuCtrl;
        this.commonAPIService = commonAPIService;
        this.modalController = modalController;
        this.logService = logService;
        this.victimDetailsProfile = this.commonAPIService.victimDetails;
        this.victimDetails = {
            name: this.victimDetailsProfile.firstName + ' ' + this.victimDetailsProfile.lastName,
            email: this.victimDetailsProfile.username,
            phone: this.victimDetailsProfile.cellPhone,
            account: this.victimDetailsProfile.accountName,
            primaryAgent: '',
            zoneRadius: this.commonAPIService.appConfiguration.zoneRadiusDisplayName
        };
        this.userDetailsObj = {
            name: '',
            email: '',
            emailVerified: false,
            nickname: '',
            picture: ''
        };
    }
    ionViewWillEnter() {
    }
    ngOnInit() {
        this.logService.logDebug('ProfilePage', 'ngOnInit()', 'ngOnInit');
        this.getAppSettingDetails();
        this.getLoggedInUserDetails();
    }
    getPrimaryAgentData() {
        this.logService.logDebug('ProfilePage', 'getPrimaryAgentData()', 'Calling API victimPrimaryAgentAPI : ' +
            src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].gatewayUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].victimPrimaryAgentAPI + this.commonAPIService.victimDetails.victimId);
        this.commonAPIService.getData(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].victimPrimaryAgentAPI + this.commonAPIService.victimDetails.victimId).subscribe(data => {
            console.log(data);
            this.commonAPIService.primaryAgentInfo = data.body;
            this.logService.logInfo('ProfilePage', 'getPrimaryAgentData', 'Called API victimPrimaryAgentAPI with response: ' + JSON.stringify(this.commonAPIService.primaryAgentInfo));
            this.victimDetails = {
                name: this.victimDetailsProfile.firstName + ' ' + this.victimDetailsProfile.lastName,
                email: this.victimDetailsProfile.username,
                phone: this.victimDetailsProfile.cellPhone,
                account: this.victimDetailsProfile.accountName,
                primaryAgent: (this.commonAPIService.primaryAgentInfo !== null &&
                    this.commonAPIService.primaryAgentInfo !== undefined) ? this.commonAPIService.primaryAgentInfo.firstName + ' ' +
                    this.commonAPIService.primaryAgentInfo.lastName : '',
                zoneRadius: this.commonAPIService.appConfiguration.zoneRadiusDisplayName
            };
        }, err => {
            console.log(err);
            this.logService.logError('ProfilePage', 'getPrimaryAgentData', 'Called API victimPrimaryAgentAPI with failed response: ' + JSON.stringify(err));
        });
    }
    getAppSettingDetails() {
        this.commonAPIService.showLoader('Loading data...');
        // Get Configuration data
        this.logService.logDebug('ProfilePage', 'getAppSettingDetails()', 'Calling API victimConfigurationAPI : ' +
            src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].gatewayUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].victimConfigurationAPI + this.commonAPIService.victimDetails.victimId);
        this.commonAPIService.getData(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].victimConfigurationAPI + this.commonAPIService.victimDetails.victimId).subscribe(data => {
            console.log('Configuration data : ');
            console.log(data);
            this.logService.logInfo('ProfilePage', 'getAppSettingDetails_Response', 'Called API victimConfigurationAPI with response : ' + JSON.stringify(data.body));
            if (data.body) {
                this.commonAPIService.appConfiguration = data.body;
                setTimeout(() => {
                    this.getPrimaryAgentData();
                }, 500);
            }
            else {
                this.commonAPIService.presentToast('No client assigned...');
            }
            this.commonAPIService.hideLoader();
        }, err => {
            this.commonAPIService.hideLoader();
            this.logService.logError('ProfilePage', 'getAppSettingDetails', 'Called API victimConfigurationAPI with failed response : ' + JSON.stringify(err));
        });
    }
    getLoggedInUserDetails() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.commonAPIService.getStorageValue('loggedInUserDetails').then(res => {
                this.logService.logDebug('ProfilePage', 'getLoggedInUserDetails()', 'loggedInUserDetails : ' + JSON.stringify(res));
                this.userDetailsObj.name = res.name;
                this.userDetailsObj.emailVerified = res.email_verified;
                this.userDetailsObj.email = res.email;
                this.userDetailsObj.picture = res.picture;
                this.userDetailsObj.nickname = res.nickname;
                this.commonAPIService.userDetails = this.userDetailsObj;
                // this.commonAPIService.showLoader('Loading data...');
                // Get Victim Details by email id
                this.logService.logDebug('ProfilePage', 'getLoggedInUserDetails()', 'Calling API getVictimDetailsAPI : ' +
                    src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].gatewayUrl + src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].getVictimDetailsAPI + res.email);
                this.commonAPIService.getData(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].getVictimDetailsAPI + this.commonAPIService.userDetails.email).subscribe(data => {
                    console.log('User details : ');
                    console.log(data);
                    this.commonAPIService.victimDetails = data.body;
                    this.logService.logInfo('ProfilePage', 'getLoggedInUserDetails', 'Called API getVictimDetailsAPI with response: ' + JSON.stringify(data.body));
                    this.victimDetailsProfile = this.commonAPIService.victimDetails;
                    this.victimDetails = {
                        name: this.victimDetailsProfile.firstName + ' ' + this.victimDetailsProfile.lastName,
                        email: this.victimDetailsProfile.username,
                        phone: this.victimDetailsProfile.cellPhone,
                        account: this.victimDetailsProfile.accountName,
                        primaryAgent: (this.commonAPIService.primaryAgentInfo !== null &&
                            this.commonAPIService.primaryAgentInfo !== undefined) ? this.commonAPIService.primaryAgentInfo.firstName + ' ' +
                            this.commonAPIService.primaryAgentInfo.lastName : '',
                        zoneRadius: this.commonAPIService.appConfiguration.zoneRadiusDisplayName
                    };
                }, err => {
                    this.logService.logInfo('ProfilePage', 'getLoggedInUserDetails', 'Called API getVictimDetailsAPI with failed response: ' + JSON.stringify(err));
                });
            });
        });
    }
    openTermsCondition() {
        this.logService.logDebug('ProfilePage', 'openTermsCondition()', 'openTermsCondition');
        this.showTermsConditionModal();
    }
    showTermsConditionModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _terms_conditions_terms_conditions_page__WEBPACK_IMPORTED_MODULE_6__["TermsConditionsPage"],
                cssClass: '',
                backdropDismiss: false
            });
            return yield modal.present();
        });
    }
    openURL() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logDebug('openURL', 'openURL()', 'openURL');
            yield Browser.open({ url: 'https://www.scramsystems.com/terms-and-conditions/ally/' });
        });
    }
};
ProfilePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"] },
    { type: src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_4__["CommonAPIService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_7__["LogfileService"] }
];
ProfilePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__(/*! raw-loader!./profile.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/profile/profile.page.html"),
        styles: [__webpack_require__(/*! ./profile.page.scss */ "./src/app/pages/profile/profile.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"], src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_4__["CommonAPIService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
        src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_7__["LogfileService"]])
], ProfilePage);



/***/ })

}]);
//# sourceMappingURL=pages-profile-profile-module-es2015.js.map