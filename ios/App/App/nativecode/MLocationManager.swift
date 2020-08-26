//
//  MLocationManager.swift
//  App
//
//  Created by Umar on 30/07/20.
//

import Foundation
import CoreLocation
import UIKit
//import Alamofire
import SwiftyJSON

class MLocationManager: NSObject {
    

    
}


class Geotification {
    var identifier: String
    let cord: CLLocationCoordinate2D
    init (identifier: String, cord: CLLocationCoordinate2D) {
        self.identifier = identifier
        self.cord = cord
    }
}

extension AppDelegate {
    
    func getMinutesDifferenceFromTwoDates(start: Date, end: Date) -> Int {
        let diff = Int(end.timeIntervalSince1970 - start.timeIntervalSince1970)
        let hours = diff / 3600
        let minutes = (diff - hours * 3600) / 60
        return minutes
    }
    
    func requestPermission () {
        
        //self.locationManager.requestWhenInUseAuthorization()
        self.locationManager.requestAlwaysAuthorization()
        //locationManager.startUpdatingLocation()
        //self.locationManager.requestWhenInUseAuthorization()
    }
    
    func configureLocationManager() {
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.activityType = CLActivityType.fitness
        locationManager.distanceFilter = kCLDistanceFilterNone
        locationManager.allowsBackgroundLocationUpdates = true
        locationManager.pausesLocationUpdatesAutomatically = false
    }
    
    func startLocationUpdate(){
        if (!getLocationSerStatus().contains("AuthorizedAlways")) {
            requestPermission()
        }
//        locationManager.delegate = self
//        locationManager.desiredAccuracy = kCLLocationAccuracyBest
//        locationManager.activityType = CLActivityType.fitness
//        locationManager.distanceFilter = kCLDistanceFilterNone
//        locationManager.allowsBackgroundLocationUpdates = true
//        locationManager.pausesLocationUpdatesAutomatically = false
        
        locationManager.startUpdatingLocation()
        locationManager.startUpdatingHeading()
        
    }
    
    func sendPanicAlertToServer (info: [String: Any]) {
        if (self.person == nil || lastLocation == nil) {return}
        guard let panicBtnNumber = info["panicBtnNumber"] as? String
//            let deviceUDID = info["deviceUDID"] as? String,
//            let victimDetailsPanic = info["victimDetailsPanic"] as? String
            else {return}
        let event:[String : Any] = ["eventType":"Button Pressed", "event": "Panic Button Pressed",
                                    "eventData":[["name":"Dialed Number", "value":panicBtnNumber]], "victimId":self.person.victimId]
        lastLocation.geocode { (place, er) in
            guard let p = place, let first = p.first, er == nil else {print("geocode error", er?.localizedDescription); return}
            let body = self.getPostData(location: self.lastLocation, event:event, address: first.getFullAddress())
            print("sendPanicAlertToServer", body)
            self.callAPI(body: body)
        }
    }
    
