//
//  Service.swift
//  App
//
//  Created by Umar Sayyed on 21/08/20.
//

import Foundation
import UIKit
import CoreLocation
import Capacitor

extension AppDelegate {
    func callAPI (body: [[String: Any]]) {
        let d = body.toData
        let c = lastLocation.coordinate
        FileActions1().writeToFile("DeviceEvents location_status=\(getLocationSerStatus()), internet=\(Reachability.isConnectedToNetwork()) lat:\(c.latitude), lng: \(c.longitude), accuracy:\(lastLocation.horizontalAccuracy)")
        
        FileActions2().writeToFile("DeviceEvents location_status=\(getLocationSerStatus()), internet=\(Reachability.isConnectedToNetwork()) request=\(d!.toString)")
        
        let url = URL(string: "https://allymobileapigateway.scramstage.com/api/v1/NativeMobile/DeviceEvents")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = d
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            guard let httpURLResponse = response as? HTTPURLResponse, httpURLResponse.statusCode == 200,
                let d = data, error == nil
                else {
                    if let res = response as? HTTPURLResponse, let data = data {
                        self.handleError(data: data, code: res.statusCode)
                        print(data.toString)
                        FileActions1().writeToFile("DeviceEventsAPI Call Failed: statusCode:\(res.statusCode), error:\(data.toString)")
                        FileActions2().writeToFile("DeviceEventsAPI Call Failed: statusCode:\(res.statusCode), error:\(data.toString)")
                        self.sendDataToIonic(info: ["lat":c.latitude, "lng": c.longitude,
                                                    "statusCode": res.statusCode,
                                                    "response": data.toString,
                                                    "request": data.toString
                        ])
                    }
                    
                    return
            }
            FileActions1().writeToFile("DeviceEventsAPI Call Successful:statusCode:\(httpURLResponse.statusCode)")
            FileActions2().writeToFile("DeviceEventsAPI Call Successful:statusCode:\(httpURLResponse.statusCode)")
        }.resume()
    }
    func callServerAPI (location: CLLocation, place: CLPlacemark) {
        let c = location.coordinate
        let body = getPostData(location: location, address: place.getFullAddress()).toData
        print("body- \(getPostData(location: location, address: place.getFullAddress()))")
        
        #if targetEnvironment(simulator)
        print("device is simulator")
        return;
        #endif
        print("device is real")
        
        FileActions1().writeToFile("location_status=\(getLocationSerStatus()), internet=\(Reachability.isConnectedToNetwork()) lat:\(c.latitude), lng: \(c.longitude), accuracy:\(location.horizontalAccuracy)")
        
        FileActions2().writeToFile("location_status=\(getLocationSerStatus()), internet=\(Reachability.isConnectedToNetwork()) request=\(body!.toString)")
        
        let url = URL(string: "https://allymobileapigateway.scramstage.com/api/v1/NativeMobile/Location")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = body
        print("location- ", c.latitude, c.longitude)
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
       
        URLSession.shared.dataTask(with: request) { (data, response, error) in
            guard let httpURLResponse = response as? HTTPURLResponse, httpURLResponse.statusCode == 200,
                let d = data, error == nil
                else {
                    if let res = response as? HTTPURLResponse, let data = data {
                        self.handleError(data: data, code: res.statusCode)
                        FileActions1().writeToFile("API Call Failed: statusCode:\(res.statusCode), error:\(data.toString)")
                        FileActions2().writeToFile("API Call Failed: statusCode:\(res.statusCode), error:\(data.toString)")
                        self.sendDataToIonic(info: ["lat":c.latitude, "lng": c.longitude,
                                                    "statusCode": res.statusCode,
                                                    "response": data.toString,
                                                    "request": body!.toString
                        ])
                    }
                    
                    return
            }
            FileActions1().writeToFile("API Call Successful:statusCode:\(httpURLResponse.statusCode)")
            FileActions2().writeToFile("API Call Successful:statusCode:\(httpURLResponse.statusCode)")
            self.sendDataToIonic(info: ["lat":c.latitude, "lng": c.longitude, "statusCode": httpURLResponse.statusCode])
        }.resume()
        //        Alamofire.request("http://localhost:8004/testAPI",method: .get, parameters: [:], headers: [:])
               //            //         .validate(contentType: [contentType])
               //            .responseJSON { (response) in
               //
               ////                switch response.result {
               ////                case .success:
               ////                    break;
               ////                case .failure(let error):
               ////                    break;
               ////                }
               //                guard let statusCode = response.response?.statusCode else {return}
               //                if (statusCode == 200) {
               //                    print("API Call Successful", statusCode)
               //                    FileActions1().writeToFile("API Call Successful:statusCode:\(statusCode)")
               //                    FileActions2().writeToFile("API Call Successful:statusCode:\(statusCode)")
               //
               //                } else {
               //                    print("API Call Failed", statusCode)
               //                    if let value = response.data {
               //                        //let json = JSON(value)
               //                        FileActions1().writeToFile("API Call Failed: statusCode:\(statusCode), error:\(value.toString)")
               //                        FileActions2().writeToFile("API Call Failed: statusCode:\(statusCode), error:\(value.toString)")
               //                    } else {
               //                    }
               //                }
               //
               //        }
    }
    func getPostData (location: CLLocation, event: [String:Any], address: String) -> [[String: Any]] {
        var location = getPostData(location: location, address: address ,eventType:  event["event"] as! String)
        var body:[String: Any] = [:]
        body["victimId"] = event["victimId"] as! String
        body["eventType"] = event["eventType"] as! String
        body["event"] = event["event"] as! String
        body["eventData"] = event["eventData"] as! [[String:String]]
        body["timestamp"] = Date().toUTCString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        body["location"] = location[0]
        body[ "deviceImei"] = self.person.deviceId
        return [body]
    }
    func getPostData (location: CLLocation, address: String, eventType: String = "Location") -> [[String: Any]] {
        return [[
            "victimId": self.person.victimId,
            "deviceImei": self.person.deviceId,
            //            "victimId": "84C515A8-A00D-4E06-81B4-48592351C096",
            //            "deviceImei": "9233c89d05d89799",
            "timestamp": Date().toUTCString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
            "latitude": location.coordinate.latitude,
            "longitude": location.coordinate.longitude,
            "altitude": location.altitude,
            "accuracy": location.horizontalAccuracy,
            "altitudeAccuracy": location.verticalAccuracy,
            //"direction": direction == nil ? 0 : direction.magneticHeading,
            "direction": Double(String.init(format: "%.7f", location.course.magnitude))!,
            "speed": Double(String.init(format: "%.7f", location.speed.magnitude))!,
            "address": address,
            
            "eventType": eventType,
            "cacheTimeStamp": location.timestamp.toUTCString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
            "batteryLevel": Double(round(1000*UIDevice.current.batteryLevel*100)/1000),
            "isBatteryCharging": UIDevice.current.batteryState == .charging ? true : false,
            
            "activityType": getActivityType(),
            "activityConfidence": -1,
            "isMoving": false, //calculated based on activityType
            "fix": 0, //hardcoded
            "csq": 0, //hardcoded
            "satellite": 0,
            "locationMode": "A", //A-GPS, W-wifi
            
            ]]
    }
    
