cordova.define("@ionic-enterprise/auth.SecureWebView", function(require, exports, module) { 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SecureWebView = /** @class */ (function () {
    function SecureWebView() {
    }
    SecureWebView.prototype.isAvailable = function (callback) {
        var errorHandler = function errorHandler(error) {
            // An error has occurred while trying to access the
            // SecureWebView native implementation, most likely because
            // we are on an unsupported platform.
            callback(false);
        };
        cordova.exec(callback, errorHandler, "SecureWebView", "isAvailable", []);
    };
    // options:
    //  url - url to display
    //  webView - for iOS which webview to display, if possible. By default we use the newest one available for OS version
    //      - ASWebAuth - ASWebAuthenticationSession (avaialble starting in iOS 12)
    //      - SFAuth - SFAuthenticationSession (available starting in iOS 11)
    //      - SFSafari - SFSafariViewController (available starting in iOS 9)
    //      - MobileSafari - Mobile Safari (pre-iOS 8)
    SecureWebView.prototype.show = function (options, onSuccess, onError) {
        options = options || {};
        if (!options.hasOwnProperty('animated')) {
            options.animated = true;
        }
        cordova.exec(onSuccess, onError, "SecureWebView", "show", [options]);
    };
    SecureWebView.prototype.hide = function (onSuccess, onError) {
        cordova.exec(onSuccess, onError, "SecureWebView", "hide", []);
    };
    SecureWebView.prototype.getViewHandlerPackages = function (onSuccess, onError) {
        cordova.exec(onSuccess, onError, "SecureWebView", "getViewHandlerPackages", []);
    };
    SecureWebView.prototype.useCustomTabsImplementation = function (packageName, onSuccess, onError) {
        cordova.exec(onSuccess, onError, "SecureWebView", "useCustomTabsImplementation", [packageName]);
    };
    SecureWebView.prototype.connectToService = function (onSuccess, onError) {
        cordova.exec(onSuccess, onError, "SecureWebView", "connectToService", []);
    };
    SecureWebView.prototype.warmUp = function (onSuccess, onError) {
        cordova.exec(onSuccess, onError, "SecureWebView", "warmUp", []);
    };
    SecureWebView.prototype.mayLaunchUrl = function (url, onSuccess, onError) {
        cordova.exec(onSuccess, onError, "SecureWebView", "mayLaunchUrl", [url]);
    };
    return SecureWebView;
}());
exports.SecureWebView = SecureWebView;
exports.IonicSecureWebView = new SecureWebView();
});