cordova.define("@ionic-enterprise/auth.helpers", function(require, exports, module) { 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var messages_1 = require("./messages");
var js_util_1 = require("./js-util");
var helpers = /** @class */ (function () {
    function helpers() {
    }
    helpers.mergeHeaders = function (globalHeaders, localHeaders) {
        var globalKeys = Object.keys(globalHeaders);
        var key;
        for (var i = 0; i < globalKeys.length; i++) {
            key = globalKeys[i];
            if (!localHeaders.hasOwnProperty(key)) {
                localHeaders[key] = globalHeaders[key];
            }
        }
        return localHeaders;
    };
    helpers.checkForValidStringValue = function (list, value, onInvalidValueMessage) {
        if (js_util_1.jsUtil.getTypeOf(value) !== 'String') {
            throw new Error(onInvalidValueMessage + ' ' + list.join(', '));
        }
        value = value.trim().toLowerCase();
        if (list.indexOf(value) === -1) {
            throw new Error(onInvalidValueMessage + ' ' + list.join(', '));
        }
        return value;
    };
    helpers.checkKeyValuePairObject = function (obj, allowedChildren, onInvalidValueMessage) {
        if (js_util_1.jsUtil.getTypeOf(obj) !== 'Object') {
            throw new Error(onInvalidValueMessage);
        }
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            if (allowedChildren.indexOf(js_util_1.jsUtil.getTypeOf(obj[keys[i]])) === -1) {
                throw new Error(onInvalidValueMessage);
            }
        }
        return obj;
    };
    helpers.checkHttpMethod = function (method) {
        return this.checkForValidStringValue(this.validHttpMethods, method, messages_1.messages.INVALID_HTTP_METHOD);
    };
    helpers.checkResponseType = function (type) {
        return this.checkForValidStringValue(this.validResponseTypes, type, messages_1.messages.INVALID_RESPONSE_TYPE);
    };
    helpers.checkSerializer = function (serializer) {
        return this.checkForValidStringValue(this.validSerializers, serializer, messages_1.messages.INVALID_DATA_SERIALIZER);
    };
    helpers.checkSSLCertMode = function (mode) {
        return this.checkForValidStringValue(this.validCertModes, mode, messages_1.messages.INVALID_SSL_CERT_MODE);
    };
    helpers.checkClientAuthMode = function (mode) {
        return this.checkForValidStringValue(this.validClientAuthModes, mode, messages_1.messages.INVALID_CLIENT_AUTH_MODE);
    };
    helpers.checkClientAuthOptions = function (mode, options) {
        options = options || {};
        // none
        if (mode === this.validClientAuthModes[0]) {
            return {
                alias: null,
                rawPkcs: null,
                pkcsPassword: ''
            };
        }
        if (js_util_1.jsUtil.getTypeOf(options) !== 'Object') {
            throw new Error(messages_1.messages.INVALID_CLIENT_AUTH_OPTIONS);
        }
        // systemstore
        if (mode === this.validClientAuthModes[1]) {
            if (js_util_1.jsUtil.getTypeOf(options.alias) !== 'String'
                && js_util_1.jsUtil.getTypeOf(options.alias) !== 'Undefined') {
                throw new Error(messages_1.messages.INVALID_CLIENT_AUTH_ALIAS);
            }
            return {
                alias: js_util_1.jsUtil.getTypeOf(options.alias) === 'Undefined' ? null : options.alias,
                rawPkcs: null,
                pkcsPassword: ''
            };
        }
        // buffer
        if (mode === this.validClientAuthModes[2]) {
            if (js_util_1.jsUtil.getTypeOf(options.rawPkcs) !== 'ArrayBuffer') {
                throw new Error(messages_1.messages.INVALID_CLIENT_AUTH_RAW_PKCS);
            }
            if (js_util_1.jsUtil.getTypeOf(options.pkcsPassword) !== 'String') {
                throw new Error(messages_1.messages.INVALID_CLIENT_AUTH_PKCS_PASSWORD);
            }
            return {
                alias: null,
                rawPkcs: options.rawPkcs,
                pkcsPassword: options.pkcsPassword
            };
        }
    };
    helpers.checkForBlacklistedHeaderKey = function (key) {
        if (key.toLowerCase() === 'cookie') {
            throw new Error(messages_1.messages.ADDING_COOKIES_NOT_SUPPORTED);
        }
        return key;
    };
    helpers.checkForInvalidHeaderValue = function (value) {
        if (js_util_1.jsUtil.getTypeOf(value) !== 'String') {
            throw new Error(messages_1.messages.INVALID_HEADERS_VALUE);
        }
        return value;
    };
    helpers.checkTimeoutValue = function (timeout) {
        if (js_util_1.jsUtil.getTypeOf(timeout) !== 'Number' || timeout < 0) {
            throw new Error(messages_1.messages.INVALID_TIMEOUT_VALUE);
        }
        return timeout;
    };
    helpers.checkFollowRedirectValue = function (follow) {
        if (js_util_1.jsUtil.getTypeOf(follow) !== 'Boolean') {
            throw new Error(messages_1.messages.INVALID_FOLLOW_REDIRECT_VALUE);
        }
        return follow;
    };
    helpers.checkHeadersObject = function (headers) {
        return this.checkKeyValuePairObject(headers, ['String'], messages_1.messages.INVALID_HEADERS_VALUE);
    };
    helpers.checkParamsObject = function (params) {
        return this.checkKeyValuePairObject(params, ['String', 'Array'], messages_1.messages.INVALID_PARAMS_VALUE);
    };
    helpers.getMatchingHostHeaders = function (url, headersList) {
        var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        var domain = matches && matches[1];
        return headersList[domain] || null;
    };
    helpers.getMergedHeaders = function (url, requestHeaders, predefinedHeaders) {
        var globalHeaders = predefinedHeaders['*'] || {};
        var hostHeaders = this.getMatchingHostHeaders(url, predefinedHeaders) || {};
        var mergedHeaders = this.mergeHeaders(globalHeaders, hostHeaders);
        mergedHeaders = this.mergeHeaders(mergedHeaders, requestHeaders);
        return mergedHeaders;
    };
    helpers.getAllowedDataTypes = function (dataSerializer) {
        switch (dataSerializer) {
            case 'utf8':
                return ['String'];
            case 'urlencoded':
                return ['Object'];
            default:
                return ['Array', 'Object'];
        }
    };
    helpers.getProcessedData = function (data, dataSerializer) {
        var currentDataType = js_util_1.jsUtil.getTypeOf(data);
        var allowedDataTypes = this.getAllowedDataTypes(dataSerializer);
        if (allowedDataTypes.indexOf(currentDataType) === -1) {
            throw new Error(messages_1.messages.DATA_TYPE_MISMATCH + ' ' + allowedDataTypes.join(', '));
        }
        if (dataSerializer === 'utf8') {
            data = { text: data };
        }
        return data;
    };
    helpers.handleMissingCallbacks = function (successFn, failFn) {
        if (successFn === undefined) {
            throw new Error(messages_1.messages.MANDATORY_SUCCESS);
        }
        if (failFn === undefined) {
            throw new Error(messages_1.messages.MANDATORY_FAIL);
        }
    };
    helpers.handleMissingOptions = function (options, globals) {
        options = options || {};
        return {
            method: this.checkHttpMethod(options.method || this.validHttpMethods[0]),
            responseType: this.checkResponseType(options.responseType || this.validResponseTypes[0]),
            serializer: this.checkSerializer(options.serializer || globals.serializer),
            timeout: this.checkTimeoutValue(options.timeout || globals.timeout),
            followRedirect: this.checkFollowRedirectValue(options.followRedirect || globals.followRedirect),
            headers: this.checkHeadersObject(options.headers || {}),
            params: this.checkParamsObject(options.params || {}),
            data: js_util_1.jsUtil.getTypeOf(options.data) === 'Undefined' ? null : options.data,
            filePath: options.filePath || '',
            name: options.name || ''
        };
    };
    helpers.validSerializers = ['urlencoded', 'json', 'utf8'];
    helpers.validCertModes = ['default', 'nocheck', 'pinned', 'legacy'];
    helpers.validClientAuthModes = ['none', 'systemstore', 'buffer'];
    helpers.validHttpMethods = ['get', 'put', 'post', 'patch', 'head', 'delete', 'upload', 'download'];
    helpers.validResponseTypes = ['text', 'arraybuffer', 'blob'];
    return helpers;
}());
exports.helpers = helpers;
});