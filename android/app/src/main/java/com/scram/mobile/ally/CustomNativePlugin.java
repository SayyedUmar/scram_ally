package com.scram.mobile.ally;

import android.Manifest;
import android.app.Activity;
import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;

import androidx.appcompat.app.AlertDialog;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

import android.net.ConnectivityManager;
import android.net.Uri;
import android.provider.Settings;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;


import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.location.DetectedActivity;
import com.scram.mobile.ally.EasyPermissions.BaseRequestExecutor;
import com.scram.mobile.ally.EasyPermissions.EasyPermissions;
import com.scram.mobile.ally.EasyPermissions.RequestExecutor;
import com.scram.mobile.ally.EasyPermissions.bean.Permission;
import com.scram.mobile.ally.storage.AppCache;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static android.Manifest.permission.ACCESS_BACKGROUND_LOCATION;
import static android.Manifest.permission.ACCESS_COARSE_LOCATION;
import static android.Manifest.permission.ACCESS_FINE_LOCATION;

@NativePlugin()
public class CustomNativePlugin extends Plugin {
    private static String TAG = CustomNativePlugin.class.getSimpleName();
    public static final String ACTIVITY_TYPE = "activityType";
    public static final String CAPTURED_ACTIVITY_LIST = "CapturedActivityList";
    public static final String DETECTED_ACTIVITY = ".DETECTED_ACTIVITY";
    private static final String FENCE_RECEIVER_ACTION = "FENCE_RECEIVE";
    private static final String ON_FOOT_FENCE_ACTION = "ON_FOOT";
    private static final String STILL_FENCE_ACTION = "STILL";
    private static final String WALKING_FENCE_ACTION = "WALKING";
    private static final String RUNNING_FENCE_ACTION = "RUNNING";
    private static final String ON_BICYCLE_FENCE_ACTION = "ON_BICYCLE";
    private static final String IN_VEHICLE_FENCE_ACTION = "IN_VEHICLE";
    private static final String UNKNOWN_FENCE_ACTION = "UNKNOWN";
    private static final String TILTING_FENCE_ACTION = "TILTING";
    private Intent mServiceIntent;
    private String mPermissionFineLocation = ACCESS_FINE_LOCATION;
    private String mPermissionCoarseLocation = ACCESS_COARSE_LOCATION;
    private String mPermissionBackgroundLocation = ACCESS_BACKGROUND_LOCATION;
    private GPSTrackerService gpsTrackerService;
    private ServiceRestarterBroadcastReceiver serviceRestarterBroadcastReceiver;
    private Context mContext;
    private ArrayList<DetectedActivity> detectedActivities;
    private UserActivityRecognitionBroadcastReceiver userActivityRecognitionBroadcastReceiver;
    JSONArray jsonArray;

    @PluginMethod()
    public void customCall(PluginCall call) {
        //setupGpsTrackerServiceEventReceiver();
        Log.i(TAG, "customCall: ###### customCall occurred");
        ApplicationConstants.IsServiceStop = false;
        startBackgroundLocationService();
        call.success();
    }

    @PluginMethod()
    public void customStopService(PluginCall call) {
        // More code here...
        stopBackgroundLocationService();
        call.resolve();
    }

    @PluginMethod()
    public void sendTokenToApp(PluginCall call) {
        if (call != null && (call.getData() != null && !TextUtils.isEmpty(call.getData().getString("token")))) {
            AppCache appCache = ((App) getActivity().getApplication()).getSharedPreferences();
            appCache.setToken(call.getData().getString("token"));
        }
        Log.d("customCall Token: ", call.getData().toString());
        Log.d(TAG, call.getData().toString());
    }

