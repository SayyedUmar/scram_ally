package com.scram.mobile.ally;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Address;
import android.location.Criteria;
import android.location.Geocoder;
import android.location.GpsSatellite;
import android.location.GpsStatus;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.location.LocationProvider;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;
import android.os.BatteryManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.PowerManager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.app.JobIntentService;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import android.util.Log;

import androidx.annotation.RequiresApi;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.BasicNetwork;
import com.android.volley.toolbox.HurlStack;
import com.android.volley.toolbox.NoCache;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.location.ActivityRecognitionClient;
import com.google.android.gms.location.DetectedActivity;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.scram.mobile.ally.services.ActivityIntentService;
import com.scram.mobile.ally.storage.AppCache;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;

import static com.scram.mobile.ally.CustomNativePlugin.ACTIVITY_TYPE;
import static com.scram.mobile.ally.CustomNativePlugin.CAPTURED_ACTIVITY_LIST;
import static com.scram.mobile.ally.CustomNativePlugin.DETECTED_ACTIVITY;


public class GPSTrackerService extends JobIntentService implements LocationListener, SensorEventListener {

    private final long TIMER_PERIOD = 60000;
    private String VictimDetails = "";
    private String VictimDetailsPanic = "";
    private final String TAG = "#AllyAppLog";
    private final String CHANNEL_ID = "Channel_GPSTrackerService";
    private final CharSequence CHANNEL_BATTEY = "Battery";

    private final String HEART_BEAT = "Heartbeat";
    private final int BATTERY_NOTIFICATION_ID = 2;
    private final int GPS_NOTIFICATION_ID = 3;
    private final String KEY_VICTIM_ID = "victimId";
    private final int WIFI_MOBILE_DATA_NOTIFICATION_ID = 4;
    boolean isBatteryClear = false;
    boolean isBatteryLow = false;
    NotificationManager notificationManager;

    private Context mContext = this;
    // flag for GPS status
    private boolean isGPSEnabled = false;
    private boolean isLocationEnabled = false;
    // flag for network status
    private boolean isNetworkEnabled = false;
    // flag for location status
    private boolean canGetLocation = false;
    private Location location; // location
    private double latitude = 0; // latitude
    private double longitude = 0; // longitude
    private double accuracy = 0; //accuracy
    private double altitude = 0; // altitude
    private long locationTime = new Date().getTime(); // time
    private double noOfSatellite = 0; // number of Satellite
    private double pointSpeed = 0; //speed
    private double bearing = 0; //speed
    private double mVerticalAccuracyMeters = 0; //altitude accuracy
    private boolean isMoving = false;
    private boolean isPushNotificationEnabled = true;
    private String logPath = "";
    private Timer mTimer = null;
    long notify_interval = 60 * 1000;
    long file_delete_interval = 24*60*60 * 1000;
    long number_of_days = 14;
    private Handler mHandler = new Handler();

    private int batteryLevel = -1;

    private int currentActivityConfidence = -1;
    private String currentActivityType = "";

    private boolean getBatteryChargingStatus() {
        return isBatteryCharging;
    }

    private void setBatteryChargingStatus(boolean batteryCharging) {
        isBatteryCharging = batteryCharging;
    }

    private boolean isBatteryCharging = false;

    private int getBatteryLevel() {
        return batteryLevel;
    }

    private void setBatteryLevel(int batteryLevel) {
        this.batteryLevel = batteryLevel;
    }

    private boolean locationTurnOnfirstConnect = false;

    private String VICTIM_ID = "";
    private String DEVICE_IMEI = "";

    // Declaring a Location Manager
    protected LocationManager locationManager;
    private RequestQueue mRequestQueue;

    //    Network change member variables.
    private ConnectionStateMonitor connectionStateMonitor;

    // Start with some variables
    private SensorManager sensorManager;

    private Sensor acceleroeterSensor;
    private float[] mGravity;
    private float mAccel;
    private float mAccelCurrent;
    private float mAccelLast;
    private boolean shouldRestartService = false;
    private CheckDeviceEventStatusReceiver checkDeviceEventStatusReceiver;

    //    User activity
    private ActivityRecognitionClient mActivityRecognitionClient;
    private UserActivityRecognitionBroadcastReceiver userActivityRecognitionBroadcastReceiver;
    private boolean isMobileDataEnable = false;
    private boolean isWifiEnable = false;
    AppCache appCache;
    private String locationMode = " ";

    Location gpsLocation, networkLocation, bestLocation;
    float gpsAccuracy, networkAccuracy;
    ArrayList<Location> unprocessedLocation = new ArrayList<>();
    private static Date locationUpdateDateTime = new Date();

    SimpleDateFormat fileNameDateTimeFormat = new SimpleDateFormat("yyyy_MMdd");
    private static volatile PowerManager.WakeLock wakeLock;
    PowerManager powerManager = null;
    private Boolean stop = false;

    public GPSTrackerService() {
//        mRequestQueue = Volley.newRequestQueue(this);
//        ApplicationConstants.REQUEST_QUEUE = Volley.newRequestQueue(this);
    }


    @Override
    public void onCreate() {
        super.onCreate();
        powerManager = (PowerManager) getSystemService(Context.POWER_SERVICE);
        wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, ":GPSTrackerService : PARTIAL_WAKE_LOCK");
        wakeLock.acquire();
        ApplicationConstants.CURRENT_CONTEXT = this;
        locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        isLocationEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        LogError(TAG, "onCreate: : Service");
        appCache = ((App) getApplication()).getSharedPreferences();
        VictimDetails = appCache.get_VICTIM_DETAILS();
        LogError(TAG, "onCreate: : VictimDetails : " + VictimDetails);
        stop = false;
        JSONObject obj = null;
        try {
            obj = new JSONObject(VictimDetails);
            VICTIM_ID = obj.getString("victimId");
        } catch (JSONException e) {
            e.printStackTrace();
            LogError("TAG", e.getMessage());
        }

        DEVICE_IMEI = appCache.get_VICTIM_IMEI();
        LogError(TAG, "onCreate: : DEVICE_IMEI : " + DEVICE_IMEI);

        shouldRestartService = true;

        try {
//            Handle background service limitations
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                startForeground(1, createForegroundNotification());
            }

            mRequestQueue = Volley.newRequestQueue(this);

            sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);

