
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "mx.ferreyra.callnumber.CallNumber",
          "file": "plugins/mx.ferreyra.callnumber/www/CallNumber.js",
          "pluginId": "mx.ferreyra.callnumber",
        "clobbers": [
          "call"
        ]
        },
      {
          "id": "cordova-plugin-network-information.Connection",
          "file": "plugins/cordova-plugin-network-information/www/Connection.js",
          "pluginId": "cordova-plugin-network-information",
        "clobbers": [
          "Connection"
        ]
        },
      {
          "id": "cordova-plugin-geolocation.Coordinates",
          "file": "plugins/cordova-plugin-geolocation/www/Coordinates.js",
          "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
          "Coordinates"
        ]
        },
      {
          "id": "cordova-plugin-app-version.AppVersionPlugin",
          "file": "plugins/cordova-plugin-app-version/www/AppVersionPlugin.js",
          "pluginId": "cordova-plugin-app-version",
        "clobbers": [
          "cordova.getAppVersion"
        ]
        },
      {
          "id": "cordova-plugin-advanced-http.http",
          "file": "plugins/cordova-plugin-advanced-http/www/advanced-http.js",
          "pluginId": "cordova-plugin-advanced-http",
        "clobbers": [
          "cordova.plugin.http"
        ]
        },
      {
          "id": "cordova-plugin-device-name.DeviceName",
          "file": "plugins/cordova-plugin-device-name/www/device-name.js",
          "pluginId": "cordova-plugin-device-name",
        "clobbers": [
          "cordova.plugins.deviceName"
        ]
        },
      {
          "id": "cordova-plugin-request-location-accuracy.RequestLocationAccuracy",
          "file": "plugins/cordova-plugin-request-location-accuracy/www/ios/RequestLocationAccuracy.js",
          "pluginId": "cordova-plugin-request-location-accuracy",
        "clobbers": [
          "cordova.plugins.locationAccuracy"
        ]
        },
      {
          "id": "cordova-plugin-badge.Badge",
          "file": "plugins/cordova-plugin-badge/www/badge.js",
          "pluginId": "cordova-plugin-badge",
        "clobbers": [
          "cordova.plugins.notification.badge"
        ]
        },
      {
          "id": "cordova-plugin-android-permissions.Permissions",
          "file": "plugins/cordova-plugin-android-permissions/www/permissions-dummy.js",
          "pluginId": "cordova-plugin-android-permissions",
        "clobbers": [
          "cordova.plugins.permissions"
        ]
        },
      {
          "id": "cordova-open-native-settings.Settings",
          "file": "plugins/cordova-open-native-settings/www/settings.js",
          "pluginId": "cordova-open-native-settings",
        "clobbers": [
          "cordova.plugins.settings"
        ]
        },
      {
          "id": "cordova-plugin-device.device",
          "file": "plugins/cordova-plugin-device/www/device.js",
          "pluginId": "cordova-plugin-device",
        "clobbers": [
          "device"
        ]
        },
      {
          "id": "@ionic-enterprise/auth.IonicHttp",
          "file": "plugins/@ionic-enterprise/auth/dist/src/http.js",
          "pluginId": "@ionic-enterprise/auth",
        "clobbers": [
          "ionic.http"
        ],
        "runs": true
        },
      {
          "id": "@ionic-enterprise/auth.SecureWebView",
          "file": "plugins/@ionic-enterprise/auth/dist/src/SecureWebView.js",
          "pluginId": "@ionic-enterprise/auth",
        "clobbers": [
          "IonicAuth"
        ],
        "runs": true
        },
      {
          "id": "cordova-plugin-nativegeocoder.NativeGeocoder",
          "file": "plugins/cordova-plugin-nativegeocoder/www/NativeGeocoder.js",
          "pluginId": "cordova-plugin-nativegeocoder",
        "clobbers": [
          "nativegeocoder"
        ]
        },
      {
          "id": "cordova-plugin-battery-status.battery",
          "file": "plugins/cordova-plugin-battery-status/www/battery.js",
          "pluginId": "cordova-plugin-battery-status",
        "clobbers": [
          "navigator.battery"
        ]
        },
      {
          "id": "cordova-plugin-geolocation.geolocation",
          "file": "plugins/cordova-plugin-geolocation/www/geolocation.js",
          "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
          "navigator.geolocation"
        ]
        },
      {
          "id": "cordova-plugin-network-information.network",
          "file": "plugins/cordova-plugin-network-information/www/network.js",
          "pluginId": "cordova-plugin-network-information",
        "clobbers": [
          "navigator.connection",
          "navigator.network.connection"
        ]
        },
      {
          "id": "cordova-plugin-background-mode.BackgroundMode",
          "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
          "pluginId": "cordova-plugin-background-mode",
        "clobbers": [
          "cordova.plugins.backgroundMode",
          "plugin.backgroundMode"
        ]
        },
      {
          "id": "cordova-plugin-geolocation.Position",
          "file": "plugins/cordova-plugin-geolocation/www/Position.js",
          "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
          "Position"
        ]
        },
      {
          "id": "cordova-plugin-geolocation.PositionError",
          "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
          "pluginId": "cordova-plugin-geolocation",
        "clobbers": [
          "PositionError"
        ]
        },
      {
          "id": "cordova-sqlite-storage.SQLitePlugin",
          "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
          "pluginId": "cordova-sqlite-storage",
        "clobbers": [
          "SQLitePlugin"
        ]
        },
      {
          "id": "cordova-plugin-background-fetch.BackgroundFetch",
          "file": "plugins/cordova-plugin-background-fetch/www/BackgroundFetch.js",
          "pluginId": "cordova-plugin-background-fetch",
        "clobbers": [
          "window.BackgroundFetch"
        ]
        },
      {
          "id": "cordova-plugin-file.DirectoryEntry",
          "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.DirectoryEntry"
        ]
        },
      {
          "id": "cordova-plugin-file.DirectoryReader",
          "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.DirectoryReader"
        ]
        },
      {
          "id": "cordova-plugin-file.Entry",
          "file": "plugins/cordova-plugin-file/www/Entry.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.Entry"
        ]
        },
      {
          "id": "cordova-plugin-file.File",
          "file": "plugins/cordova-plugin-file/www/File.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.File"
        ]
        },
      {
          "id": "cordova-plugin-file.FileEntry",
          "file": "plugins/cordova-plugin-file/www/FileEntry.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileEntry"
        ]
        },
      {
          "id": "cordova-plugin-file.FileError",
          "file": "plugins/cordova-plugin-file/www/FileError.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileError"
        ]
        },
      {
          "id": "cordova-plugin-file.FileReader",
          "file": "plugins/cordova-plugin-file/www/FileReader.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileReader"
        ]
        },
      {
          "id": "cordova-plugin-file.FileSystem",
          "file": "plugins/cordova-plugin-file/www/FileSystem.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileSystem"
        ]
        },
      {
          "id": "cordova-plugin-file.FileUploadOptions",
          "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileUploadOptions"
        ]
        },
      {
          "id": "cordova-plugin-file.FileUploadResult",
          "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileUploadResult"
        ]
        },
      {
          "id": "cordova-plugin-file.FileWriter",
          "file": "plugins/cordova-plugin-file/www/FileWriter.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.FileWriter"
        ]
        },
      {
          "id": "cordova-plugin-file.Flags",
          "file": "plugins/cordova-plugin-file/www/Flags.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.Flags"
        ]
        },
      {
          "id": "cordova-plugin-file.LocalFileSystem",
          "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.LocalFileSystem"
        ],
        "merges": [
          "window"
        ]
        },
      {
          "id": "cordova-plugin-file.Metadata",
          "file": "plugins/cordova-plugin-file/www/Metadata.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.Metadata"
        ]
        },
      {
          "id": "cordova-plugin-inappbrowser.inappbrowser",
          "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
          "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
          "cordova.InAppBrowser.open",
          "window.open"
        ]
        },
      {
          "id": "cordova-plugin-file.ProgressEvent",
          "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.ProgressEvent"
        ]
        },
      {
          "id": "cordova-plugin-file.requestFileSystem",
          "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
          "pluginId": "cordova-plugin-file",
        "clobbers": [
          "window.requestFileSystem"
        ]
        },
      {
          "id": "@ionic-enterprise/auth.helpers",
          "file": "plugins/@ionic-enterprise/auth/dist/src/helpers.js",
          "pluginId": "@ionic-enterprise/auth"
        },
      {
          "id": "@ionic-enterprise/auth.global-configs",
          "file": "plugins/@ionic-enterprise/auth/dist/src/global-configs.js",
          "pluginId": "@ionic-enterprise/auth"
        },
      {
          "id": "@ionic-enterprise/auth.js-util",
          "file": "plugins/@ionic-enterprise/auth/dist/src/js-util.js",
          "pluginId": "@ionic-enterprise/auth"
        },
      {
          "id": "@ionic-enterprise/auth.messages",
          "file": "plugins/@ionic-enterprise/auth/dist/src/messages.js",
          "pluginId": "@ionic-enterprise/auth"
        },
      {
          "id": "cordova-plugin-advanced-http.cookie-handler",
          "file": "plugins/cordova-plugin-advanced-http/www/cookie-handler.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.dependency-validator",
          "file": "plugins/cordova-plugin-advanced-http/www/dependency-validator.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.error-codes",
          "file": "plugins/cordova-plugin-advanced-http/www/error-codes.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.global-configs",
          "file": "plugins/cordova-plugin-advanced-http/www/global-configs.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.helpers",
          "file": "plugins/cordova-plugin-advanced-http/www/helpers.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.js-util",
          "file": "plugins/cordova-plugin-advanced-http/www/js-util.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.local-storage-store",
          "file": "plugins/cordova-plugin-advanced-http/www/local-storage-store.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.lodash",
          "file": "plugins/cordova-plugin-advanced-http/www/lodash.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.messages",
          "file": "plugins/cordova-plugin-advanced-http/www/messages.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.ponyfills",
          "file": "plugins/cordova-plugin-advanced-http/www/ponyfills.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.public-interface",
          "file": "plugins/cordova-plugin-advanced-http/www/public-interface.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.tough-cookie",
          "file": "plugins/cordova-plugin-advanced-http/www/umd-tough-cookie.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-advanced-http.url-util",
          "file": "plugins/cordova-plugin-advanced-http/www/url-util.js",
          "pluginId": "cordova-plugin-advanced-http"
        },
      {
          "id": "cordova-plugin-file.fileSystems",
          "file": "plugins/cordova-plugin-file/www/fileSystems.js",
          "pluginId": "cordova-plugin-file"
        },
      {
          "id": "cordova-plugin-file.isChrome",
          "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
          "pluginId": "cordova-plugin-file",
        "runs": true
        },
      {
          "id": "cordova-plugin-file.fileSystems-roots",
          "file": "plugins/cordova-plugin-file/www/fileSystems-roots.js",
          "pluginId": "cordova-plugin-file",
        "runs": true
        },
      {
          "id": "cordova-plugin-file.fileSystemPaths",
          "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
          "pluginId": "cordova-plugin-file",
        "merges": [
          "cordova"
        ],
        "runs": true
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Bluetooth",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.bluetooth.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.bluetooth"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Calendar",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.calendar.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.calendar"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Camera",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.camera.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.camera"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Contacts",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.contacts.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.contacts"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Location",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.location.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.location"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Microphone",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.microphone.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.microphone"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Motion",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.motion.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.motion"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Notifications",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.notifications.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.notifications"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Reminders",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.reminders.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.reminders"
        ]
        },
      {
          "id": "cordova.plugins.diagnostic.Diagnostic_Wifi",
          "file": "plugins/cordova.plugins.diagnostic/www/ios/diagnostic.wifi.js",
          "pluginId": "cordova.plugins.diagnostic",
        "merges": [
          "cordova.plugins.diagnostic.wifi"
        ]
        },
      {
          "id": "cordova-plugin-file.iosFileSystem",
          "file": "plugins/cordova-plugin-file/www/ios/FileSystem.js",
          "pluginId": "cordova-plugin-file",
        "merges": [
          "FileSystem"
        ]
        },
      {
          "id": "cordova-plugin-dialogs.notification",
          "file": "plugins/cordova-plugin-dialogs/www/notification.js",
          "pluginId": "cordova-plugin-dialogs",
        "merges": [
          "navigator.notification"
        ]
        },
      {
          "id": "cordova-plugin-file.resolveLocalFileSystemURI",
          "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
          "pluginId": "cordova-plugin-file",
        "merges": [
          "window"
        ]
        },
      {
          "id": "cordova-plugin-sim.Sim",
          "file": "plugins/cordova-plugin-sim/www/sim.js",
          "pluginId": "cordova-plugin-sim",
        "merges": [
          "window.plugins.sim"
        ]
        },
      {
          "id": "cordova-plugin-uniquedeviceid.UniqueDeviceID",
          "file": "plugins/cordova-plugin-uniquedeviceid/www/uniqueid.js",
          "pluginId": "cordova-plugin-uniquedeviceid",
        "merges": [
          "window.plugins.uniqueDeviceID"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "@ionic-enterprise/auth": "1.8.1",
      "mx.ferreyra.callnumber": "0.0.2",
      "cordova-open-native-settings": "1.5.2",
      "cordova-plugin-advanced-http": "2.3.1",
      "cordova-plugin-android-permissions": "1.0.2",
      "cordova-plugin-app-version": "0.1.9",
      "cordova-plugin-background-fetch": "5.6.1",
      "cordova-plugin-background-mode": "0.7.3",
      "cordova-plugin-badge": "0.8.8",
      "cordova-plugin-battery-status": "2.0.3",
      "cordova-plugin-device": "2.0.2",
      "cordova-plugin-device-name": "1.3.5",
      "cordova-plugin-dialogs": "2.0.2",
      "cordova-plugin-file": "6.0.2",
      "cordova-plugin-geolocation": "4.0.2",
      "cordova-plugin-inappbrowser": "3.2.0",
      "cordova-plugin-nativegeocoder": "3.2.2",
      "cordova-plugin-network-information": "2.0.2",
      "cordova-plugin-request-location-accuracy": "2.3.0",
      "cordova-plugin-sim": "1.3.3",
      "cordova-plugin-uniquedeviceid": "1.3.2",
      "cordova-sqlite-storage": "4.0.0",
      "cordova.plugins.diagnostic": "5.0.1"
    };
    // BOTTOM OF METADATA
    });
    