    @PluginMethod()
    public void getPermissions(PluginCall call) {

        EasyPermissions
                .with(getActivity())
                .request(Manifest.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, Manifest.permission.CALL_PHONE, Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_BACKGROUND_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.ACTIVITY_RECOGNITION)
                .autoRetryWhenUserRefuse(true, new BaseRequestExecutor.RequestAgainListener() {
                    @Override
                    public void requestAgain(String[] needAndCanRequestAgainPermissions) {
                        for (String s : needAndCanRequestAgainPermissions) {
                            Log.e(TAG, "request again permission = " + s);
                        }
                    }
                })
                .result(new RequestExecutor.ResultReceiver() {
                    @Override
                    public void onPermissionsRequestResult(boolean grantAll, List<Permission> results) {

                        if (grantAll) {
                            //Toast.makeText(MainActivity.this, "request permissions success!", Toast.LENGTH_SHORT).show();
                            Log.e(TAG, "request permissions success!");
                        } else {
                            Toast.makeText(getActivity(), "Ally requires access to all permissions. \n Please allow access to all permissions.", Toast.LENGTH_SHORT).show();
                        }

                        String missingPermissions = "";
                        for (Permission p : results) {
                            if (!p.shouldShowRequestPermissionRationale && !p.granted) {
                                switch (p.name) {
                                    case "android.permission.CALL_PHONE":
                                        missingPermissions += "Permissions-->Phone-->Allow" + System.lineSeparator();
                                        break;
                                    case "android.permission.ACCESS_BACKGROUND_LOCATION":
                                        missingPermissions += "Permissions-->Location-->Allow Always" + System.lineSeparator();
                                        break;
                                    case "android.permission.ACTIVITY_RECOGNITION":
                                        missingPermissions += "Permissions-->Physical Activity-->Allow" + System.lineSeparator();
                                        break;
                                }
                                Log.e(TAG, "name=" + p.name + "   granted=" + p.granted + "   shouldShowRequestPermissionRationale=" + p.shouldShowRequestPermissionRationale);
                            }
                        }

                        if (!grantAll && missingPermissions != "") {
                            Log.e(TAG, "confirmationPermissionRedirection grantAll: " + grantAll + ", missingPermissions: " + missingPermissions);
                            String msg = "Ally requires access to all permissions." + System.lineSeparator() +
                                    System.lineSeparator() +
                                    "Go to settings and enable permissions" + System.lineSeparator() +
                                    missingPermissions;
                            AlertDialog alertDialog = new AlertDialog.Builder(getActivity())
                                    .setTitle("Ally")
                                    .setMessage(msg)
                                    .setCancelable(false)
                                    .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                                        @Override
                                        public void onClick(DialogInterface dialog, int which) {
                                            Intent intent = new Intent();
                                            intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                                            intent.setData(Uri.parse("package:" + getActivity().getPackageName()));
                                            //intent.setFlags(Intent.);
                                            startActivityForResult(call, intent, 1);
                                            dialog.cancel();
                                        }
                                    }).create();
                            alertDialog.show();
                            JSObject ret = new JSObject();
                            ret.put("state", grantAll ? "granted" : "denied");
                            call.resolve(ret);
                        }
                    }
                });


    }

    @PluginMethod()
    public void sendDeviceIMEItoApp(PluginCall call) {
        AppCache appCache = ((App) getActivity().getApplication()).getSharedPreferences();
        if (call != null && (call.getData() != null && !TextUtils.isEmpty(call.getData().getString("deviceImei")))) {
//            AppCache appCache = ((App) getActivity().getApplication()).getSharedPreferences();
            appCache.set_VICTIM_IMEI(call.getData().getString("deviceImei"));
        }
        Log.d("customCall DeviceIMEI: ", call.getData().toString());
        Log.d(TAG, call.getData().toString());

        String DeviceIMEI = appCache.get_VICTIM_IMEI();

        ApplicationConstants.DEVICE_IMEI = DeviceIMEI;
        Log.e(TAG, "sendDeviceIMEItoApp: : DeviceIMEI : " + DeviceIMEI);
    }

    @PluginMethod()
    public void sendVictimDetailsToApp(PluginCall call) {
        AppCache appCache = ((App) getActivity().getApplication()).getSharedPreferences();
        if (call != null && (call.getData() != null && !TextUtils.isEmpty(call.getData().getString("victimDetails")))) {
            // AppCache appCache = ((App) getActivity().getApplication()).getSharedPreferences();
            appCache.set_VICTIM_DETAILS(call.getData().getString("victimDetails"));
        }
        Log.d("customCall vd: ", call.getData().toString());
        Log.d(TAG, call.getData().toString());

        String VictimDetails = appCache.get_VICTIM_DETAILS();
        Log.e(TAG, "sendVictimDetailsToApp: : VictimDetails : " + VictimDetails);


        try {

            JSONObject obj = new JSONObject(VictimDetails);

            Log.d("victimId : ", obj.getString("victimId"));
            ApplicationConstants.VICTIM_ID = obj.getString("victimId");

            Log.d("victimId 2 : ", obj.getString("victimId"));

        } catch (Throwable t) {

        }

    }

    @PluginMethod()
    public void sendPanicButtonNumberToApp(PluginCall call) {
        AppCache appCache = ((App) getActivity().getApplication()).getSharedPreferences();
        if (call != null && (call.getData() != null && !TextUtils.isEmpty(call.getData().getString("panicBtnNumber")))) {
            appCache.setPanicButtonNumber(call.getData().getString("panicBtnNumber"));
        }

        if (call != null && (call.getData() != null && !TextUtils.isEmpty(call.getData().getString("deviceUDID")))) {
            appCache.set_VICTIM_IMEI(call.getData().getString("deviceUDID"));
            Log.e("UniqueIdPaDeviceUDID", call.getData().getString("deviceUDID"));
        }

        if (call != null && (call.getData() != null && !TextUtils.isEmpty(call.getData().getString("victimDetailsPanic")))) {
            Log.e("victimDetailsPanic", call.getData().getString("victimDetailsPanic"));
            appCache.set_VICTIM_DETAILS(call.getData().getString("victimDetailsPanic"));
        }


        Log.e("ActualNumber", appCache.getPanicButtonNumber());

        gpsTrackerService.callPanicButtonAPI(appCache.getPanicButtonNumber(), appCache.get_VICTIM_IMEI(), appCache.get_VICTIM_DETAILS());
    }

    @PluginMethod()
    private void isNotificationsEnabledForMyApp(PluginCall call) {
        NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(getActivity());
        Log.e(TAG, "isNotificationsEnabledForMyApp: " + notificationManagerCompat.areNotificationsEnabled());
        call.resolve(new JSObject().put("data", notificationManagerCompat.areNotificationsEnabled()));
    }

    private void startBackgroundLocationService() {
        try {
            requestAndroidNativePermission();
            gpsTrackerService = new GPSTrackerService();
            mServiceIntent = new Intent(getActivity(), gpsTrackerService.getClass());
            ApplicationConstants.CURRENT_CONTEXT = getActivity().getApplicationContext();
            if (!isMyServiceRunning(gpsTrackerService.getClass())) {
                ContextCompat.startForegroundService(getActivity(), mServiceIntent);
                /*if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    getActivity().startForegroundService(mServiceIntent);
                } else {
                    getActivity().startService(mServiceIntent);
                }*/
            }
        } catch (Exception e) {
            getActivity().finish();
        }
    }

    @Override
    protected void handleOnResume() {
        super.handleOnResume();
        setupGpsTrackerServiceEventReceiver();
    }

    private void stopBackgroundLocationService() {
        try {
            gpsTrackerService = new GPSTrackerService();
            serviceRestarterBroadcastReceiver = new ServiceRestarterBroadcastReceiver();
            mServiceIntent = new Intent(getActivity(), gpsTrackerService.getClass());
            //if (!isMyServiceRunning(gpsTrackerService.getClass())) {
            getActivity().stopService(mServiceIntent);
            getActivity().unregisterReceiver(serviceRestarterBroadcastReceiver);
        } catch (Exception e) {
            e.printStackTrace();
//            getActivity().finish();
        }
    }

    @Override
    protected void handleOnPause() {
        super.handleOnPause();
        getActivity().unregisterReceiver(GpsTrackerServiceEventBroadcastReceiver);
    }

    private void requestAndroidNativePermission() {
        boolean permissionAccessCoarseLocationApproved =
                ActivityCompat.checkSelfPermission(getActivity(), mPermissionCoarseLocation)
                        == PackageManager.PERMISSION_GRANTED;

        if (permissionAccessCoarseLocationApproved) {
            boolean backgroundLocationPermissionApproved =
                    ActivityCompat.checkSelfPermission(getActivity(),
                            mPermissionBackgroundLocation)
                            == PackageManager.PERMISSION_GRANTED;

            if (backgroundLocationPermissionApproved) {
                // App can access location both in the foreground and in the background.
                // Start your service that doesn't have a foreground service type
                // defined.
            } else {
                // App can only access location in the foreground. Display a dialog
                // warning the user that your app must have all-the-time access to
                // location in order to function properly. Then, request background
                // location.
                ActivityCompat.requestPermissions((Activity) getActivity(), new String[]{
                        mPermissionBackgroundLocation}, ApplicationConstants.REQUEST_CODE_PERMISSION);
            }
        } else {
            // App doesn't have access to the device's location at all. Make full request
            // for permission.
//            Toast.makeText(getActivity(), "App doesn't have access to the device's location at all. Make " +
//                    "full request for permission.", Toast.LENGTH_LONG).show();
            ActivityCompat.requestPermissions((Activity) getActivity(), new String[]{
                            mPermissionCoarseLocation,
                            mPermissionFineLocation,
                            mPermissionBackgroundLocation
                    },
                    ApplicationConstants.REQUEST_CODE_PERMISSION);
        }
    }

    private boolean isMyServiceRunning(Class<?> serviceClass) {
        ActivityManager manager = (ActivityManager) getActivity().getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                Log.i("isMyServiceRunning?", true + "");
                return true;
            }
        }
        Log.i("isMyServiceRunning?", false + "");
        return false;
    }

    /**
     * Register BroadcastReceiver for events fired from {@link GPSTrackerService}.
     */
    private void setupGpsTrackerServiceEventReceiver() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(ApplicationConstants.ACTION_SERVICE_TRACKER_EVENT);
        intentFilter.addAction(ApplicationConstants.ACTION_SERVICE_API_FAILED_EVENT);
        intentFilter.addAction(ApplicationConstants.ACTION_SERVICE_STOP_EVENT);
        intentFilter.addAction(ApplicationConstants.ACTION_LOCATION_PERMISSION_FAILED_EVENT);
        intentFilter.addAction(ApplicationConstants.ACTION_LOCATION_PERMISSION_STATUS_RESULT);
        getActivity().registerReceiver(GpsTrackerServiceEventBroadcastReceiver, intentFilter);
    }

    /*public void stopuserActivityUpdates() {
        // TODO: 3/28/2020 Stop user activity recognition update here.
    }*/