//            accelerometer for motion change event.
            acceleroeterSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);

            mAccel = 0.00f;
            mAccelCurrent = SensorManager.GRAVITY_EARTH;
            mAccelLast = SensorManager.GRAVITY_EARTH;

            mTimer = new Timer();
            mTimer.schedule(new TimerTaskToGetLocation(),5,file_delete_interval);


        } catch (Exception ex) {
            ex.printStackTrace();
            LogInfo(TAG, "onCreate : error" + ex.getMessage());
        }


    }

    private Runnable periodicUpdate = new Runnable() {
        @RequiresApi(api = Build.VERSION_CODES.M)
        @Override
        public void run() {
          if (!ApplicationConstants.IsServiceStop) {

                mHandler.postDelayed(periodicUpdate, notify_interval);
                locationUpdateDateTime = new Date();
                LogInfo(TAG, "TimerTaskToGetLocation Started : locationUpdateDateTime : " + locationUpdateDateTime);

                boolean isScreenOn = powerManager.isInteractive();
                boolean isDeviceIdleMode = powerManager.isDeviceIdleMode();
                LogInfo(TAG, "TimerTaskToGetLocation Started : isScreenOn : " + isScreenOn + ", isDeviceIdleMode : " + isDeviceIdleMode);
                /* we don't need the screen on */
                if (wakeLock == null && (!isScreenOn || isDeviceIdleMode) && !wakeLock.isHeld()) {

                    wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, ":PARTIAL_WAKE_LOCK");

                    if (!wakeLock.isHeld())
                        wakeLock.acquire();
                    if (wakeLock.isHeld())
                        wakeLock.release();
                    wakeLock = null;
                    LogInfo(TAG, "TimerTaskToGetLocation Started : Acquired PARTIAL_WAKE_LOCK");
                }
                if (isNetworkConnected()) {
                    getLocation(true);
                    SendPushNotificationEvent();
                    clearNotificationFromDrawer(201);
                } else {
                    // fireNotification("No Internet - Monitoring stopped", "Please enable Wifi/MobileData for monitoring", 201);
                }
            }
        }
    };

    private class TimerTaskToGetLocation extends TimerTask {
        @Override
        public void run() {

            mHandler.post(new Runnable() {
                @RequiresApi(api = Build.VERSION_CODES.M)
                @Override
                public void run() {
                    LogInfo(TAG, "TimerTaskToGetLocation: Executing file deleting process");
                    File folder = new File(ApplicationConstants.CURRENT_CONTEXT.getExternalFilesDir(null).getAbsolutePath());
                    for (File f : folder.listFiles()) {

                        if (f.isFile()) {
                            try{
                                LogInfo(TAG, "Deleting file: "+ f.getAbsolutePath());
                                long diff = new Date().getTime() - f.lastModified();

                                if (diff > (long) number_of_days * file_delete_interval) {
                                    f.delete();
                                }

                            }catch(Exception ex){
                                LogError(TAG, "Error deleting file: " + f.getAbsolutePath() + " Error:" + ex.getMessage());
                            }
                        }

                    }
                }
            });

        }
    }

    /**
     * Crate notification
     *
     * @return : Notification
     */
    private Notification createForegroundNotification() {
        NotificationChannel notificationChannel = null;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            notificationChannel = new NotificationChannel(CHANNEL_ID, "AllyBackgroundService", NotificationManager.IMPORTANCE_HIGH);
        }
        notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        if (notificationManager != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                notificationManager.createNotificationChannel(notificationChannel);
            }
        }

//        Build and return notification.
        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setChannelId(CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle(getString(R.string.app_name))
                .setContentText(String.format("%s %s ", getString(R.string.app_name), "is running"))
                .setContentInfo("Ally is monitoring your location in background")
                /* .setStyle(new NotificationCompat.BigTextStyle()
                         .bigText(String.format("%s %s ", getString(R.string.app_name), "is running")))*/
//                .setStyle(new NotificationCompat.BigTextStyle()
//                        .bigText("Ally is monitoring your location in background" ))
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .build();
    }


    /**
     * Crate notification
     *
     * @return : Notification
     */
    private Notification createForegroundNotification(String notificationMessage) {
        NotificationChannel notificationChannel = null;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            notificationChannel = new NotificationChannel(CHANNEL_ID, "Ally", NotificationManager.IMPORTANCE_HIGH);
        }
        notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        if (notificationManager != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                notificationManager.createNotificationChannel(notificationChannel);
            }
        }