    func callDummyApi (location: CLLocation?) {
//        let coord = location.coordinate
//        let url = URL(string: "https://jsonplaceholder.typicode.com/todos/1")!
        let url = URL(string: "http://localhost:8004/testAPI")!
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            guard let httpURLResponse = response as? HTTPURLResponse, httpURLResponse.statusCode == 200,
                let d = data, error == nil
                else {
                    print("error received", data!.toString)
                    return }
//            let dic = d.toJSON()
//            print("response received",data?.toJSON())
            //FileActions().writeToFile("\(dic?["title"]!) Lat -\(coord.latitude) | Long - \(coord.longitude)")

        }.resume()
        
//        Alamofire.request("http://localhost:8004/testAPI",method: .get, parameters: [:], headers: [:])
//            //         .validate(contentType: [contentType])
//            .responseJSON { (response) in
//                switch response.result {
//
//                case .success:
//                    print("success")
//                    break;
//
//                case .failure(let error):
//                    print("failure")
//                    break;
//                }
//                if let value = response.data {
//                    let json = JSON(value)
//                    print("Response: ", json)
//                    //FileActions2().writeToFile(value.toString)
//                } else {
//                }
//        }
    }
    
    func stopMonitoring(geotification: Geotification) {
        for region in locationManager.monitoredRegions {
            guard let circularRegion = region as? CLCircularRegion,
                circularRegion.identifier == geotification.identifier else { continue }
            print("stopRegionMonitoring: \(circularRegion.center.latitude) - \(circularRegion.center.longitude)")
            FileActions().writeToFile("stopRegionMonitoring: \(circularRegion.center.latitude) - \(circularRegion.center.longitude)")
            locationManager.stopMonitoring(for: circularRegion)
        }
    }
    
    func monitorRegionAtLocation (center: CLLocationCoordinate2D, identifier: String) {
        if CLLocationManager.isMonitoringAvailable(for: CLCircularRegion.self) {
            print("startRegionMonitoring: \(center.latitude) - \(center.longitude)")
            FileActions().writeToFile("startRegionMonitoring: \(center.latitude) - \(center.longitude)")
            let maxDistance = locationManager.maximumRegionMonitoringDistance
            let region = CLCircularRegion(center: center,
                                          radius: 100/*in meters*/, identifier: identifier)
            region.notifyOnEntry = true
            region.notifyOnExit = true
            locationManager.startMonitoring(for: region)
        }
    }
    
    func userExitedRegion (region: CLCircularRegion) {
        FileActions().writeToFile("region exited: \(region.center.latitude):\(region.center.longitude)")
        stopMonitoring(geotification: Geotification(identifier: region.identifier, cord: region.center))
        self.geotification = nil
        self.startLocationUpdate()
    }
    
    //MARK: Location service detection
    func getLocationSerStatus()-> String {
        if CLLocationManager.locationServicesEnabled() {
            switch CLLocationManager.authorizationStatus() {
                case .notDetermined, .restricted, .denied:
                    return "NotAuthorised"
                case .authorizedWhenInUse:
                    return "AuthorizedWhenInUse"
                case .authorizedAlways:
                    var locStatus = ""
                    if (UserDefaults.standard.value(forKey: "LocationService")) != nil {
                        locStatus = UserDefaults.standard.value(forKey: "LocationService") as! String
                    }
                    return "\(locStatus)AuthorizedAlways"
                @unknown default:
                    return "Unknown"
                }
            }
        else {
              return "Location services is not enabled"
        }
    }
    
    func checkBatteryAndInternetStatus () {
        if (Reachability.isConnectedToNetwork()){
            //No Communication
        } else {
            
        }
        let battery = Double(round(1000*UIDevice.current.batteryLevel*100)/1000)
        let isCharging = UIDevice.current.batteryState == UIDevice.BatteryState.charging
        let isBatteryLow = UserDefaults.standard.bool(forKey: "isBatteryLow")
        if (battery >= 40.0 && isBatteryLow) { //Battery Low Clear
            UserDefaults.standard.setValue(false, forKey: "isBatteryLow")
            sendBatteryEvents(isCharging, Int(battery), eventType: "Battery Low Clear")
        } else if (battery < 21 && !isBatteryLow) { // Battery Low Clear
            UserDefaults.standard.setValue(true, forKey: "isBatteryLow")
            sendBatteryEvents(isCharging, Int(battery), eventType: "Battery Low")
        }
    }
    
    func sendBatteryEvents (_ isCharging: Bool,_  battery: Int, eventType: String) {
        if (person == nil || lastLocation == nil) {return}
        let event:[String : Any] = ["eventType":eventType, "event": "Battery",
                                "eventData":[
        ["name":"BatteryStatus", "value":"\(battery)"],
        ["name":"ChargingStatus", "value":isCharging ? "0" : "4"]
        ], "victimId":self.person.victimId]
        lastLocation.geocode { (place, er) in
            guard let p = place, let first = p.first, er == nil else {print("geocode error", er?.localizedDescription); return}
            let body = self.getPostData(location: self.lastLocation, event:event, address: first.getFullAddress())
            print("sendBatteryEvents", body)
            self.callAPI(body: body)
        }
    }
    func sendDeviceEvents (eventType: String, eventName: String) {
        if (person == nil || lastLocation == nil) {return}
        let event:[String : Any] = ["eventType":eventType, "event": eventName,
                                    "eventData":[["":""]], "victimId":self.person.victimId]
       lastLocation.geocode { (place, er) in
            guard let p = place, let first = p.first, er == nil else {print("geocode error", er?.localizedDescription); return}
            let body = self.getPostData(location: self.lastLocation, event:event, address: first.getFullAddress())
            print("sendDeviceEvents", body)
            self.callAPI(body: body)
        }
    }
}

