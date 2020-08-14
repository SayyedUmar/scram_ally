package com.scram.mobile.ally.storage;

import android.content.Context;
import android.content.SharedPreferences;

public class AppCache implements Storage {
    private Context context;
    private static AppCache appCache;
    static SharedPreferences sharedPreferences;
    private static final String PREFERENCE_NAME = "AllyPreferences";
    private final String KEY_TOKEN = "token";
    private final String KEY_PANIC_BUTTON = "panicBtnNumber";

    public String get_VICTIM_DETAILS() {
        return getString(KEY_VICTIM_DETAILS, "");
    }

    private final String KEY_VICTIM_DETAILS = "victimDetails";

    public void set_VICTIM_DETAILS(String vd) {
        setString(KEY_VICTIM_DETAILS, vd);
    }

    private final String KEY_VICTIM_IMEI = "deviceImei";

    public String get_VICTIM_IMEI() {
        return getString(KEY_VICTIM_IMEI, "");
    }

    public void set_VICTIM_IMEI(String imei) {
        setString(KEY_VICTIM_IMEI, imei);
    }

    public void setPanicButtonNumber(String num) {
        setString(KEY_PANIC_BUTTON, num);
    }

    public String getPanicButtonNumber() {
        return getString(KEY_PANIC_BUTTON, "");
    }

    public static AppCache getInstance(Context context) {
        if (appCache == null) {
            sharedPreferences = context.getSharedPreferences(PREFERENCE_NAME, Context.MODE_PRIVATE);
            appCache = new AppCache();
        }
        return appCache;
    }

    @Override
    public void setString(String key, String value) {
        sharedPreferences.edit().putString(key, value).commit();
    }

    @Override
    public String getString(String key, String defaultValue) {
        return sharedPreferences.getString(key, defaultValue);
    }

    public void setToken(String token) {
        setString(KEY_TOKEN, token);
    }

    public String getToken() {
        return getString(KEY_TOKEN, "");
    }

}
