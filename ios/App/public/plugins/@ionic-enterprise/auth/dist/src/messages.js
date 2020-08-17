cordova.define("@ionic-enterprise/auth.messages", function(require, exports, module) { 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var messages = /** @class */ (function () {
    function messages() {
    }
    messages.ADDING_COOKIES_NOT_SUPPORTED = 'auth-connect: string = "setHeader" does not support adding cookies, please use "setCookie" function instead';
    messages.DATA_TYPE_MISMATCH = 'auth-connect: string = "data" argument supports only following data types:';
    messages.INVALID_CLIENT_AUTH_ALIAS = 'auth-connect: string = invalid client certificate alias, needs to be a string or undefined';
    messages.INVALID_CLIENT_AUTH_MODE = 'auth-connect: string = invalid client certificate authentication mode, supported modes are:';
    messages.INVALID_CLIENT_AUTH_OPTIONS = 'auth-connect: string = invalid client certificate authentication options, needs to be an object';
    messages.INVALID_CLIENT_AUTH_PKCS_PASSWORD = 'auth-connect: string = invalid PKCS12 container password, needs to be a string';
    messages.INVALID_CLIENT_AUTH_RAW_PKCS = 'auth-connect: string = invalid PKCS12 container, needs to be an array buffer';
    messages.INVALID_DATA_SERIALIZER = 'auth-connect: string = invalid serializer, supported serializers are:';
    messages.INVALID_FOLLOW_REDIRECT_VALUE = 'auth-connect: string = invalid follow redirect value, needs to be a boolean value';
    messages.INVALID_HEADERS_VALUE = 'auth-connect: string = header values must be strings';
    messages.INVALID_HTTP_METHOD = 'auth-connect: string = invalid HTTP method, supported methods are:';
    messages.INVALID_PARAMS_VALUE = 'auth-connect: string = invalid params object, needs to be an object with strings';
    messages.INVALID_RESPONSE_TYPE = 'auth-connect: string = invalid response type, supported types are:';
    messages.INVALID_SSL_CERT_MODE = 'auth-connect: string = invalid SSL cert mode, supported modes are:';
    messages.INVALID_TIMEOUT_VALUE = 'auth-connect: string = invalid timeout value, needs to be a positive numeric value';
    messages.MANDATORY_FAIL = 'auth-connect: string = missing mandatory "onFail" callback function';
    messages.MANDATORY_SUCCESS = 'auth-connect: string = missing mandatory "onSuccess" callback function';
    return messages;
}());
exports.messages = messages;
;
});