/*
    //Get a PendingIntent//
    private PendingIntent getActivityDetectionPendingIntent() {
//Send the activity data to our DetectedActivitiesIntentService class//
        Intent intent = new Intent(getActivity(), ActivityIntentService.class);
        return PendingIntent.getService(getActivity(), 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

    }*/

    /*public void initialiseActivityRecogniser() {
        //        User activity broadcast receiver.
        userActivityRecognitionBroadcastReceiver = new UserActivityRecognitionBroadcastReceiver();

//        initialize json array to avoid multiple initializations.
        jsonArray = new JSONArray();

    }*/

    /**
     * Register for user activity broadcast events.
     */
    /*public void registerUserActivityBroadcast() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(DETECTED_ACTIVITY);
        getActivity().registerReceiver(userActivityRecognitionBroadcastReceiver, intentFilter);
    }*/

    private BroadcastReceiver GpsTrackerServiceEventBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
//            Toast.makeText(context, "Intent Detected.", Toast.LENGTH_LONG).show();
            Log.e("PermissionCheck", intent.getAction());
            if (intent.getAction().matches(ApplicationConstants.ACTION_SERVICE_TRACKER_EVENT)) {
                JSObject ret = new JSObject();
                ret.put("data", intent.getStringExtra("data"));
                notifyListeners("myCustomEvent", ret);
            } else if (intent.getAction().matches(ApplicationConstants.ACTION_SERVICE_API_FAILED_EVENT)) {
                JSObject ret = null;
                try {
                    ret = new JSObject();
                    ret.put("data", new JSObject(intent.getStringExtra("data")));
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                notifyListeners("apiAuthFailedEvent", ret);
            } else if (intent.getAction().matches(ApplicationConstants.ACTION_SERVICE_STOP_EVENT)) {
                JSObject ret = null;
                ret = new JSObject();
                String message = intent.getStringExtra("data");
                ret.put("data", message);
                notifyListeners("stopServiceMesssage", ret);
                stopBackgroundLocationService();
            }
            if (intent.getAction().matches(ApplicationConstants.ACTION_LOCATION_PERMISSION_STATUS_RESULT)) {
                JSObject ret = null;
                try {
                    ret = new JSObject();
                    ret.put("data", new JSObject(intent.getStringExtra("data")));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                Log.e("ACTIONRESULT", ret + " ");
                // Toast.makeText(getActivity(), "notifyListenersCall" + intent.getAction(), Toast.LENGTH_LONG).show();
                notifyListeners("locationPermissionStatus", ret);
            } else {
                // Toast.makeText(getActivity(), "ACTIONPERMISSION" + intent.getAction(), Toast.LENGTH_LONG).show();
            }
            if (intent.getAction().matches(ApplicationConstants.ACTION_LOCATION_PERMISSION_FAILED_EVENT)) {
                JSObject ret = null;
                try {
                    ret = new JSObject();
                    ret.put("data", new JSObject(intent.getStringExtra("data")));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                // Toast.makeText(getActivity(), "notifyListenersCall" + intent.getAction(), Toast.LENGTH_LONG).show();
                notifyListeners("locationPermissionFailed", ret);
            } else {
                // Toast.makeText(getActivity(), "ACTIONPERMISSION" + intent.getAction(), Toast.LENGTH_LONG).show();
            }
        }
    };

    /**
     * Build JSONObject with fenceKey and fenceCurrentState value
     * and pass it to the plugin.
     *
     * @param activityType
     * @param activityConfidence
     */
    private JSONObject getActivityEventJsonObject(String activityType, int activityConfidence) {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put(ACTIVITY_TYPE, activityType);
//            jsonObject.put("value", currentState);
            jsonObject.put("activityConfidence", activityConfidence);
        } catch (JSONException e) {
            e.printStackTrace();
        }
//        Fire event here with object built.
        Log.i(TAG, jsonObject.toString());
        return jsonObject;

    }


    static String getActivityString(int detectedActivityType) {
        switch (detectedActivityType) {
            case DetectedActivity.ON_BICYCLE:
                return ON_BICYCLE_FENCE_ACTION;
            case DetectedActivity.ON_FOOT:
                return ON_FOOT_FENCE_ACTION;
            case DetectedActivity.RUNNING:
                return RUNNING_FENCE_ACTION;
            case DetectedActivity.STILL:
                return STILL_FENCE_ACTION;
            case DetectedActivity.TILTING:
                return TILTING_FENCE_ACTION;
            case DetectedActivity.WALKING:
                return WALKING_FENCE_ACTION;
            case DetectedActivity.IN_VEHICLE:
                return IN_VEHICLE_FENCE_ACTION;
            default:
                return UNKNOWN_FENCE_ACTION;
        }
    }

    class UserActivityRecognitionBroadcastReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            Log.d(TAG, "onReceive: Broadcast called");

            detectedActivities = intent.getParcelableArrayListExtra(CAPTURED_ACTIVITY_LIST);
            if (detectedActivities != null && detectedActivities.size() > 0) {
                for (DetectedActivity detectedActivity :
                        detectedActivities) {
                    if (jsonArray != null)
                        jsonArray.put(getActivityEventJsonObject(getActivityString(detectedActivity.getType()), detectedActivity.getConfidence()));
                }
            }
            JSObject ret = new JSObject();
            ret.put("data", jsonArray.toString());
            Log.d(TAG, "onReceive: " + ret);
            Toast.makeText(getActivity(), "Activity Type : " + ret, Toast.LENGTH_LONG).show();
            notifyListeners("myCustomEvent", ret);
        }
    }