//        Build and return notification.
        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setChannelId(CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle(getString(R.string.app_name))
                .setContentText(String.format("%s %s ", getString(R.string.app_name), "is running"))
                .setStyle(new NotificationCompat.BigTextStyle()
                        .bigText("Ally is monitoring your location in background"))
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .build();
    }

    @Override
    public final void onAccuracyChanged(Sensor sensor, int accuracy) {
        // Do something here if sensor accuracy changes.
        LogError(TAG, "onAccuracyChanged : sensor.getType : " + sensor.getType() + ", Accuracy : " + accuracy);
    }

    @Override
    public final void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            mGravity = event.values.clone();
            // Shake detection
            float x = mGravity[0];
            float y = mGravity[1];
            float z = mGravity[2];
            mAccelLast = mAccelCurrent;
            mAccelCurrent = (float) Math.sqrt(x * x + y * y + z * z);
            float delta = mAccelCurrent - mAccelLast;
            mAccel = mAccel * 0.1f + delta;
            // Make this higher or lower according to how much
            // motion you want to detect

            if (mAccel > 1) {
                LogInfo(TAG, "onSensorChanged : Motion detected: " + mAccel);
            }
        } else if (event.sensor.getType() == Sensor.TYPE_STEP_DETECTOR) {
            LogInfo(TAG, "onSensorChanged : Steps counts: " + event.values[0]);
        }
        SendPushNotificationEvent();
    }

    @SuppressLint("MissingPermission")
    public void getLocation(boolean isSendLocation) {
        try {
            //VictimDetails = appCache.get_VICTIM_DETAILS();
            if (locationManager == null) {
                locationManager = (LocationManager) ApplicationConstants.CURRENT_CONTEXT.getSystemService(Context.LOCATION_SERVICE);
            }
            isGPSEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
            isNetworkEnabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
            if (!isGPSEnabled) {
                // fireNotification("Location(GPS) is disabled", "Enable Location(GPS) to get accurate locations", 202);
            } else {
                clearNotificationFromDrawer(202);
            }

            // LogInfo(TAG, "onLocation: : VictimDetails : " + VictimDetails);
            LogInfo(TAG, "isNetworkEnabled: " + isNetworkEnabled + ", isGPSEnabled: : " + isGPSEnabled);
            if (!isGPSEnabled && !isNetworkEnabled) {
           /*     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && notificationManager != null) {
                    notificationManager.deleteNotificationChannel(CHANNEL_ID);
                }*/
                LogError(TAG, "isNetworkEnabled: " + isNetworkEnabled + ", isGPSEnabled: : " + isGPSEnabled + ", Both are disabled");
               // fireNotification("Location(GPS) and Wifi are disabled", "Enable Location(GPS) to get locations", 203);
                return;
            } else {
                clearNotificationFromDrawer(203);
           /*     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O  && notificationManager != null) {
                    NotificationChannel channel = notificationManager.getNotificationChannel(CHANNEL_ID);
                    if(channel== null)
                    {
                        startForeground(1, createForegroundNotification());
                    }
                }*/

                if (isWifiEnable) {
                    locationMode = "W";
                } else {
                    if (isMobileDataEnable) {
                        locationMode = "A";
                    }
                }
                if (isGPSEnabled) {
                    // get high accuracy provider
                    LocationProvider gpsLocationProvider =
                            locationManager.getProvider(locationManager.getBestProvider(createFineCriteria(), true));
                    String highLocationProviderName = gpsLocationProvider.getName();

                    locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,
                            ApplicationConstants.MIN_TIME_BW_UPDATES,
                            ApplicationConstants.MIN_DISTANCE_CHANGE_FOR_UPDATES, this);
                    if (locationManager != null) {
                        this.canGetLocation = true;
                        gpsLocation = locationManager.getLastKnownLocation(highLocationProviderName);
                        if (gpsLocation != null) {
                            latitude = gpsLocation.getLatitude();
                            longitude = gpsLocation.getLongitude();
                            gpsAccuracy = gpsLocation.getAccuracy();
                        }
                    }
                }

                if (isNetworkEnabled) {
                    LocationProvider networkProvider =
                            locationManager.getProvider(locationManager.getBestProvider(createCoarseCriteria(), true));
                    String lowLocationProviderName = networkProvider.getName();
                    locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER,
                            ApplicationConstants.MIN_TIME_BW_UPDATES,
                            ApplicationConstants.MIN_DISTANCE_CHANGE_FOR_UPDATES, this);
                    if (locationManager != null) {
                        this.canGetLocation = true;
                        networkLocation = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                        if (networkLocation != null) {
                            latitude = networkLocation.getLatitude();
                            longitude = networkLocation.getLongitude();
                            networkAccuracy = networkLocation.getAccuracy();
                        }
                    }
                }
            }

            LogInfo(TAG, "networkAccuracy: : " + networkAccuracy + " gpsAccuracy: : " + gpsAccuracy);
            // this logic is used to get an idea to take location with more accuracy
            if (gpsLocation != null && networkLocation != null) {

                this.canGetLocation = true;
                if (gpsLocation.getAccuracy() <= networkLocation.getAccuracy()) {
                    location = gpsLocation;
                    locationMode = "A";
                } else {
                    location = networkLocation;
                    locationMode = "W";
                }
            } else {
                if (gpsLocation != null) {
                    this.canGetLocation = true;
                    location = gpsLocation;
                    locationMode = "A";
                } else if (networkLocation != null) {
                    this.canGetLocation = true;
                    location = networkLocation;
                    locationMode = "W";
                }
            }

            if (isSendLocation)
                sendLocationDetails();

        } catch (Exception e) {
            e.printStackTrace();
            LogError(TAG, e.getMessage());
        }
    }


    @SuppressLint("NewApi")
    @Override
    public void onLocationChanged(Location location1) {
        LogInfo(TAG, "onLocationChanged() : location1 Object " + location1.toString() + " , Accuracy : " + location1.getAccuracy()
                + " , Provider : " + location1.getProvider());
//     if(ApplicationConstants.IsServiceStop)
//     {
//         startForeground(1, createForegroundNotification());
//     }
//        ApplicationConstants.IsServiceStop = false;
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
        LogInfo(TAG, "onStatusChanged() : provider : " + provider + "status : " + status);
    }

    @Override
    public void onProviderEnabled(String provider) {
        LogInfo(TAG, "onProviderEnabled() : provider : " + provider);
    }

    @Override
    public void onProviderDisabled(String provider) {
        LogInfo(TAG, "onProviderDisabled() : provider : " + provider);
    }

    /**
     * Stop using GPS listener
     * Calling this function will stop using GPS in your app
     */
    public void stopUsingGPS() {
        if (locationManager != null) {
            locationManager.removeUpdates(GPSTrackerService.this);
        }
    }

    public double getLatitude() {
        if (location != null) {
            latitude = location.getLatitude();
        }
        return latitude;
    }

    public long getLocationTime() {
        if (location != null) {
            locationTime = locationUpdateDateTime.getTime();
        }
        return locationTime;
    }

    public double getLongitude() {
        if (location != null) {
            longitude = location.getLongitude();
        }
        return longitude;
    }

    public double getAccuracy() {
        if (location != null) {
            accuracy = location.getAccuracy();
        }
        return accuracy;
    }

    public double getAltitude() {
        if (location != null) {
            altitude = location.getAltitude();
        }
        return altitude;
    }

    public double getSpeed() {
        if (location != null) {
            pointSpeed = location.getSpeed();
        }
        return pointSpeed;
    }

    public double getBearing() {
        if (location != null && location.hasBearing()) {
            bearing = location.getBearing();
        } else
            bearing = 0;
        return bearing;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public double getVerticalAccuracy() {
        if (location != null && location.hasVerticalAccuracy()) {
            mVerticalAccuracyMeters = location.getVerticalAccuracyMeters();
        } else
            mVerticalAccuracyMeters = 0;
        return mVerticalAccuracyMeters;
    }


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        super.onStartCommand(intent, flags, startId);

        LogError(TAG, "onStartCommand: : Service");
        shouldRestartService = false;
        //        Register for network change listeners
        connectionStateMonitor = new ConnectionStateMonitor();
        connectionStateMonitor.enable(this);
        mActivityRecognitionClient = new ActivityRecognitionClient(this);

        //startTimer();
        mRequestQueue = Volley.newRequestQueue(this);
        setupReceiver();

        requestUpdatesHandler();

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.

        }
        else {
            locationManager.addGpsStatusListener(new GpsStatus.Listener() {
                @Override
                public void onGpsStatusChanged(int i) {
                    Date CurrentDateTime = new Date();
                    //LogInfo(TAG, CurrentDateTime + ":GSL:onGpsStatusChanged");
                    switch (i) {
                        case GpsStatus.GPS_EVENT_STOPPED:
                            //LogInfo(TAG, CurrentDateTime + ":GPS_EVENT_STOPPED");
                            break;
                        case GpsStatus.GPS_EVENT_STARTED:
                            // LogInfo(TAG, CurrentDateTime + ":GPS_EVENT_STARTED");
                            break;
                        case GpsStatus.GPS_EVENT_SATELLITE_STATUS:
                            LogInfo(TAG, CurrentDateTime + ":GPS_EVENT_SATELLITE_STATUS");
                            @SuppressLint("MissingPermission")
                            GpsStatus gpsStatus = locationManager.getGpsStatus(null);
                            Iterable<GpsSatellite> gpsSatelliteIterable = gpsStatus.getSatellites();
                            Iterator<GpsSatellite> iterator = gpsSatelliteIterable.iterator();
                            int iCurrentSatIndex = 0;
                            while (iterator.hasNext()) {
                                GpsSatellite gpsSatellite = iterator.next();
                                LogInfo(TAG, "SAT" + iCurrentSatIndex + ":Signal to Noise Ratio =" + gpsSatellite.getSnr() +
                                        ",Pseudo Random Number =" + gpsSatellite.getSnr() +
                                        "Elevation =" + gpsSatellite.getElevation() +
                                        ",Azimuth =" + gpsSatellite.getAzimuth() +
                                        ",hasAlmanac =" + gpsSatellite.hasAlmanac() +
                                        ",hasEphemeris =" + gpsSatellite.hasEphemeris() +
                                        ",usedInFix =" + gpsSatellite.usedInFix());
                                iCurrentSatIndex++;
                            }
                            noOfSatellite = iCurrentSatIndex;
                            LogInfo(TAG, "onGpsStatusChanged: CurrentDateTime: " + CurrentDateTime + ", noOfSatellite:" + noOfSatellite);
                            break;
                        case GpsStatus.GPS_EVENT_FIRST_FIX:
                            //LogInfo(TAG, CurrentDateTime + ":GPS_EVENT_FIRST_FIX");
                            break;
                        default:
                            break;
                    }
                    SendPushNotificationEvent();
                }
            });
        }
