(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["auth-auth0-auth-auth-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/auth/auth0/auth/auth.page.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/auth/auth0/auth/auth.page.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n  <div>\n    <div class=\"image-container\" id=\"imgLogo\">\n      <img class=\"logo\" src=\"assets/imgs/login.png\" />\n    </div>\n\n    <div class=\"content\">\n      <div class=\"message\" id=\"message\">\n        <ion-text class=\"title\">\n          <h2>Welcome to Ally</h2>\n        </ion-text>\n        <ion-text color=\"medium\">\n          <h6>Please press the button below to sign in.</h6>\n        </ion-text>\n      </div>\n\n      <div class=\"footer\">\n        <ion-button id=\"btnSignIn\" color=\"primary\" expand=\"block\" round (click)=\"onClick()\" class=\"\">Sign In\n        </ion-button>\n      </div>\n    </div>\n  </div>\n</ion-content>"

/***/ }),

/***/ "./src/app/auth/auth0/auth/auth-routing.module.ts":
/*!********************************************************!*\
  !*** ./src/app/auth/auth0/auth/auth-routing.module.ts ***!
  \********************************************************/
/*! exports provided: AuthPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthPageRoutingModule", function() { return AuthPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _auth_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.page */ "./src/app/auth/auth0/auth/auth.page.ts");




const routes = [
    {
        path: '',
        component: _auth_page__WEBPACK_IMPORTED_MODULE_3__["AuthPage"]
    }
];
let AuthPageRoutingModule = class AuthPageRoutingModule {
};
AuthPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AuthPageRoutingModule);



/***/ }),

/***/ "./src/app/auth/auth0/auth/auth.module.ts":
/*!************************************************!*\
  !*** ./src/app/auth/auth0/auth/auth.module.ts ***!
  \************************************************/
/*! exports provided: AuthPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthPageModule", function() { return AuthPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth-routing.module */ "./src/app/auth/auth0/auth/auth-routing.module.ts");
/* harmony import */ var _auth_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth.page */ "./src/app/auth/auth0/auth/auth.page.ts");







let AuthPageModule = class AuthPageModule {
};
AuthPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _auth_routing_module__WEBPACK_IMPORTED_MODULE_5__["AuthPageRoutingModule"]
        ],
        declarations: [_auth_page__WEBPACK_IMPORTED_MODULE_6__["AuthPage"]]
    })
], AuthPageModule);



/***/ }),

/***/ "./src/app/auth/auth0/auth/auth.page.scss":
/*!************************************************!*\
  !*** ./src/app/auth/auth0/auth/auth.page.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".image-container {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  background-color: #253A92;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  height: 70%;\n}\n\n.logo {\n  margin-top: 10%;\n  margin-bottom: 25px;\n}\n\n.message {\n  margin-left: 20px;\n  margin-right: 20px;\n  text-align: center;\n}\n\n.footer {\n  margin-right: 20px;\n  margin-left: 20px;\n}\n\n.footer .button {\n  text-transform: capitalize !important;\n}\n\n.container {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  height: 100%;\n}\n\n.content {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  height: 40%;\n  -webkit-box-pack: space-evenly;\n          justify-content: space-evenly;\n}\n\n.title {\n  color: #5a5a5a;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy91bWFyL0Rvd25sb2Fkcy9TY3JhbU5ldC5BbGx5LkFuZHJvaWROYXRpdmVfMi9zcmMvYXBwL2F1dGgvYXV0aDAvYXV0aC9hdXRoLnBhZ2Uuc2NzcyIsInNyYy9hcHAvYXV0aC9hdXRoMC9hdXRoL2F1dGgucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSx5QkFBQTtFQUVBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxXQUFBO0FDQUY7O0FER0E7RUFDRSxlQUFBO0VBR0EsbUJBQUE7QUNGRjs7QURXQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtBQ1JGOztBRFdBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtBQ1JGOztBRFVFO0VBQ0UscUNBQUE7QUNSSjs7QURZQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLFlBQUE7QUNURjs7QURZQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSw4QkFBQTtVQUFBLDZCQUFBO0FDVEY7O0FEWUE7RUFDRSxjQUFBO0FDVEYiLCJmaWxlIjoic3JjL2FwcC9hdXRoL2F1dGgwL2F1dGgvYXV0aC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1hZ2UtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyNTNBOTI7XG4gIC8vIGJhY2tncm91bmQtY29sb3I6ICM2RENGRjY7XG4gIHBhZGRpbmctdG9wOiAyMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMjBweDtcbiAgaGVpZ2h0OiA3MCU7XG59XG5cbi5sb2dvIHtcbiAgbWFyZ2luLXRvcDogMTAlO1xuICAvLyBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIC8vIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XG4gIC8vIGhlaWdodDogNDQlO1xufVxuXG4vLyAubG9nbyB7XG4vLyAgIG1hcmdpbi10b3A6IDEwJTtcbi8vICAgbWFyZ2luLWJvdHRvbTogMjVweDtcbi8vIH1cblxuLm1lc3NhZ2Uge1xuICBtYXJnaW4tbGVmdDogMjBweDtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5mb290ZXIge1xuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xuXG4gIC5idXR0b24ge1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuLmNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBoZWlnaHQ6IDQwJTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG59XG5cbi50aXRsZSB7XG4gIGNvbG9yOiAjNWE1YTVhO1xufSIsIi5pbWFnZS1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI1M0E5MjtcbiAgcGFkZGluZy10b3A6IDIwcHg7XG4gIHBhZGRpbmctYm90dG9tOiAyMHB4O1xuICBoZWlnaHQ6IDcwJTtcbn1cblxuLmxvZ28ge1xuICBtYXJnaW4tdG9wOiAxMCU7XG4gIG1hcmdpbi1ib3R0b206IDI1cHg7XG59XG5cbi5tZXNzYWdlIHtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZm9vdGVyIHtcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICBtYXJnaW4tbGVmdDogMjBweDtcbn1cbi5mb290ZXIgLmJ1dHRvbiB7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplICFpbXBvcnRhbnQ7XG59XG5cbi5jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaGVpZ2h0OiA0MCU7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xufVxuXG4udGl0bGUge1xuICBjb2xvcjogIzVhNWE1YTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/auth/auth0/auth/auth.page.ts":
/*!**********************************************!*\
  !*** ./src/app/auth/auth0/auth/auth.page.ts ***!
  \**********************************************/
