// The MIT License (MIT)

// Copyright (c) 2017 Mobisys GmbH
// Copyright (c) 2014 Wymsee, Inc

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
package com.ionicframework.auth.ionichttp.http;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JsonUtils {
  public static HashMap<String, String> getStringMap(JSONObject object) throws JSONException {
    HashMap<String, String> map = new HashMap<String, String>();

    if (object == null) {
      return map;
    }

    Iterator<?> i = object.keys();

    while (i.hasNext()) {
      String key = (String) i.next();
      map.put(key, object.getString(key));
    }
    return map;
  }

  public static HashMap<String, Object> getObjectMap(JSONObject object) throws JSONException {
    HashMap<String, Object> map = new HashMap<String, Object>();

    if (object == null) {
      return map;
    }

    Iterator<?> i = object.keys();

    while (i.hasNext()) {
      String key = (String) i.next();
      Object value = object.get(key);

      if (value instanceof JSONArray) {
        map.put(key, getObjectList((JSONArray) value));
      } else {
        map.put(key, object.get(key));
      }
    }
    return map;
  }

  public static ArrayList<Object> getObjectList(JSONArray array) throws JSONException {
    ArrayList<Object> list = new ArrayList<Object>();

    for (int i = 0; i < array.length(); i++) {
      list.add(array.get(i));
    }
    return list;
  }
}
