cordova.define("@ionic-enterprise/auth.IonicHttp", function(require, exports, module) { 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var global_configs_1 = require("./global-configs");
var http = /** @class */ (function () {
    function http() {
    }
    http.sendRequest = function (url, options, success, failure) {
        helpers_1.helpers.handleMissingCallbacks(success, failure);
        options = helpers_1.helpers.handleMissingOptions(options, global_configs_1.globalConfigs);
        var headers = helpers_1.helpers.getMergedHeaders(url, options.headers, global_configs_1.globalConfigs.headers);
        switch (options.method) {
            case 'post':
            case 'put':
            case 'patch':
                var data = helpers_1.helpers.getProcessedData(options.data, options.serializer);
                return cordova.exec(success, failure, 'IonicHttp', options.method, [url, data, options.serializer, headers, options.timeout, options.followRedirect, options.responseType]);
            default:
                return cordova.exec(success, failure, 'IonicHttp', options.method, [url, headers, options.timeout, options.followRedirect, options.responseType]);
        }
    };
    http.post = function (url, data, headers, success, failure) {
        return http.sendRequest(url, { method: 'post', data: data, headers: headers }, success, failure);
    };
    ;
    http.get = function (url, success, failure) {
        return http.sendRequest(url, { method: 'get', params: {}, headers: {} }, success, failure);
    };
    ;
    http.put = function (url, data, headers, success, failure) {
        return http.sendRequest(url, { method: 'put', data: data, headers: headers }, success, failure);
    };
    http.patch = function (url, data, headers, success, failure) {
        return http.sendRequest(url, { method: 'patch', data: data, headers: headers }, success, failure);
    };
    http.del = function (url, params, headers, success, failure) {
        return http.sendRequest(url, { method: 'delete', params: params, headers: headers }, success, failure);
    };
    http.head = function (url, params, headers, success, failure) {
        return http.sendRequest(url, { method: 'head', params: params, headers: headers }, success, failure);
    };
    return http;
}());
exports.http = http;
});