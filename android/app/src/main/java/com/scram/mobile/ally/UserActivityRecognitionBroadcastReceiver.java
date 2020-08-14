/*
package com.xp.nativeAndroid;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.google.android.gms.location.DetectedActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import static com.xp.nativeAndroid.CustomNativePlugin.ACTIVITY_TYPE;
import static com.xp.nativeAndroid.CustomNativePlugin.CAPTURED_ACTIVITY_LIST;


class UserActivityRecognitionBroadcastReceiver extends BroadcastReceiver {
    private static final String TAG = UserActivityRecognitionBroadcastReceiver.class.getSimpleName();
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
        Log.d(TAG, "onReceive: Broadcast called");

//        detectedActivities.clear();
        detectedActivities = intent.getParcelableArrayListExtra(CAPTURED_ACTIVITY_LIST);
        if (detectedActivities != null && detectedActivities.size() > 0) {
            for (DetectedActivity detectedActivity :
                    detectedActivities) {
                if (jsonArray != null)
                    jsonArray.put(getActivityEventJsonObject(getActivityString(detectedActivity.getType()), detectedActivity.getConfidence()));
            }
        }
        Log.d(TAG, "onReceive: " + jsonArray.toString());
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

    */
/**
     * Build JSONObject with fenceKey and fenceCurrentState value
     * and pass it to the plugin.
     *
     * @param activityType
     * @param activityConfidence
     *//*

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
}*/
