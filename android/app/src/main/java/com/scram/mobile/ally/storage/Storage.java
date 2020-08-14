package com.scram.mobile.ally.storage;

public interface Storage {
    void setString(String key, String value);
    String getString(String key, String defaultValue);
}
