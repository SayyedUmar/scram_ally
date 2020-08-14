package com.scram.mobile.ally;

import android.Manifest;
import android.app.ActivityManager;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentSender;
import android.content.pm.PackageManager;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.provider.Settings;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.appcompat.app.AlertDialog;
import android.util.Log;
import android.widget.Toast;


import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.LocationSettingsStatusCodes;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.scram.mobile.ally.EasyPermissions.BaseRequestExecutor;
import com.scram.mobile.ally.EasyPermissions.EasyPermissions;
import com.scram.mobile.ally.EasyPermissions.RequestExecutor;
import com.scram.mobile.ally.EasyPermissions.bean.Permission;

import java.util.ArrayList;
import java.util.List;

import static android.Manifest.permission.ACCESS_BACKGROUND_LOCATION;
import static android.Manifest.permission.ACCESS_COARSE_LOCATION;
import static android.Manifest.permission.ACCESS_FINE_LOCATION;

public class MainActivity extends BridgeActivity {
    private static final String TAG = "#Yoga";
    private static final int MY_GPS_REQUEST = 301;
    private static final int REQUEST_CHECK_SETTINGS = 701;
    String mPermissionFineLocation = ACCESS_FINE_LOCATION;
    String mPermissionCoarseLocation = ACCESS_COARSE_LOCATION;
    String mPermissionBackgroundLocation = ACCESS_BACKGROUND_LOCATION;

    public static final int MY_IGNORE_OPTIMIZATION_REQUEST = 201;

    private boolean isBOptimizationPermissionGranted = false;
    private boolean isScreenPaused = false;