//        Register sensor listeners here.
            if (acceleroeterSensor != null) {
                sensorManager.registerListener(this, acceleroeterSensor, SensorManager.SENSOR_DELAY_NORMAL);
            }
            mHandler.post(periodicUpdate);
            return START_STICKY;

    }

    public void registerUserActivityBroadcast() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(DETECTED_ACTIVITY);
        registerReceiver(userActivityRecognitionBroadcastReceiver, intentFilter);
        LogError(TAG, "registerUserActivityBroadcast: Registered");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        wakeLock.release();
        LogError(TAG, "onDestroy: : Service");
        unregisterReceiver(checkDeviceEventStatusReceiver);
        unregisterReceiver(userActivityRecognitionBroadcastReceiver);
        connectionStateMonitor.disable();
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        super.onTaskRemoved(rootIntent);
        LogError(TAG, "onTaskRemoved: ");
        if (shouldRestartService) {
            sendBroadcast(new Intent(ApplicationConstants.ACTION_RESTART_SERVICE));
        }
    }

    @Override
    protected void onHandleWork(@NonNull Intent intent) {
        mContext = getApplicationContext();
    }

    @Override
    public IBinder onBind(Intent arg0) {
        return null;
    }

    private String convertMillisecondsToUTC(Long time) {
        SimpleDateFormat sdf = null;
        if (sdf == null) {
            sdf = new SimpleDateFormat(ApplicationConstants.YYYY_MM_DD_T_HH_MM_SS_SSS_Z);
        }
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        LogError("", "UTC TIME " + sdf.format(new Date(time)));
        return (sdf.format(new Date(time)));
    }

    //Get location JSON Object
    private JSONObject getLocationJsonObj(String eventType) {
        JSONObject jsonBodyObj = new JSONObject();
        try {
            jsonBodyObj.put(KEY_VICTIM_ID, VICTIM_ID);
            jsonBodyObj.put("deviceImei", DEVICE_IMEI);
            jsonBodyObj.put("timestamp", convertMillisecondsToUTC(getLocationTime()));
            jsonBodyObj.put("latitude", getLatitude());
            jsonBodyObj.put("longitude", getLongitude());
            jsonBodyObj.put("accuracy", getAccuracy());
            jsonBodyObj.put("altitude", getAltitude());

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                jsonBodyObj.put("altitudeAccuracy", getVerticalAccuracy());
            } else
                jsonBodyObj.put("altitudeAccuracy", 0);

            jsonBodyObj.put("direction", getBearing());
            jsonBodyObj.put("speed", getSpeed());
            jsonBodyObj.put("satellite", noOfSatellite);
            jsonBodyObj.put("csq", 0);
            jsonBodyObj.put("isMoving", isMoving);

            jsonBodyObj.put("fix", 0);
            jsonBodyObj.put("address", getAddressFromLatLng());
            jsonBodyObj.put("locationMode", locationMode);
            jsonBodyObj.put("eventType", eventType);
            jsonBodyObj.put("cacheTimeStamp", convertMillisecondsToUTC(getLocationTime()));
            jsonBodyObj.put("activityType", currentActivityType);
            jsonBodyObj.put("activityConfidence", currentActivityConfidence);
            jsonBodyObj.put("batteryLevel", getBatteryLevel());
            jsonBodyObj.put("isBatteryCharging", getBatteryChargingStatus());

        } catch (JSONException e) {
            e.printStackTrace();
        }
        LogError("Location Data", jsonBodyObj.toString());
        return jsonBodyObj;
    }

    //Get current location with current time JSON Object
    private JSONObject getLocationObjWithTime(String eventType) {
        JSONObject jsonBodyObj = new JSONObject();

        OffsetDateTime now = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            now = OffsetDateTime.now(ZoneOffset.UTC);
        }

        try {
            if (VICTIM_ID == "")
                jsonBodyObj.put(KEY_VICTIM_ID, ApplicationConstants.VICTIM_ID);
            else
                jsonBodyObj.put(KEY_VICTIM_ID, VICTIM_ID);

            if (DEVICE_IMEI == "")
                jsonBodyObj.put("deviceImei", ApplicationConstants.DEVICE_IMEI);
            else
                jsonBodyObj.put("deviceImei", DEVICE_IMEI);

            jsonBodyObj.put("timestamp", now);
            jsonBodyObj.put("latitude", getLatitude());
            jsonBodyObj.put("longitude", getLongitude());
            jsonBodyObj.put("accuracy", getAccuracy());
            jsonBodyObj.put("altitude", getAltitude());
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                jsonBodyObj.put("altitudeAccuracy", getVerticalAccuracy());
            } else
                jsonBodyObj.put("altitudeAccuracy", 0);

            jsonBodyObj.put("direction", getBearing());
            jsonBodyObj.put("speed", getSpeed());
            jsonBodyObj.put("satellite", noOfSatellite);
            jsonBodyObj.put("csq", 0);
            jsonBodyObj.put("isMoving", isMoving);
            jsonBodyObj.put("fix", 0);
            jsonBodyObj.put("address", getAddressFromLatLng());
            jsonBodyObj.put("locationMode", locationMode);
            jsonBodyObj.put("eventType", eventType);
            jsonBodyObj.put("cacheTimeStamp", now);
            jsonBodyObj.put("activityType", currentActivityType);
            jsonBodyObj.put("activityConfidence", currentActivityConfidence);
            jsonBodyObj.put("batteryLevel", getBatteryLevel());
            jsonBodyObj.put("isBatteryCharging", getBatteryChargingStatus());

        } catch (JSONException e) {
            e.printStackTrace();
        }
        LogError("Location Data", jsonBodyObj.toString());
        return jsonBodyObj;
    }

    //Get current location with current time JSON Object
    private JSONObject getLocationObjWithTimePanicButton(String eventType, String imeiDevice, String victimIdPanic) {
        JSONObject jsonBodyObj = new JSONObject();

        OffsetDateTime now = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            now = OffsetDateTime.now(ZoneOffset.UTC);
        }

        try {
            jsonBodyObj.put(KEY_VICTIM_ID, victimIdPanic);
            jsonBodyObj.put("deviceImei", imeiDevice);
            jsonBodyObj.put("timestamp", now);
            jsonBodyObj.put("latitude", getLatitude());
            jsonBodyObj.put("longitude", getLongitude());

            jsonBodyObj.put("accuracy", getAccuracy());
            jsonBodyObj.put("altitude", getAltitude());
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                jsonBodyObj.put("altitudeAccuracy", getVerticalAccuracy());
            } else
                jsonBodyObj.put("altitudeAccuracy", 0);

            jsonBodyObj.put("direction", getBearing());
            jsonBodyObj.put("speed", getSpeed());
            jsonBodyObj.put("satellite", noOfSatellite);
            jsonBodyObj.put("csq", 0);
            jsonBodyObj.put("isMoving", isMoving);
            jsonBodyObj.put("fix", 0);
            jsonBodyObj.put("address", getAddressFromLatLng());
            jsonBodyObj.put("locationMode", locationMode);
            jsonBodyObj.put("eventType", eventType);
            jsonBodyObj.put("cacheTimeStamp", now);
            jsonBodyObj.put("activityType", currentActivityType);
            jsonBodyObj.put("activityConfidence", currentActivityConfidence);
            jsonBodyObj.put("batteryLevel", getBatteryLevel());
            jsonBodyObj.put("isBatteryCharging", getBatteryChargingStatus());

        } catch (JSONException e) {
            e.printStackTrace();
        }
        LogError("Location Data", jsonBodyObj.toString());
        return jsonBodyObj;
    }

    //Get Events JSON Object
    private JSONArray getEventJsonArrayBlank() {
        JSONArray eventDataArray = new JSONArray();
        return eventDataArray;
    }

    class NewRequest extends StringRequest {
        String requestBody;

        private NewRequest(int method, String url, Response.Listener<String> listener, @Nullable Response.ErrorListener errorListener, String requestBody) {
            super(method, url, listener, errorListener);
            LogInfo(TAG, "NewRequest: inside API Calling URL: " + url + ". RequestBody" + requestBody);
            this.requestBody = requestBody;
        }

        @Override
        public Map<String, String> getHeaders() throws AuthFailureError {
            HashMap<String, String> headers = new HashMap<String, String>();
            headers.put("Accept", "application/json");
            headers.put("Content-Type", "application/json");

            return headers;
        }

        @Override
        public byte[] getBody() throws AuthFailureError {
            try {
                return requestBody == null ? null : requestBody.getBytes("utf-8");
            } catch (UnsupportedEncodingException uee) {
                VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s",
                        requestBody, "utf-8");
                return null;
            }
        }
    }

    //Send location details
    private void sendLocationDetails() {
        JSONArray locationArray = new JSONArray();
        Date currentTime = new Date();
        long diff = currentTime.getTime() - locationUpdateDateTime.getTime();

        long diffSeconds = (diff / 1000);

        LogError("Updating locationUpdateDateTime: ", ", CurrentTime:  " + currentTime + ", LocationUpdateDateTime:  " + locationUpdateDateTime + ", diffSeconds:  " + diffSeconds);
        LogInfo(TAG, "sendLocationDetails : locationUpdateDateTime : " + locationUpdateDateTime);

        locationArray.put(getLocationJsonObj(HEART_BEAT));

        final String requestBody = locationArray.toString();
        // sendBroadcastToPlugin(requestBody);

        LogInfo(TAG, "NewRequest: Before API Calling URL: " + ApplicationConstants.URL_SEND_LOCATION + requestBody);
        NewRequest stringRequest = new NewRequest(Request.Method.POST, ApplicationConstants.BASE_URL + ApplicationConstants.URL_SEND_LOCATION,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        LogError(TAG, "NewRequest: onResponse: Success call : " + ApplicationConstants.URL_SEND_LOCATION);
                    }

                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                LogError(TAG, "NewRequest :" + ApplicationConstants.URL_SEND_LOCATION + ", onErrorResponse: " + error);
                unprocessedLocation.add(location);
                if (error != null) {
                    JSONObject jsObject = new JSONObject();
                    try {
                        if (error.networkResponse != null) {
                            jsObject.put("errorCode", error.networkResponse.statusCode);
                        }
                        handleAPIError(error);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    sendApiFailedBroadcastToPlugin(jsObject.toString());
                }

            }
        }, requestBody);

        mRequestQueue.add(stringRequest);
    }

    // Send Location Enable/Disable event
    public void sendDeviceEvents(String eventType, String event, String eventName, int eventValue) {

        JSONArray locationArray = new JSONArray();
        JSONObject jsonBodyObj = new JSONObject();

        OffsetDateTime nowMain = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            nowMain = OffsetDateTime.now(ZoneOffset.UTC);
        }
        try {

            jsonBodyObj.put(KEY_VICTIM_ID, VICTIM_ID);
            jsonBodyObj.put("deviceImei", DEVICE_IMEI);
            jsonBodyObj.put("eventType", eventType);
            jsonBodyObj.put("timestamp", nowMain);
            jsonBodyObj.put("event", eventName);
            jsonBodyObj.put("eventData", getEventJsonArrayBlank());
            jsonBodyObj.put("location", getLocationObjWithTime(eventName));
            locationArray.put(jsonBodyObj);
        } catch (JSONException e) {
            e.printStackTrace();
            LogError(TAG, "sendDeviceEvents : Location : " + e.getMessage());
        }

        final String requestBody = locationArray.toString();

        LogInfo(TAG, "sendDeviceEvents : DeviceEventArray : requestBody : " + requestBody);

        NewRequest stringRequest = new NewRequest(Request.Method.POST, ApplicationConstants.BASE_URL + ApplicationConstants.URL_DEVICE_EVENTS,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        LogError(TAG, "onResponse: DeviceEventArray Success call");

                    }

                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                LogError(TAG, "onErrorResponse: DeviceEventArray " + error);
                if (error != null) {
                    JSONObject jsObject = new JSONObject();
                    try {
                        if (error.networkResponse != null) {
                            jsObject.put("errorCode", error.networkResponse.statusCode);
                        }
                        handleAPIError(error);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    sendApiFailedBroadcastToPlugin(jsObject.toString());
                }

            }
        }, requestBody);

        mRequestQueue.add(stringRequest);
    }

    // Send Battery Level event
    private void sendDeviceEventsBattery(String event, String eventType, int batteryLevel, boolean isCharging) {

        JSONArray locationArray = new JSONArray();
        JSONObject jsonBodyObj = new JSONObject();
        JSONArray jsonArrayEventData = null;
        try {

            jsonBodyObj.put(KEY_VICTIM_ID, VICTIM_ID);
            jsonBodyObj.put("deviceImei", DEVICE_IMEI);
            jsonBodyObj.put("eventType", event);
            jsonBodyObj.put("timestamp", convertMillisecondsToUTC(getLocationTime()));
            jsonBodyObj.put("event", eventType);

            jsonArrayEventData = new JSONArray();
            jsonArrayEventData.put(getEventJsonObject("BatteryStatus", Integer.toString(batteryLevel)));
            jsonArrayEventData.put(getEventJsonObject("ChargingStatus", isCharging ? "0" : "4"));

            jsonBodyObj.put("eventData", jsonArrayEventData);

            jsonBodyObj.put("location", getLocationJsonObj(eventType));
            locationArray.put(jsonBodyObj);
        } catch (JSONException e) {
            e.printStackTrace();
            LogError(TAG, e.getMessage());
        }

        final String requestBody = locationArray.toString();

        LogInfo(TAG, "sendDeviceEventsBattery : DeviceEventArrayBattery : " + requestBody);

        NewRequest stringRequest = new NewRequest(Request.Method.POST, ApplicationConstants.BASE_URL + ApplicationConstants.URL_DEVICE_EVENTS,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        LogError(TAG, "onResponse: Battery Event Success call");
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                LogError(TAG, "onErrorResponse: Battery Event " + error);
                if (error != null) {
                    JSONObject jsObject = new JSONObject();
                    try {
                        if (error.networkResponse != null) {
                            jsObject.put("errorCode", error.networkResponse.statusCode);
                        }
                        handleAPIError(error);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    sendApiFailedBroadcastToPlugin(jsObject.toString());
                }

            }
        }, requestBody);

        mRequestQueue.add(stringRequest);
    }

    // panicButtonPressedEvent
    public void panicButtonPressedEvent(String eventType, String event, String eventName, String eventValue, String imeiPanic, String victimDetailsPanic) {

        JSONArray locationArray = new JSONArray();
        JSONObject jsonBodyObj = new JSONObject();
        JSONArray jsonPanicBtnEventData = null;
        JSONObject objPanic = null;

        OffsetDateTime nowMain = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            nowMain = OffsetDateTime.now(ZoneOffset.UTC);
        }
        try {
            objPanic = new JSONObject(victimDetailsPanic);
            getLocation(false);
            jsonBodyObj.put(KEY_VICTIM_ID, objPanic.getString("victimId"));
            jsonBodyObj.put("deviceImei", imeiPanic);
            jsonBodyObj.put("eventType", eventType);
            jsonBodyObj.put("timestamp", nowMain);
            jsonBodyObj.put("event", eventName);
            // jsonBodyObj.put("eventData", getEventJsonArrayBlank());

            jsonPanicBtnEventData = new JSONArray();
            jsonPanicBtnEventData.put(getEventJsonObject("Dialed Number", eventValue));

            jsonBodyObj.put("eventData", jsonPanicBtnEventData);

            jsonBodyObj.put("location", getLocationObjWithTimePanicButton(eventName, imeiPanic, objPanic.getString("victimId")));
            locationArray.put(jsonBodyObj);

            Log.e("JSONObj", "PanicBtnObj : " + jsonBodyObj);
        } catch (JSONException e) {
            e.printStackTrace();
            // LogError(TAG, "sendDeviceEvents : Location :mRequestQueue " + e.getMessage());
        }

        final String requestBody = locationArray.toString();

        LogInfo(TAG, "sendDeviceEvents : panicButtonPressedEvent : requestBody : " + requestBody);

        if (mRequestQueue == null) {
            mRequestQueue = Volley.newRequestQueue(ApplicationConstants.CURRENT_CONTEXT);
            //mRequestQueue = new RequestQueue(new NoCache(), new BasicNetwork(new HurlStack()));
        }

        NewRequest stringRequest = new NewRequest(Request.Method.POST, ApplicationConstants.BASE_URL + ApplicationConstants.URL_DEVICE_EVENTS,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        LogError(TAG, "onResponse: panicButtonPressedEvent Success call");

                    }

                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                // LogError(TAG, "onErrorResponse: DeviceEventArray " + error);
                LogError(TAG, "onErrorResponse: panicButtonPressed Event " + error);
                if (error != null) {
                    JSONObject jsObject = new JSONObject();
                    try {
                        if (error.networkResponse != null) {
                            jsObject.put("errorCode", error.networkResponse.statusCode);
                        }
                        handleAPIError(error);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    sendApiFailedBroadcastToPlugin(jsObject.toString());
                }

            }
        }, requestBody);
        mRequestQueue.add(stringRequest);
    }


    // Get address from latitude and longitude
    private String getAddressFromLatLng() {
//        LogInfo(TAG, "getLocationObjWithTimePanicButton:  getAddressFromLatLng Started " );
        Geocoder geocoder;
        List<Address> addresses;
        String addressFromLatLng = "";
        try {
            geocoder = new Geocoder(ApplicationConstants.CURRENT_CONTEXT, Locale.getDefault());

            addresses = geocoder.getFromLocation(getLatitude(), getLongitude(), 1);
            if (addresses != null && addresses.size() > 0) {
                Address objAddress = addresses.get(0);
                if (objAddress != null) {
                    String address = objAddress.getAddressLine(0);
                    String subThoroughfare = objAddress.getSubThoroughfare();
                    String thoroughfare = objAddress.getThoroughfare();
                    String premises = objAddress.getPremises();
                    String subLocality = objAddress.getSubLocality();
                    String locality = objAddress.getLocality();
                    String subAdminArea = objAddress.getSubAdminArea();
                    String adminArea = objAddress.getAdminArea();
                    String postalCode = objAddress.getPostalCode();
                    String knownName = objAddress.getFeatureName();
                    String country = objAddress.getCountryCode();
                    if (addresses != null)
                        addressFromLatLng = address;
                    else {
                        if (subThoroughfare != null)
                            addressFromLatLng = addressFromLatLng + " " + subThoroughfare;
                        if (thoroughfare != null)
                            addressFromLatLng = addressFromLatLng + " " + thoroughfare;
                        if (premises != null)
                            addressFromLatLng = addressFromLatLng + " " + premises;
                        if (subLocality != null)
                            addressFromLatLng = addressFromLatLng + " " + subLocality;
                        if (locality != null)
                            addressFromLatLng = addressFromLatLng + " " + locality;
                        if (subAdminArea != null)
                            addressFromLatLng = addressFromLatLng + " " + subAdminArea;
                        if (adminArea != null)
                            addressFromLatLng = addressFromLatLng + " " + adminArea;
                        if (postalCode != null)
                            addressFromLatLng = addressFromLatLng + " " + postalCode;
                        if (knownName != null)
                            addressFromLatLng = addressFromLatLng + " " + knownName;
                        if (country != null)
                            addressFromLatLng = addressFromLatLng + " " + country;
                    }
                }
                LogInfo(TAG, "Address : " + addressFromLatLng);
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            //e.printStackTrace();
            LogError(TAG, "getLocationObjWithTimePanicButton:  getAddressFromLatLng error  "  + e.getMessage());
        }
//        LogInfo(TAG, "getLocationObjWithTimePanicButton:  getAddressFromLatLng ended "  + addressFromLatLng);
        return addressFromLatLng;
    }

    public class CheckDeviceEventStatusReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (intent != null) {

                if (intent.getAction().equals(Intent.ACTION_BATTERY_CHANGED)) {
                    handleBatteryChangeEvent(context, intent);
                }

                if (intent.getAction().matches(LocationManager.PROVIDERS_CHANGED_ACTION)) {
                    handleProviderChangeEvent(context);
                }
            }
        }
    }

    /**
     * Handle Battery change broadcasts.
     *
     * @param context
     * @param intent
     */
    private void handleBatteryChangeEvent(Context context, Intent intent) {
        int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, 0);
        int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);

        setBatteryLevel(level);

        boolean isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING || status == BatteryManager.BATTERY_STATUS_FULL;
        setBatteryChargingStatus(isCharging);

        if (level < 21 && isBatteryClear && !isBatteryLow) {
//            Fire low battery event
            isBatteryLow = true;
            isBatteryClear = false;
            LogError("BATTERY", "Level is < 20 & isBatteryClear: " + isBatteryClear + ", isBatteryLow: " + isBatteryLow + " Level: " + level);

           // fireNotification("Low Battery", String.format("Battery %s is critically low", level), BATTERY_NOTIFICATION_ID);
            sendDeviceEventsBattery("Battery", "Battery Low", level, isCharging);
        } else if (level < 21) {
            if (isBatteryLow)
                return;
            isBatteryClear = false;
            isBatteryLow = true;
            LogError("BATTERY", "Level is exact < 20 isBatteryClear: " + isBatteryClear + ", isBatteryLow: " + isBatteryLow + " Level: " + level);

            // fireNotification("Low Battery", String.format("Battery %s is critically low", level + " %"), BATTERY_NOTIFICATION_ID);
            sendDeviceEventsBattery("Battery", "Battery Low", level, isCharging);
        } else if (level >= 20 && level <= 39) {
//            isBatteryLow = false;
// Don't do anything here, as discussed.
            LogError("BATTERY", "Level is >= 20 && <= 40 isBatteryClear: " + isBatteryClear + ", isBatteryLow: " + isBatteryLow + " Level: " + level);
        } else if (level >= 40) {
            if (isBatteryClear)
                return;
            isBatteryClear = true;
            isBatteryLow = false;
            LogError("BATTERY", "Level is exact >= 40 isBatteryClear: " + isBatteryClear + ", isBatteryLow: " + isBatteryLow + " Level: " + level);
            // fireNotification("Battery Clear", String.format("Battery %s looks good ", level + "%"), BATTERY_NOTIFICATION_ID);
            sendDeviceEventsBattery("Battery", "Battery Low Clear", level, isCharging);
        }

    }


    private JSONObject getEventJsonObject(String name, String value) throws JSONException {
        return new JSONObject().put("name", name).put("value", value);
    }

    /**
     * Fire Local notification to notify user.
     */
    private void fireNotification(String title, String message, int notificationId) {
        if (notificationManager == null)
            notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        NotificationChannel notificationChannel;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            notificationChannel = new NotificationChannel(CHANNEL_ID, CHANNEL_BATTEY, NotificationManager.IMPORTANCE_MIN);
        }
        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(getApplicationContext(), CHANNEL_ID);
        builder.setAutoCancel(true)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle(title)
                .setDefaults(Notification.DEFAULT_ALL)
                .setContentText(message)
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setContentIntent(pendingIntent);

        if (notificationManager != null)
            notificationManager.notify(notificationId, builder.build());
    }

    private void handleProviderChangeEvent(Context context) {
        LogInfo(TAG, "Location Providers changed");

        isGPSEnabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        isNetworkEnabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
        LogInfo("Network Provider : ", isNetworkEnabled + " ");
        LogInfo("Location Provider : ", isGPSEnabled + " ");

        if (!isGPSEnabled && isLocationEnabled) {
            eventStatus("Location Service", LocationManager.PROVIDERS_CHANGED_ACTION, "Disabled", 1);
           // fireNotification("Location(GPS) is disabled", "Enable Location(GPS) to get accurate locations", GPS_NOTIFICATION_ID);
        } else {
            getLocation(true);
            eventStatus("Location Service", LocationManager.PROVIDERS_CHANGED_ACTION, "Enabled", 1);
            clearNotificationFromDrawer(GPS_NOTIFICATION_ID);
        }

        isLocationEnabled = true;

        //Start your Activity if location was enabled:
        if (isGPSEnabled || isNetworkEnabled) {
            LogInfo(TAG, "locationTurnOnfirstConnect : " + locationTurnOnfirstConnect);
            if (locationTurnOnfirstConnect) {
                locationTurnOnfirstConnect = false;
                // Toast.makeText(context, "Location enabled", Toast.LENGTH_LONG).show();

            } else if (!locationTurnOnfirstConnect) {
                locationTurnOnfirstConnect = true;
                // Toast.makeText(context, "Location disabled locationTurnOnfirstConnect = false", Toast.LENGTH_LONG).show();
            }
        } else {
            LogInfo(TAG, "locationTurnOnfirstConnect : " + locationTurnOnfirstConnect + " Nothing is enabled");
            if (!locationTurnOnfirstConnect) {
                locationTurnOnfirstConnect = true;
                // Toast.makeText(context, "Location disabled", Toast.LENGTH_LONG).show();
            }
        }
    }

    /**
     * Set all BroadcastReceiver here.
     */
    private void setupReceiver() {
        checkDeviceEventStatusReceiver = new CheckDeviceEventStatusReceiver();
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(Intent.ACTION_POWER_CONNECTED);
        intentFilter.addAction(Intent.ACTION_POWER_DISCONNECTED);
        intentFilter.addAction(Intent.ACTION_BATTERY_CHANGED);
        intentFilter.addAction(LocationManager.PROVIDERS_CHANGED_ACTION);
        registerReceiver(checkDeviceEventStatusReceiver, intentFilter);

//        User activity broadcast receiver.
        userActivityRecognitionBroadcastReceiver = new UserActivityRecognitionBroadcastReceiver();
        registerUserActivityBroadcast();
    }

    public void requestUpdatesHandler() {
//Set the activity detection interval. I’m using 3 seconds//
        Task<Void> task = mActivityRecognitionClient.requestActivityUpdates(
                3000,
                getActivityDetectionPendingIntent());
        task.addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void result) {
                LogInfo(TAG, "Recognition registered.");
            }
        });
    }

    //Get a PendingIntent//
    private PendingIntent getActivityDetectionPendingIntent() {
//Send the activity data to our DetectedActivitiesIntentService class//
        Intent intent = new Intent(this, ActivityIntentService.class);
        return PendingIntent.getService(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

    }

    @SuppressLint("NewApi")
    private void eventStatus(String eventType, String event, String eventName, int eventValue) {
        LogError("Parag_eventType", eventType.toString());
        LogError("Parag_event", eventName.toString());
        LogError("Parag_eventName", eventName.toString());
        switch (event) {
            case LocationManager.PROVIDERS_CHANGED_ACTION:
                sendDeviceEvents(eventType, event, eventName, eventValue);
                break;

            case BatteryManager.EXTRA_LEVEL:
            case BatteryManager.EXTRA_PLUGGED:
            case BatteryManager.EXTRA_BATTERY_LOW:
                break;
        }
    }

    /**
     * Broadcast event to receivers registered with "service.event.broadcast" action string.
     *
     * @param data : Data for receivers.
     */
    private void sendBroadcastToPlugin(@Nullable String data) {
        Intent intent = new Intent(ApplicationConstants.ACTION_SERVICE_TRACKER_EVENT);
        if (data != null) {
            intent.putExtra("data", data);
        }
        // TODO: 22-04-2020 Call device events api here.
        mContext.sendBroadcast(intent);
    }

    public void sendBroadcastPermissionToPlugin(@Nullable String data) {
        Intent intent = new Intent(ApplicationConstants.ACTION_LOCATION_PERMISSION_FAILED_EVENT);
        if (data != null) {
            intent.putExtra("data", data);
        }
        // TODO: 22-04-2020 Call device events api here.
        mContext.sendBroadcast(intent);
    }

    /**
     * Broadcast event to receivers registered with "service.event.apiFail" action string.
     *
     * @param data : Data for receivers.
     */
    private void sendApiFailedBroadcastToPlugin(@Nullable String data) {
        Intent intent = new Intent(ApplicationConstants.ACTION_SERVICE_API_FAILED_EVENT);
        if (data != null) {
            intent.putExtra("data", data);
        }
        // TODO: 22-04-2020 Call device events api here.
        mContext.sendBroadcast(intent);
    }
    private void sendStopServiceBroadcastToPlugin(@Nullable String data) {
        Intent intent = new Intent(ApplicationConstants.ACTION_SERVICE_STOP_EVENT);
        if (data != null) {
            intent.putExtra("data", data);
        }
        mContext.sendBroadcast(intent);
    }

    private void handleAPIError(VolleyError error) {
        if (error.networkResponse.statusCode == 401 || error.networkResponse.statusCode == 403 || error.networkResponse.statusCode == 412) {
            periodicUpdate = null;
            // fireNotification(error.getMessage()[0], "API Error", 201);
            String errorString = new String(error.networkResponse.data).replace('[', ' ').replace(']', ' ').trim();
            LogInfo(TAG, errorString.toString());
            this.stopSelf();

            if(!ApplicationConstants.IsServiceStop){
                ApplicationConstants.IsServiceStop = true;
                sendStopServiceBroadcastToPlugin(errorString.toString());
            }

        }
    }

    @Override
    public boolean onStopCurrentWork() {
        LogError(TAG, "onStopCurrentWork: Service Stopped");
        return super.onStopCurrentWork();
    }

    //============================================================================================
    //User activity things goes here.
    //===========================================================================================
    class UserActivityRecognitionBroadcastReceiver extends BroadcastReceiver {
        private final String TAG = UserActivityRecognitionBroadcastReceiver.class.getSimpleName();
        private ArrayList<DetectedActivity> detectedActivities;
        private JSONArray jsonArray = new JSONArray();

        private static final String FENCE_RECEIVER_ACTION = "FENCE_RECEIVE";
        private static final String ON_FOOT_FENCE_ACTION = "ON_FOOT";
        private static final String STILL_FENCE_ACTION = "STILL";
        private static final String WALKING_FENCE_ACTION = "WALKING";
        private static final String RUNNING_FENCE_ACTION = "RUNNING";
        private static final String ON_BICYCLE_FENCE_ACTION = "ON_BICYCLE";
        private static final String IN_VEHICLE_FENCE_ACTION = "IN_VEHICLE";
        private static final String UNKNOWN_FENCE_ACTION = "UNKNOWN";
        private static final String TILTING_FENCE_ACTION = "TILTING";

        @Override
        public void onReceive(Context context, Intent intent) {
            LogInfo(TAG, "onReceive: Broadcast called");

//        detectedActivities.clear();
            detectedActivities = intent.getParcelableArrayListExtra(CAPTURED_ACTIVITY_LIST);
            if (detectedActivities != null && detectedActivities.size() > 0) {
                for (DetectedActivity detectedActivity :
                        detectedActivities) {
                    jsonArray = null;
                    jsonArray = new JSONArray();
                    jsonArray.put(getActivityEventJsonObject(getActivityString(detectedActivity.getType()), detectedActivity.getConfidence()));

                    LogError("type", "(" + detectedActivity.getType());
                    LogError("Confidence", "(" + detectedActivity.getConfidence());
                }
                sendBroadcastToPlugin(jsonArray.toString());
            }
            LogInfo(TAG, "onReceive: " + jsonArray.toString());
        }

        String getActivityString(int detectedActivityType) {
            switch (detectedActivityType) {
                case DetectedActivity.ON_BICYCLE:
                    isMoving = true;
                    return ON_BICYCLE_FENCE_ACTION;
                case DetectedActivity.ON_FOOT:
                    isMoving = true;
                    return ON_FOOT_FENCE_ACTION;
                case DetectedActivity.RUNNING:
                    isMoving = true;
                    return RUNNING_FENCE_ACTION;
                case DetectedActivity.STILL:
                    isMoving = false;
                    return STILL_FENCE_ACTION;
                case DetectedActivity.TILTING:
                    isMoving = false;
                    return TILTING_FENCE_ACTION;
                case DetectedActivity.WALKING:
                    isMoving = true;
                    return WALKING_FENCE_ACTION;
                case DetectedActivity.IN_VEHICLE:
                    isMoving = true;
                    return IN_VEHICLE_FENCE_ACTION;
                default:
                    isMoving = false;
                    return UNKNOWN_FENCE_ACTION;
            }
        }

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
                jsonObject.put("activityConfidence", activityConfidence);
                currentActivityConfidence = activityConfidence;
                currentActivityType = activityType;
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return jsonObject;

        }
    }

    public class ConnectionStateMonitor extends ConnectivityManager.NetworkCallback {

        final NetworkRequest networkRequestWifi;
        final NetworkRequest networkRequestCellular;
        private ConnectivityManager connectivityManager;

        public ConnectionStateMonitor() {
            networkRequestWifi = new NetworkRequest.Builder()
                    .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
                    .build();

            networkRequestCellular = new NetworkRequest.Builder()
                    .addTransportType(NetworkCapabilities.TRANSPORT_CELLULAR)
                    .build();


        }

        public void enable(Context context) {
            connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
            connectivityManager.registerNetworkCallback(networkRequestWifi, networkCallbackWifi);
            connectivityManager.registerNetworkCallback(networkRequestCellular, networkCallbackCellular);
        }

        public void disable() {
            connectivityManager.unregisterNetworkCallback(networkCallbackWifi);
            connectivityManager.unregisterNetworkCallback(networkCallbackCellular);
        }

        ConnectivityManager.NetworkCallback networkCallbackWifi = new ConnectivityManager.NetworkCallback() {
            @Override
            public void onAvailable(@NonNull Network network) {
                super.onAvailable(network);
                clearNotificationFromDrawer(WIFI_MOBILE_DATA_NOTIFICATION_ID);
                sendBroadcastToPlugin("Wifi/MobileData");
                isWifiEnable = true;
                LogError(TAG, "onAvailable: Wifi : Available");
            }

            @Override
            public void onLost(@NonNull Network network) {
                super.onLost(network);
                LogError(TAG, "onLost: Wifi lost");
                isWifiEnable = false;
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        if (!isMobileDataEnable && !isWifiEnable) {
                           // fireNotification("No Internet", "Enable Wifi/MobileData for monitoring", WIFI_MOBILE_DATA_NOTIFICATION_ID);
                            sendBroadcastToPlugin("Wifi/MobileData");
                        }
                        else if (!isMobileDataEnable) {
                           // fireNotification("Mobile data is disabled", "Enable cellular data for uninterrupted monitoring", WIFI_MOBILE_DATA_NOTIFICATION_ID);
                            sendBroadcastToPlugin("MobileData");
                        }

                    }
                }, 3000);
            }
        };

        ConnectivityManager.NetworkCallback networkCallbackCellular = new ConnectivityManager.NetworkCallback() {
            @Override
            public void onAvailable(@NonNull Network network) {
                super.onAvailable(network);
                clearNotificationFromDrawer(WIFI_MOBILE_DATA_NOTIFICATION_ID);
                sendBroadcastToPlugin("Wifi/MobileData");
                LogError(TAG, "onAvailable: Cellular : Available");
                isMobileDataEnable = true;
            }

            @Override
            public void onLost(@NonNull Network network) {
                super.onLost(network);
                isMobileDataEnable = false;
                if (!isMobileDataEnable && !isWifiEnable) {
                   // fireNotification("No Internet", "Enable Wifi/MobileData for monitoring", WIFI_MOBILE_DATA_NOTIFICATION_ID);
                    sendBroadcastToPlugin("Wifi/MobileData");
                }
                else if (!isMobileDataEnable) {
                   // fireNotification("Mobile data is disabled", "Enable cellular data for uninterrupted monitoring", WIFI_MOBILE_DATA_NOTIFICATION_ID);
                    sendBroadcastToPlugin("MobileData");
                }
                LogError(TAG, "onLost: Cellular lost");
            }
        };
    }

    public void clearNotificationFromDrawer(int notificationId) {
        if (notificationManager != null)
            notificationManager.cancel(notificationId);
    }

    public static Criteria createFineCriteria() {
        Criteria c = new Criteria();
        c.setAccuracy(Criteria.ACCURACY_FINE);
        c.setAltitudeRequired(true);
        c.setBearingRequired(true);
        c.setSpeedRequired(true);
        c.setCostAllowed(true);
        //API level 9 and up
        c.setHorizontalAccuracy(Criteria.ACCURACY_HIGH);
        c.setVerticalAccuracy(Criteria.ACCURACY_HIGH);
        c.setBearingAccuracy(Criteria.ACCURACY_HIGH);
        c.setSpeedAccuracy(Criteria.ACCURACY_HIGH);

        c.setPowerRequirement(Criteria.POWER_HIGH);
        return c;
    }

    public static Criteria createCoarseCriteria() {
        Criteria c = new Criteria();
        c.setAccuracy(Criteria.ACCURACY_COARSE);
        c.setAltitudeRequired(true);
        c.setBearingRequired(true);
        c.setSpeedRequired(true);
        c.setCostAllowed(true);
        c.setPowerRequirement(Criteria.POWER_HIGH);
        return c;
    }

    public void callPanicButtonAPI(String num, String imeiPanic, String victimDetailsPanic) {
        Log.e(TAG, "panicButtonNumber Error");
        Log.e(TAG, "panicButtonNumber GPS " + num);
        Log.e(TAG, "imeiPanic GPS " + imeiPanic);
        Log.e(TAG, "victimDetailsPanic GPS " + victimDetailsPanic);


        JSONObject objPanic = null;
        try {
            objPanic = new JSONObject(victimDetailsPanic);
            Log.e(TAG, "victimDetailsPanic GPS VictimId " + objPanic.getString("victimId"));
        } catch (JSONException e) {
            e.printStackTrace();
            LogError("TAG", e.getMessage());
        }

         panicButtonPressedEvent("Button Pressed", "", "Panic Button Pressed", num, imeiPanic, victimDetailsPanic );
        //sendDeviceEventsBattery("Battery", "Battery Low", 20, false);
    }

    public void LogInfo(String tag, String message) {
        Log.i(tag, message);
        appendLog(tag + " : " + message);
    }

    public void LogError(String tag, String message) {
        Log.e(tag, message);
        appendLog(tag + " : " + message);
    }

    public void LogWarning(String tag, String message) {
        Log.w(tag, message);
        appendLog(tag + " : " + message);
    }

    public void appendLog(String text) {
        try {

            logPath = ApplicationConstants.CURRENT_CONTEXT.getExternalFilesDir(null).getAbsolutePath();


            String filePath = this.logPath + "/"
                    + "_allylog" + fileNameDateTimeFormat.format(new Date()) + ".txt";

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
            } catch (NullPointerException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

        } catch (Exception ex) {
            // TODO Auto-generated catch block
            ex.printStackTrace();
        }
    }

    private void SendPushNotificationEvent() {
        if (isPushNotificationEnabled != NotificationManagerCompat.from(mContext).areNotificationsEnabled()) {
            isPushNotificationEnabled = NotificationManagerCompat.from(mContext).areNotificationsEnabled();
            sendDeviceEvents("Push Notification Service", isPushNotificationEnabled ? "Enabled" : "Disabled",
                    isPushNotificationEnabled ? "Enabled" : "Disabled", 1);

            if(isPushNotificationEnabled) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    startForeground(1, createForegroundNotification());
                    // fireNotification("Push Notification", "Please enable notification for better accuracy", GPS_NOTIFICATION_ID);
                }
            } else {
                fireNotification("Push Notification", "Please enable notification for better accuracy", GPS_NOTIFICATION_ID);
            }

            LogInfo(TAG, "SendPushNotificationEvent: isPushNotificationEnabled: " + isPushNotificationEnabled);
        }

    }


    private boolean isNetworkConnected() {
        ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);

        return cm.getActiveNetworkInfo() != null && cm.getActiveNetworkInfo().isConnected();
    }

    private void showDialog(String title, String message)
    {
        AlertDialog.Builder alertDialog= new AlertDialog.Builder(ApplicationConstants.CURRENT_CONTEXT);
        alertDialog.setTitle(title);
        alertDialog.setPositiveButton("OK", new DialogInterface.OnClickListener() {

            @Override
            public void onClick(DialogInterface dialog, int which) {
                // TODO Auto-generated method stub
                    dialog.dismiss();

            }
        });
   /*     alertDialog.setNegativeButton("cancel", new DialogInterface.OnClickListener() {

            @Override
            public void onClick(DialogInterface dialog, int which) {
                // TODO Auto-generated method stub
                Toast.makeText(getBaseContext(), "cancel ' comment same as ok'", Toast.LENGTH_SHORT).show();


            }
        });
        alertDialog.setMultiChoiceItems(items, checkedItems, new DialogInterface.OnMultiChoiceClickListener() {

            @Override
            public void onClick(DialogInterface dialog, int which, boolean isChecked) {
                // TODO Auto-generated method stub
                Toast.makeText(getBaseContext(), items[which] +(isChecked?"clicked'again i've wrrten this click'":"unchecked"),Toast.LENGTH_SHORT).show();

            }
        });*/
        alertDialog.show();
    }
}
