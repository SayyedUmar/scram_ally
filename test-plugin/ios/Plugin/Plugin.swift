import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(TestPlugin)
public class TestPlugin: CAPPlugin {

    
    @objc func sendMessage(_ call: CAPPluginCall) {
        guard let msg = call.getString("message") else {return}
        print("sendMessage ", msg)
        switch msg {
        case "email_logs":
            NotificationCenter.default.post(
                name: NSNotification.Name.init("emailLogFile"),
                object: self,
                userInfo: [:])
            break
        default:
            print("sendMessage default", msg)
        }
        call.success([
            "image": "test"
        ])
    }
    
    @objc func customCall(_ call: CAPPluginCall) {
        UserDefaults.standard.set(true, forKey: "shallMonitorLocation")
        //ApplicationConstants.IsServiceStop = false;
        startBackgroundLocation(victimId: call.getString("victimId"))
        
        call.resolve()
        SwiftEventBus.onMainThread(self, name: "onHandleError") { result in
            guard let result = result, let userInfo = result.userInfo as? [String : Any] else {return}
            print("onHandleError", userInfo)
            self.notifyListeners("stopServiceMesssage", data: userInfo)
        }
        
        //        SwiftEventBus.onMainThread(self, name: "onViewWillAppear") { result in
        //            guard let result = result, let userInfo = result.userInfo as? [String : Any] else {return}
        //            print("onViewWillAppear", userInfo)
        //            self.notifyListeners("onViewWillAppear", data: userInfo)
        //        }
        //        SwiftEventBus.onMainThread(self, name: "onViewDidAppear") { result in
        //            guard let result = result, let userInfo = result.userInfo as? [String : Any] else {return}
        //            print("onViewDidAppear", userInfo)
        //            self.notifyListeners("onViewDidAppear", data: userInfo)
        //        }
    }
    
    func startBackgroundLocation (victimId:String?) {
        guard let victimId = victimId,
            let deviceId = UserDefaults.standard.value(forKey: "deviceImei") as? String
            else {return}
        NotificationCenter.default.post(
            name: NSNotification.Name.init("onStartMonitoringLocation"),
            object: self,
            userInfo: ["shallMonitorLocation":true, "victimId": victimId,
                       "deviceId": deviceId])
    }
    
    @objc func customStopService(_ call: CAPPluginCall) {
        // stopBackgroundLocationService();
        UserDefaults.standard.set(false, forKey: "shallMonitorLocation")
        NotificationCenter.default.post(
            name: NSNotification.Name.init("onStopMonitoringLocation"),
            object: self,
            userInfo: ["shallMonitorLocation":false])
        call.resolve()
    }
    
    @objc func sendTokenToApp(_ call: CAPPluginCall) {
        if let token = call.getString("token") {
            UserDefaults.standard.set(token, forKey: "token")
            print("sendTokenToApp", token)
        }
        call.resolve()
    }
    
    @objc func sendDeviceIMEItoApp(_ call: CAPPluginCall) {
        if let token = call.getString("deviceImei") {
            UserDefaults.standard.set(token, forKey: "deviceImei")
            print("sendDeviceIMEItoApp", token)
        }
        call.resolve()
        printLogs(call: call)
    }
    
    @objc func LogInfo(_ call: CAPPluginCall) {
        printLogs(call: call)
    }
    
    @objc func LogError(_ call: CAPPluginCall) {
        printLogs(call: call)
    }
    
    @objc func LogDebug(_ call: CAPPluginCall) {
        printLogs(call: call)
    }
    
    @objc func LogWarning(_ call: CAPPluginCall) {
        printLogs(call: call)
    }
    
    @objc func appendLog(_ call: CAPPluginCall) {
        printLogs(call: call)
    }
    
    func printLogs (call: CAPPluginCall) {
        if let tag = call.getString("TAG"), let message = call.getString("message") {
            print(tag, message)
        }
        call.resolve()
    }
    
    @objc func sendVictimDetailsToApp (_ call: CAPPluginCall) {
        let victimDetails = call.getObject("victimDetails")
        print("sendVictimDetailsToApp", victimDetails)
        call.resolve()
    }
    
    @objc func IsMobileDataEnabled (_ call: CAPPluginCall) {
        call.success(["IsMobileDataEnabled":true])
    }
    
    @objc func sendPanicButtonNumberToApp (_ call: CAPPluginCall) {
        guard let panicBtnNumber = call.getString("panicBtnNumber"),
            let deviceUDID = call.getString("deviceUDID"),
            let victimDetailsPanic = call.getObject("victimDetailsPanic")
            else {return}
        NotificationCenter.default.post(
            name: NSNotification.Name.init("sendPanicAlertToServer"),
            object: self,
            userInfo: ["panicBtnNumber":panicBtnNumber,"deviceUDID":deviceUDID,"victimDetailsPanic":victimDetailsPanic])
        call.success(["sendPanicButtonNumberToApp":true])
    }
    
    
    
    //customCall
    //customStopService
    //sendTokenToApp
    //getPermissions -
    //sendDeviceIMEItoApp
    //sendVictimDetailsToApp -
    //sendPanicButtonNumberToApp -
    //isNotificationsEnabledForMyApp -
    //startBackgroundLocationService - not plugin method
    //stopBackgroundLocationService - not plugin method
    //requestAndroidNativePermission - not plugin method
    //isMyServiceRunning - not plugin method
    //setupGpsTrackerServiceEventReceiver - not plugin method
    
    //LogInfo
    //LogError
    //LogWarning
    //LogDebug
    //appendLog
    //IsMobileDataEnabled -
}

