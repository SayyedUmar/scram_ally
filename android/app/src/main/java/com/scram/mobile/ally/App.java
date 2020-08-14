package com.scram.mobile.ally;

import android.app.Application;
import android.content.IntentFilter;

import com.scram.mobile.ally.storage.AppCache;


public class App extends Application {
    private ServiceRestarterBroadcastReceiver serviceRestarterBroadcastReceiver;
    //    private UserActivityRecognitionBroadcastReceiver userActivityRecognitionBroadcastReceiver;
    AppCache appCache;


    @Override
    public void onCreate() {
        super.onCreate();
        serviceRestarterBroadcastReceiver = new ServiceRestarterBroadcastReceiver();
        registerReceiver(serviceRestarterBroadcastReceiver, new IntentFilter(ApplicationConstants.ACTION_RESTART_SERVICE));

        appCache = AppCache.getInstance(getApplicationContext());

        /*userActivityRecognitionBroadcastReceiver = new UserActivityRecognitionBroadcastReceiver();
        registerReceiver(userActivityRecognitionBroadcastReceiver, new IntentFilter(DETECTED_ACTIVITY));*/
    }

    public AppCache getSharedPreferences() {
        return appCache;

    }

    @Override
    public void onTerminate() {
        super.onTerminate();
        if (serviceRestarterBroadcastReceiver != null)
            unregisterReceiver(serviceRestarterBroadcastReceiver);

        /*if (userActivityRecognitionBroadcastReceiver != null)
            unregisterReceiver(userActivityRecognitionBroadcastReceiver);*/
    }
}