//    public void sendBroadcastPermissionToPlugin(@Nullable String data) {
//        Intent intent = new Intent(ApplicationConstants.ACTION_LOCATION_PERMISSION_FAILED_EVENT);
//        if (data != null) {
//            intent.putExtra("data", data);
//        }
//        // TODO: 22-04-2020 Call device events api here.
//        mContext.sendBroadcast(intent);
//    }


    @PluginMethod()
    public void LogInfo(PluginCall call) {
        String tag = call.getData().getString("tag");
        String message = call.getData().getString("message");
        Log.i(tag, message);
        appendLog(tag + " : " + message);
    }

    @PluginMethod()
    public void LogError(PluginCall call) {
        String tag = call.getData().getString("tag");
        String message = call.getData().getString("message");
        Log.e(tag, message);
        appendLog(tag + " : " + message);
    }

    @PluginMethod()
    public void LogWarning(PluginCall call) {
        String tag = call.getData().getString("tag");
        String message = call.getData().getString("message");
        Log.w(tag, message);
        appendLog(tag + " : " + message);
    }

    @PluginMethod()
    public void LogDebug(PluginCall call) {
        String tag = call.getData().getString("tag");
        String message = call.getData().getString("message");
        Log.d(tag, message);
        appendLog(tag + " : " + message);
    }

    @PluginMethod()
    public void appendLog(String text) {
        SimpleDateFormat fileNameDateTimeFormat = new SimpleDateFormat("yyyy_MMdd");
        String filePath = getActivity().getExternalFilesDir(null).getAbsolutePath() + "/"
                + "_allylogUI" + fileNameDateTimeFormat.format(new Date()) + ".txt";

        File logFile = new File(filePath);
        if (!logFile.exists()) {
            try {
                logFile.createNewFile();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        try {
            SimpleDateFormat textDateTimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            //BufferedWriter for performance, true to set append to file flag
            BufferedWriter buf = new BufferedWriter(new FileWriter(logFile, true));
            buf.append(textDateTimeFormat.format(new Date()) + " : " + text);
            buf.newLine();
            buf.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @PluginMethod()
    public boolean IsMobileDataEnabled(PluginCall call) {
        boolean mobileDataEnabled = false; // Assume disabled
        ConnectivityManager cm = (ConnectivityManager) ((App) getActivity().getApplication()).getSystemService(Context.CONNECTIVITY_SERVICE);
        try {
            Class cmClass = Class.forName(cm.getClass().getName());
            Method method = cmClass.getDeclaredMethod("getMobileDataEnabled");
            method.setAccessible(true); // Make the method callable
            // get the setting for "mobile data"
            mobileDataEnabled = (Boolean) method.invoke(cm);
        } catch (Exception e) {
            // Some problem accessible private API
            // TODO do whatever error handling you want here
        }
        JSObject ret = new JSObject();
        ret.put("IsMobileDataEnabled", mobileDataEnabled);
        call.resolve(ret);

        return mobileDataEnabled;
    }
}