//    func getSatelliteCount (_ loc: CLLocation) -> Int{
//        var satellite = 4
//        if loc.verticalAccuracy < 60.0 {return 5}
//        else if loc.verticalAccuracy < 300.0 {return 3}
//        else if loc.verticalAccuracy < 500.0 {return 2}
//        else {return 1}
//    }
    
    func getActivityType () -> String {
        switch locationManager.activityType {
        case .airborne:
            return "airborne"
        case .automotiveNavigation:
            return "automotiveNavigation"
        case .fitness:
            return "fitness"
        case .other:
            return "other"
        case .otherNavigation:
            return "otherNavigation"
        default:
            return "unknown"
        }
    }
    
    func handleError(data: Data, code: Int) {
        if code == 401 || code == 403 || code == 412 {
            let str = data.toString.replacingOccurrences(of: "[]", with: " ")
            DispatchQueue.global().async {
                SwiftEventBus.post("onHandleError", sender: ["data": str])
            }
        }
    }
}

extension CLLocation {
    func geocode(completion: @escaping (_ placemark: [CLPlacemark]?, _ error: Error?) -> Void)  {
        CLGeocoder().reverseGeocodeLocation(self, completionHandler: completion)
    }
   
}

extension CLPlacemark {
    func getFullAddress() -> String {
           var add = ""
           if let p = self.name {
               add += p + ", "
           }
           if let p = self.name {
               add += p + ", "
           }
           if let p = self.subLocality {
               add += p + ", "
           }
           if let p = self.locality {
               add += p + ", "
           }
           if let p = self.subAdministrativeArea {
               add += p + ", "
           }
           if let p = self.administrativeArea {
               add += p + ", "
           }
           if let p = self.country {
               add += p + ", "
           }
           if let p = self.postalCode {
               add += p
           }
           return add
       }
}
