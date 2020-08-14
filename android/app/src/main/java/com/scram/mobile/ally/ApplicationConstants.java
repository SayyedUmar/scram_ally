package com.scram.mobile.ally;

import android.content.Context;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;
import com.getcapacitor.BridgeActivity;

public class ApplicationConstants {
    public static final String ACTION_RESTART_SERVICE = "restart_service";
    public static final String ACTION_SERVICE_TRACKER_EVENT = "service.event.broadcast";
    public static final String ACTION_SERVICE_API_FAILED_EVENT = "service.event.apiFailed";
    public static final String ACTION_SERVICE_STOP_EVENT = "service.event.stopService";
    public static final String ACTION_LOCATION_PERMISSION_FAILED_EVENT = "service.event.locationPermissionFailed";

    public static final String ACTION_LOCATION_PERMISSION_STATUS_RESULT = "service.event.locationPermissionStatusResult";
    // URLS Stage
    public static String BASE_URL = "https://allymobileapigateway.scramstage.com/api/v1/";
    // URL Test
    //  public static String BASE_URL = "https://allymobileapigateway.scramtest.com/api/v1/";

    // URLs Production
   // public static String BASE_URL = "https://allymobileapigateway.scramnetwork.com/api/v1/";
//    public static String URL_SEND_LOCATION = "Location";
//    public static String URL_DEVICE_EVENTS = "MobileDevice/DeviceEvents";

    public static String URL_SEND_LOCATION = "NativeMobile/Location";
    public static String URL_DEVICE_EVENTS = "NativeMobile/DeviceEvents";

    // Minimum distance to change Updates in meters
    public static final long MIN_DISTANCE_CHANGE_FOR_UPDATES = 1; // 10 meters
    // Minimum time between updates in milliseconds
    public static final long MIN_TIME_BW_UPDATES = 1000 * 60 * 1; // 1 minute

    // DateTime format
    public static final String YYYY_MM_DD_T_HH_MM_SS_SSS_Z = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

    public static final int REQUEST_CODE_PERMISSION = 2;

    // Excel
    public static final String EXCEL_SHEET_NAME = "locationCoordinates.xlsx";
    public static final String SHEET_LOCATION_COORDINATES = "location_coordinates";
    public static final String SHEET_LOCATION_DEVICE_EVENTS = "location_device_events";

    // Location providers
    public static final String NETWORK = "Network";
    public static final String GPS = "GPS";
    public static Context CURRENT_CONTEXT ;
    public static String VICTIM_ID ;
    public static String DEVICE_IMEI ;

    public static BridgeActivity AppMainActivity;
    public static boolean IsServiceStop = false;
}