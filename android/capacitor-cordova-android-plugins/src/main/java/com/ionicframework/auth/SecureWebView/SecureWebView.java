// The MIT License (MIT)

// Copyright (c) 2015 - Present, Eddy Verbruggen

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
package com.ionicframework.auth.securewebview;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import androidx.annotation.ColorInt;
import androidx.browser.customtabs.CustomTabsClient;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.browser.customtabs.CustomTabsSession;
import androidx.core.app.ActivityCompat;
import androidx.core.app.ActivityOptionsCompat;
import android.text.TextUtils;
import android.util.Log;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.ionicframework.auth.securewebview.shared.CustomTabsHelper;
import com.ionicframework.auth.securewebview.shared.CustomTabServiceHelper;

public class SecureWebView extends CordovaPlugin{

    public static final String TAG = "SecureWebView";
    public static final int CUSTOM_TAB_REQUEST_CODE = 1;

    private CustomTabServiceHelper mCustomTabPluginHelper;
    private boolean wasConnected;
    private  CallbackContext callbackContext;
    private Bundle mStartAnimationBundle;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        mCustomTabPluginHelper = new CustomTabServiceHelper(cordova.getActivity());
    }

    @Override
    public void onNewIntent(Intent intent) {
        String callbackId = cordova.getActivity()
                .getApplicationContext()
                .getSharedPreferences("com.ionicframework.auth-connect", Context.MODE_PRIVATE)
                .getString("latestCallbackId", null);

        if (callbackId == null) {
            return;
        }

        CallbackContext callback = new CallbackContext(callbackId, this.webView);

        String lastIntentString = intent.getDataString();
        JSONObject result = new JSONObject();
        try {
            result.put("callback", lastIntentString);
        } catch (JSONException e) {
            callback.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, "json error"));
        }
        callback.sendPluginResult(new PluginResult(PluginResult.Status.OK, result));
        // onNewIntent is called when the auth was OK, but not when the user closed the browser
        // so setting callbackContext to null the closed event is not fired on onStart
        callbackContext = null;
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        final Context context = this.cordova.getContext();

        switch (action) {
            case "isAvailable":
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, mCustomTabPluginHelper.isAvailable()));
                return true;

            case "show": {

                cordova.getActivity()
                        .getApplicationContext()
                        .getSharedPreferences("com.ionicframework.auth-connect", Context.MODE_PRIVATE)
                        .edit()
                        .putString("latestCallbackId", callbackContext.getCallbackId())
                        .apply();
                final JSONObject options = args.getJSONObject(0);
                final String url = options.optString("url");
                if(TextUtils.isEmpty(url)){
                    JSONObject result = new JSONObject();
                    result.put("error", "expected argument 'url' to be non empty string.");
                    PluginResult pluginResult = new PluginResult(PluginResult.Status.ERROR, result);
                    // callbackContext.sendPluginResult(pluginResult);
                    return true;
                }

                final String toolbarColor = options.optString("toolbarColor");
                final Boolean showDefaultShareMenuItem = options.optBoolean("showDefaultShareMenuItem");
                String transition = "";
                mStartAnimationBundle = null;
                final Boolean animated = options.optBoolean("animated", true);
                if(animated) transition = options.optString("transition", "slide");

                PluginResult pluginResult;
                JSONObject result = new JSONObject();
                if(isAvailable()) {
                    try {
                        this.show(url, getColor(toolbarColor), showDefaultShareMenuItem, transition);
                        result.put("event", "loaded");
//                        pluginResult = new PluginResult(PluginResult.Status.OK, result);
//                        pluginResult.setKeepCallback(true);
                        this.callbackContext = callbackContext;
                    } catch (Exception ex) {
                        result.put("error", ex.getMessage());
                        pluginResult = new PluginResult(PluginResult.Status.ERROR, result);
                        callbackContext.sendPluginResult(pluginResult);
                    }
                } else {
                    result.put("error", "custom tabs are not available");
                    pluginResult = new PluginResult(PluginResult.Status.ERROR, result);
                    callbackContext.sendPluginResult(pluginResult);
                }
                return true;
            }
            case "getViewHandlerPackages": {
                PluginResult pluginResult;
                final JSONObject result = new JSONObject();
                result.put("defaultHandler", CustomTabsHelper.getDefaultViewHandlerPackageName(context));
                result.put("customTabsImplementations", new JSONArray(CustomTabsHelper.getPackagesSupportingCustomTabs(context)));
                pluginResult = new PluginResult(PluginResult.Status.OK, result);
                callbackContext.sendPluginResult(pluginResult);
                return true;
            }
            case "useCustomTabsImplementation": {
                PluginResult pluginResult;
                JSONObject result = new JSONObject();
                final String packageName = args.optString(0);
                if(TextUtils.isEmpty(packageName)) {
                    result.put("error", "expected argument 'packageName' to be non empty string.");
                    pluginResult = new PluginResult(PluginResult.Status.ERROR, result);
                } else {
                    try {
                        mCustomTabPluginHelper.setPackageNameToBind(packageName, context);
                        pluginResult = new PluginResult(PluginResult.Status.OK, true);
                    } catch (CustomTabsHelper.InvalidPackageException e) {
                        pluginResult = new PluginResult(PluginResult.Status.ERROR, "Invalid package: "+packageName);
                    }
                }
                callbackContext.sendPluginResult(pluginResult);
                return true;
            }
            case "connectToService": {
                if (bindCustomTabsService())
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, true));
                else
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, "Failed to connect to service"));
                return true;
            }
            case "warmUp": {
                if (warmUp()) {
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, true));
                } else {
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, "Failed to warm up service"));
                }
                return true;
            }
            case "mayLaunchUrl": {
                final String url = args.getString(0);
                if(mayLaunchUrl(url)){
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, true));
                } else {
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR,String.format("Failed prepare to launch url: %s", url)));
                }
                return true;
            }
            case "hide": {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
                return true;
            }
        }
        return false;
    }

    private boolean isAvailable(){
        return mCustomTabPluginHelper.isAvailable();
    }

    private void show(String url, @ColorInt int toolbarColor, boolean showDefaultShareMenuItem, String transition) {
        CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder(getSession())
                .setToolbarColor(toolbarColor);
        if(showDefaultShareMenuItem)
            builder.addDefaultShareMenuItem();
        if(!TextUtils.isEmpty(transition))
            addTransition(builder, transition);


        CustomTabsIntent customTabsIntent = builder.build();

        String packageName = CustomTabsHelper.getPackageNameToUse(cordova.getActivity());
        if ( packageName != null ) {
           customTabsIntent.intent.setPackage(packageName);
        }

        startCustomTabActivity(url, customTabsIntent.intent);
    }

    private void addTransition(CustomTabsIntent.Builder builder, String transition) {
        final String animType = "anim";
        switch (transition){
            case ("slide"):
            default:
                mStartAnimationBundle = ActivityOptionsCompat.makeCustomAnimation(
                        cordova.getActivity(), getIdentifier("slide_in_right", animType), getIdentifier("slide_out_left", animType)).toBundle();
                builder.setExitAnimations(cordova.getActivity(), getIdentifier("slide_in_left", animType), getIdentifier("slide_out_right", animType));
        }
    }

    private void startCustomTabActivity(String url, Intent intent) {
        intent.setData(Uri.parse(url));
        if(mStartAnimationBundle == null)
            cordova.startActivityForResult(this, intent, CUSTOM_TAB_REQUEST_CODE);
        else {
            cordova.setActivityResultCallback(this);
            ActivityCompat.startActivityForResult(cordova.getActivity(), intent, CUSTOM_TAB_REQUEST_CODE, mStartAnimationBundle);
        }
    }

    private boolean warmUp(){
        boolean success = false;
        final CustomTabsClient client = mCustomTabPluginHelper.getClient();
        if (client != null) success = client.warmup(0);
        return success;
    }

    private boolean mayLaunchUrl(String url){
        boolean success = false;
        if (mCustomTabPluginHelper.getClient() != null) {
            CustomTabsSession session = getSession();
            success = session.mayLaunchUrl(Uri.parse(url), null, null);
        }

        return success;
    }

    private int getColor(String color) {
        if(TextUtils.isEmpty(color)) return Color.LTGRAY;

        try {
            return Color.parseColor(color);
        } catch (NumberFormatException ex) {
            Log.i(TAG, String.format("Unable to parse Color: %s", color));
            return Color.LTGRAY;
        }
    }

    private CustomTabsSession getSession() {
        return mCustomTabPluginHelper.getSession();
    }

    private boolean bindCustomTabsService() {
        return mCustomTabPluginHelper.bindCustomTabsService(cordova.getActivity());
    }

    private boolean unbindCustomTabsService() {
        return mCustomTabPluginHelper.unbindCustomTabsService(cordova.getActivity());
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
    }

    private int getIdentifier(String name, String type) {
        final Activity activity = cordova.getActivity();
        return activity.getResources().getIdentifier(name, type, activity.getPackageName());
    }

    @Override
    public void onStop() {
        wasConnected = unbindCustomTabsService();
        super.onStop();
    }

    @Override
    public void onStart() {
        if(wasConnected){
            bindCustomTabsService();
        }
        super.onStart();
    }

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        // onResume is fired when Cordova's Activity starts
        // (when the browser closes). Fire the closed event here
        // if callbackContext is not null should be guaranteed to be called after
        // onNewIntent
        if(callbackContext != null){
            JSONObject result = new JSONObject();
            try {
                result.put("event", "closed");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            callbackContext.success(result);
            callbackContext = null;
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mCustomTabPluginHelper.setConnectionCallback(null);
    }
}