extension AppDelegate: CLLocationManagerDelegate {
    
    func locationManager(_ manager: CLLocationManager, didUpdateHeading newHeading: CLHeading) {
        direction = newHeading
        //print("direction = magneticHeading:\(direction.magneticHeading), trueHeading:\(direction.trueHeading))")
        //scheduleLocalNotification(title: "Ally", body: "New Directon: \(direction.trueHeading):\(direction.magneticHeading)", info: nil)
    }
    
    private func locationManager(manager: CLLocationManager!, didFailWithError error: NSError!) {
        //self.locationManager.stopUpdatingLocation()
        FileActions1().writeToFile("Error getting location : ")
        if (error != nil) {
            FileActions1().writeToFile(error.description)
            print(error.description)
        }
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
//        self.locationManager.stopUpdatingLocation()
//        let lastLocation = locations.last!
        lastLocation = locations.last
        if (lastLocation.coordinate.latitude == 0.0 || lastLocation.coordinate.longitude == 0.0 || lastLocation.horizontalAccuracy == 2500.0) {
            self.locationManager.stopUpdatingLocation()
            self.locationManager.startUpdatingLocation()
        }
        if var lastDate = UserDefaults.standard.value(forKey: "lastLocationTime") as? Date {
            let now = Date()
            lastDate.addTimeInterval(1 * 60) // in seconds
//            print("lastDate: \(lastDate.toString("dd MM yyyy HH:mm:ss"))")
            if lastDate < now {
                print("date is less than now")
                UserDefaults.standard.set(now, forKey: "lastLocationTime")
                updateLocation(manager, didUpdateLocations: locations)
                let lastLocation = locations.last!
                FileActions1().writeToFile("Location Manager : Service enabled - \(CLLocationManager.locationServicesEnabled()), Allows Bg update - \(self.locationManager.allowsBackgroundLocationUpdates), Bg Loc Indicator - \(self.locationManager.showsBackgroundLocationIndicator), Heading filter - \(self.locationManager.headingFilter), Heading Ori -\(self.locationManager.headingOrientation), Max reg Dist - \(self.locationManager.maximumRegionMonitoringDistance)")
                
                checkBatteryAndInternetStatus()
                lastLocation.geocode { (place, er) in
                    guard let p = place, let first = p.first, er == nil else {print("geocode error", er?.localizedDescription); return}
                    self.callServerAPI(location: lastLocation, place: first)
                }
            } else {
                print("date is greater than now, activityType", getActivityType())
            }
        }
        
        //locationManager.allowDeferredLocationUpdates(untilTraveled: 0, timeout: 5)
        

    }
    func updateLocation (_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let lastLocation = locations.last!
        if self.geotification == nil {
            self.geotification = Geotification(identifier: self.region_identifier, cord: lastLocation.coordinate)
            self.stopMonitoring(geotification: Geotification(identifier: self.region_identifier, cord: lastLocation.coordinate))
            self.monitorRegionAtLocation(center: lastLocation.coordinate, identifier: self.region_identifier)
            initialLocation = lastLocation
        }
        let distance = lastLocation.distance(from: initialLocation)
        let str = String(format: "%.1f%@", distance > 1000 ? distance/1000 : distance, distance > 1000 ? "km" : "m")
        print("didUpdateLocations- ", str)
        
        //        UIApplication.shared.applicationState == .active {
        //            manager.stopUpdatingLocation()
        //        }
        //        callDummyApi(location: locationObj)
    }
    func locationManager(_ manager: CLLocationManager, didEnterRegion region: CLRegion) {
        print("didEnterRegion")
    }
    func locationManager(_ manager: CLLocationManager, didExitRegion region: CLRegion) {
        print("didExitRegion")
        if let region = region as? CLCircularRegion {
            userExitedRegion(region: region)
            
//             triggerTaskAssociatedWithRegionIdentifier(regionID: identifier)
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didStartMonitoringFor region: CLRegion) {
        //print("didStartMonitoringFor")
        manager.requestState(for: region)
    }
    
    func locationManager(_ manager: CLLocationManager, didDetermineState state: CLRegionState, for region: CLRegion) {
        if state == CLRegionState.inside {
            print("state: inside")
        } else if state == CLRegionState.outside {
            print("state: outside")
            guard let circularRegion = region as? CLCircularRegion else { return }
            userExitedRegion(region: circularRegion)
//            FileActions().writeToFile("region exited: \(circularRegion.center.latitude):\(circularRegion.center.longitude)")
//            stopMonitoring(geotification: Geotification(identifier: region.identifier, cord: circularRegion.center))
        } else if state == CLRegionState.unknown{
            print("state: unknown")
        }
        
    }
    
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        
        switch status {
        case .notDetermined, .restricted, .denied:
            print(".notDetermined, .restricted, .denied")
            sendDeviceEvents(eventType: "Location Service", eventName: "Disabled")
            FileActions().writeToFile("Loc authorization status changed to Not accessible")
            break
        case .authorizedAlways:
            print("authorizedAlways")
            sendDeviceEvents(eventType: "Location Service", eventName: "Enabled")
            if (UserDefaults.standard.value(forKey: "LocationService") as? String) == nil {
                UserDefaults.standard.set("Provisional", forKey: "LocationService")
                FileActions().writeToFile("Loc authorization status changed to provisional Always")
            } else {
                UserDefaults.standard.set("Confirmed", forKey: "LocationService")
                FileActions().writeToFile("Loc authorization status changed to authorized Always")
            }
            break
        case .authorizedWhenInUse:
            print("authorizedWhenInUse")
            sendDeviceEvents(eventType: "Location Service", eventName: "Enabled")
            FileActions().writeToFile("Loc authorization status changed to authorized When In Use")
            break
        @unknown default:
            FileActions().writeToFile("Loc authorization status change error occured")
        }
        
    }
}



extension Data {
    func toJSON () -> [String: Any]?{
        do {
            return try JSONSerialization.jsonObject(with: self, options: []) as? [String: Any]
        } catch {
            print(error.localizedDescription)
        }
        return nil
    }
    var hexString: String {
        let hexString = map { String(format: "%02.2hhx", $0) }.joined()
        return hexString
    }
    
    var toString: String {
        return String(decoding: self, as: UTF8.self)
    }
    var toString1: String? {
        return String(data: self, encoding: .utf8)
    }
    
   
}

extension Dictionary {
    var toString: String? {
        guard let theJSONData = try? JSONSerialization.data(withJSONObject: self,
        options: [.prettyPrinted]) else { return nil }

        return String(data: theJSONData, encoding: .utf8)
    }
    var toData: Data? {
        guard let data = try? JSONSerialization.data(withJSONObject: self,
                    options: [.prettyPrinted]) else { return nil }

        return data
    }
}

extension Array {
    var toData: Data? {
//        return NSKeyedArchiver.archivedData(withRootObject: self)
        guard let data = try? JSONSerialization.data(withJSONObject: self) else { return nil }
        return data
    }
}
