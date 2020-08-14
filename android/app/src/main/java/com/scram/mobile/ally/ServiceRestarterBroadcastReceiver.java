package com.scram.mobile.ally;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import com.scram.mobile.ally.GPSTrackerService;

public class ServiceRestarterBroadcastReceiver extends BroadcastReceiver {
    private String TAG = ServiceRestarterBroadcastReceiver.class.getSimpleName();

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "onReceive: Service restart receiver");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(new Intent(context, GPSTrackerService.class));
        } else {
            context.startService(new Intent(context, GPSTrackerService.class));
        }
    }
}