/*! exports provided: AuthPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthPage", function() { return AuthPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var src_app_pages_terms_conditions_terms_conditions_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/pages/terms-conditions/terms-conditions.page */ "./src/app/pages/terms-conditions/terms-conditions.page.ts");
/* harmony import */ var src_app_provider_auth_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/provider/auth/authentication.service */ "./src/app/provider/auth/authentication.service.ts");
/* harmony import */ var src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/provider/common-api/common-api.service */ "./src/app/provider/common-api/common-api.service.ts");
/* harmony import */ var src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/provider/common-file/logfile.service */ "./src/app/provider/common-file/logfile.service.ts");
/* harmony import */ var _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/diagnostic/ngx */ "./node_modules/@ionic-native/diagnostic/ngx/index.js");









let AuthPage = class AuthPage {
    constructor(router, authenticationService, menuCtrl, commonAPIService, modalController, diagnostic, logService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.menuCtrl = menuCtrl;
        this.commonAPIService = commonAPIService;
        this.modalController = modalController;
        this.diagnostic = diagnostic;
        this.logService = logService;
    }
    ngOnInit() { }
    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }
    onClick() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logInfo('AuthPage', 'onClick_SignIn()', 'isNetworkConnected?: ' + this.commonAPIService.networkStatus.connected);
            if (this.commonAPIService.networkStatus.connected) {
                this.checkIfTermsAndConditionAccepted();
            }
            else {
                // tslint:disable-next-line:max-line-length
                this.commonAPIService.presentToast('Ally requires cellular data to be enabled. Please enable the cellular data to access the Ally app.');
                this.logService.logDebug('AuthPage', 'onClick_SignIn()', 'Ally requires cellular data to be enabled. Please enable the cellular data to access the Ally app.');
            }
        });
    }
    checkIfTermsAndConditionAccepted() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.commonAPIService.getStorageValue('isTermsAndCondAccepted').then(res => {
                if (res) {
                    this.openOAuthPage();
                }
                else {
                    this.logService.logError('AuthPage', 'checkIfTermsAndConditionAccepted', 'Terms & Condition are not accepted!');
                    this.showTermsConditionModal();
                }
                this.logService.logInfo('AuthPage', 'checkIfTermsAndConditionAccepted', 'isTermsAndCondAccepted: ' + res);
            });
        });
    }
    openOAuthPage() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            yield this.authenticationService.isAuth0Authenticated();
            this.logService.logInfo('AuthPage', 'openOAuthPage()', 'this.authenticationService.isUserAuthenticated :' + this.authenticationService.isUserAuthenticated);
            if (this.authenticationService.isUserAuthenticated) {
                this.authenticationService.setToken();
            }
            else {
                yield this.authenticationService.login();
            }
        });
    }
    showTermsConditionModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.logService.logInfo('AuthPage', 'showTermsConditionModal()', 'Displaying terms and conditions');
            const modal = yield this.modalController.create({
                component: src_app_pages_terms_conditions_terms_conditions_page__WEBPACK_IMPORTED_MODULE_4__["TermsConditionsPage"],
                cssClass: '',
                backdropDismiss: false
            }).then(res => {
                res.present();
                res.onDidDismiss().then(dis => {
                    console.log('showTermsConditionModal closed!' + dis);
                    console.log(dis);
                    console.log(dis.data.dismissed);
                    if (dis.data.dismissed) {
                        this.openOAuthPage();
                    }
                });
            });
            // modal.present();
        });
    }
};
AuthPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: src_app_provider_auth_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"] },
    { type: src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_6__["CommonAPIService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_8__["Diagnostic"] },
    { type: src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_7__["LogfileService"] }
];
AuthPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-auth',
        template: __webpack_require__(/*! raw-loader!./auth.page.html */ "./node_modules/raw-loader/index.js!./src/app/auth/auth0/auth/auth.page.html"),
        styles: [__webpack_require__(/*! ./auth.page.scss */ "./src/app/auth/auth0/auth/auth.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        src_app_provider_auth_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"],
        src_app_provider_common_api_common_api_service__WEBPACK_IMPORTED_MODULE_6__["CommonAPIService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
        _ionic_native_diagnostic_ngx__WEBPACK_IMPORTED_MODULE_8__["Diagnostic"],
        src_app_provider_common_file_logfile_service__WEBPACK_IMPORTED_MODULE_7__["LogfileService"]])
], AuthPage);



/***/ })

}]);
//# sourceMappingURL=auth-auth0-auth-auth-module-es2015.js.map