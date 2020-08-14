package com.scram.mobile.ally.services;

import android.app.IntentService;
import android.content.Intent;

import com.google.android.gms.location.ActivityRecognitionResult;
import com.google.android.gms.location.DetectedActivity;
import com.scram.mobile.ally.CustomNativePlugin;

import java.util.ArrayList;

//Extend IntentService//
public class ActivityIntentService extends IntentService {
    protected static final String TAG = "Activity";

    //Call the super IntentService constructor with the name for the worker thread//
    public ActivityIntentService() {
        super(TAG);
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }
//Define an onHandleIntent() method, which will be called whenever an activity detection update is available//

    @Override
    protected void onHandleIntent(Intent intent) {
//Check whether the Intent contains activity recognition data//
        if (ActivityRecognitionResult.hasResult(intent)) {

//If data is available, then extract the ActivityRecognitionResult from the Intent//
            ActivityRecognitionResult result = ActivityRecognitionResult.extractResult(intent);
//Get an array of DetectedActivity objects//
            ArrayList<DetectedActivity> detectedActivities = (ArrayList) result.getProbableActivities();
            Intent intentUserActivity = new Intent(CustomNativePlugin.DETECTED_ACTIVITY);
            intentUserActivity.putParcelableArrayListExtra(CustomNativePlugin.CAPTURED_ACTIVITY_LIST, detectedActivities);
            sendBroadcast(intentUserActivity);

        }
    }
}