    private Context mContextMain = this;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Initializes the Bridge
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            // Additional plugins you've installed go here
            // Ex: add(TotallyAwesomePlugin.class);
            add(CustomNativePlugin.class);
        }});
        Log.e(TAG, "onCreate: MainActivity");
        CheckGpsStatus();

    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public void onResume() {
        super.onResume();
        Log.e(TAG, "onResume: MainActivity");
        if(isScreenPaused) {
            getRequiredPermissions();
            isScreenPaused = false;
        }
    }

    @Override
    public void onPause() {
        super.onPause();
//        unregisterReceiver(userActivityRecognitionBroadcastReceiver);
        Log.e(TAG, "onPause: MainActivity");


    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
/*        Log.e(TAG, "onNewIntent: MainActivity");
        System.out.println("Called when any activity declared as a singleTop in manifest file, first " +
                "onPause() ->> onNewIntent() ->> onResume() ->>  so to update current intent you can call setIntent(intent) ");*/

    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy: : Activity");
    }

    private void requestAndroidNativePermission() {
        boolean permissionAccessCoarseLocationApproved =
                ActivityCompat.checkSelfPermission(this, mPermissionCoarseLocation)
                        == PackageManager.PERMISSION_GRANTED;

        if (permissionAccessCoarseLocationApproved) {
            boolean backgroundLocationPermissionApproved =
                    ActivityCompat.checkSelfPermission(this,
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
                ActivityCompat.requestPermissions(this, new String[]{
                        mPermissionBackgroundLocation}, ApplicationConstants.REQUEST_CODE_PERMISSION);
            }
        } else {
            // App doesn't have access to the device's location at all. Make full request
            // for permission.
            Toast.makeText(this, "App doesn't have access to the device's location at all. Make full request for permission.", Toast.LENGTH_LONG).show();
            ActivityCompat.requestPermissions(this, new String[]{
                            mPermissionCoarseLocation,
                            mPermissionFineLocation,
                            mPermissionBackgroundLocation
                    },
                    ApplicationConstants.REQUEST_CODE_PERMISSION);
        }
    }

    private boolean isMyServiceRunning(Class<?> serviceClass) {
        ActivityManager manager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                Log.i("isMyServiceRunning?", true + "");
                return true;
            }
        }
        Log.i("isMyServiceRunning?", false + "");
        return false;
    }


    @RequiresApi(api = Build.VERSION_CODES.M)
    private void getRequiredPermissions() {
        PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
        boolean isIgnoringBatteryOptimizations = false;
        if (pm != null) {
            isIgnoringBatteryOptimizations = pm.isIgnoringBatteryOptimizations(getPackageName());
        }

        if (!isIgnoringBatteryOptimizations) {
            Intent intent = new Intent();
            intent.setAction(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
            intent.setData(Uri.parse("package:" + getPackageName()));
            startActivityForResult(intent, MY_IGNORE_OPTIMIZATION_REQUEST);
        }
        else {
            isBOptimizationPermissionGranted = true;
            EasyPermissions
                    .with(this)
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
                                sendBroadcastPermissionStatusToPlugin("true");
                                //Toast.makeText(MainActivity.this, "request permissions success!", Toast.LENGTH_SHORT).show();
                                Log.e(TAG, "request permissions success!");
                            } else {
                                // Toast.makeText(MainActivity.this, "Ally requires access to all permissions. \n Please allow access to all permissions.", Toast.LENGTH_SHORT).show();
                            }

                            String missingPermissions = "";
                            for (Permission p : results) {
                                if (!p.shouldShowRequestPermissionRationale && !p.granted) {
                                    switch (p.name) {
                                        case "android.permission.CALL_PHONE":
                                            missingPermissions += "Permissions-->Phone-->Allow" + System.lineSeparator();
                                            break;
                                        case "android.permission.ACCESS_FINE_LOCATION":
                                            if (android.os.Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
                                                missingPermissions += "Permissions-->Location-->Allow" + System.lineSeparator();
                                            }
                                            break;
                                        case "android.permission.ACCESS_BACKGROUND_LOCATION":
                                            if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                                                missingPermissions += "Permissions-->Location-->Allow Always" + System.lineSeparator();
                                            }
                                            break;
                                        case "android.permission.ACTIVITY_RECOGNITION":
                                            if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                                                missingPermissions += "Permissions-->Physical Activity-->Allow" + System.lineSeparator();
                                            }
                                            break;
                                    }
                                    Log.e(TAG, "name=" + p.name + "   granted=" + p.granted + "   shouldShowRequestPermissionRationale=" + p.shouldShowRequestPermissionRationale);
                                }
                            }

                            if (!grantAll && missingPermissions != "") {
                                Log.e(TAG, "confirmationPermissionRedirection grantAll: " + grantAll + ", missingPermissions: " + missingPermissions);
                                confirmationPermissionRedirection("Ally requires access to all permissions." + System.lineSeparator() +
                                        System.lineSeparator() +
                                        "Go to settings and enable permissions" + System.lineSeparator() +
                                        missingPermissions);


                            }
                        }
                    });
        }

    }



    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        System.out.println("requestCode : " + requestCode +" resultCode : "+resultCode+" data : "+data);;
        if (requestCode == MY_IGNORE_OPTIMIZATION_REQUEST) {
            PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
            boolean isIgnoringBatteryOptimizations = false;
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                assert pm != null;
                isIgnoringBatteryOptimizations = pm.isIgnoringBatteryOptimizations(getPackageName());
            }
            if (isIgnoringBatteryOptimizations) {
                // Ignoring battery optimization
            } else {
                // Not ignoring battery optimization
            }
            getRequiredPermissions();
        }
        if (requestCode == REQUEST_CHECK_SETTINGS) {
            CheckGpsStatus();
        }
    }
    private boolean showSettings()
    {
        Intent intent = new Intent();
        intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.setData(Uri.parse("package:" + getPackageName()));
        //intent.setFlags(Intent.);
        startActivityForResult(intent, 1);
        return true;
    }
    private void confirmationPermissionRedirection(String msg) {

            AlertDialog alertDialog = new AlertDialog.Builder(this)
                    .setTitle("Ally")
                    .setMessage(msg)
                    .setCancelable(false)
                  /*  .setNegativeButton("Exit", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                            isScreenPaused = true;
                        }
                    })*/
                    .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {

                            if (showSettings()) {
                                isScreenPaused = true;
                                dialog.cancel();
//                            getRequiredPermissions();
                            }
                        }
                    }).create();
            alertDialog.show();

    }

    public void CheckGpsStatus(){
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setInterval(1000);
        locationRequest.setFastestInterval(0);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder()
                .addLocationRequest(locationRequest);
        builder.setNeedBle(true);
        Task<LocationSettingsResponse> result =
                LocationServices.getSettingsClient(this).checkLocationSettings(builder.build());
        result.addOnCompleteListener(new OnCompleteListener<LocationSettingsResponse>() {
            @RequiresApi(api = Build.VERSION_CODES.M)
            @Override
            public void onComplete(Task<LocationSettingsResponse> task) {
                try {
                    LocationSettingsResponse response = task.getResult(ApiException.class);
                    getRequiredPermissions();
                    // All location settings are satisfied. The client can initialize location
                    // requests here.

                } catch (ApiException exception) {
                    switch (exception.getStatusCode()) {
                        case LocationSettingsStatusCodes.RESOLUTION_REQUIRED:
                            // Location settings are not satisfied. But could be fixed by showing the
                            // user a dialog.
                            try {
                                // Cast to a resolvable exception.
                                ResolvableApiException resolvable = (ResolvableApiException) exception;
                                // Show the dialog by calling startResolutionForResult(),
                                // and check the result in onActivityResult().
                                resolvable.startResolutionForResult(
                                        MainActivity.this,
                                        REQUEST_CHECK_SETTINGS);
                            } catch (IntentSender.SendIntentException e) {
                                // Ignore the error.
                            } catch (ClassCastException e) {
                                // Ignore, should be an impossible error.
                            }
                            break;
                        case LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE:
                            // Location settings are not satisfied. However, we have no way to fix the
                            // settings so we won't show the dialog.

                            break;
                    }
                }
            }
        });


    }

    private void sendBroadcastPermissionStatusToPlugin(@Nullable String data) {
        Intent intent = new Intent(ApplicationConstants.ACTION_LOCATION_PERMISSION_STATUS_RESULT);
        if (data != null) {
            intent.putExtra("data", data);
        }

        Log.e("sendBroadcastAllPerm", data );

        //new CustomNativePlugin().sendBroadcastPermissionToPlugin("true");
        // TODO: 22-04-2020 Call device events api here.
        bridge.triggerJSEvent("sendBroadcastAllPermCustom", "window");
        // mContextMain.sendBroadcast(intent);

    }
}
