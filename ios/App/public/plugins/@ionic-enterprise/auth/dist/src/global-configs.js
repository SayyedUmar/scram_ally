cordova.define("@ionic-enterprise/auth.global-configs", function(require, exports, module) { 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globalConfigs = /** @class */ (function () {
    function globalConfigs() {
    }
    globalConfigs.headers = {};
    globalConfigs.serializer = 'urlencoded';
    globalConfigs.followRedirect = true;
    globalConfigs.timeout = 60.0;
    return globalConfigs;
}());
exports.globalConfigs = globalConfigs;
;
});