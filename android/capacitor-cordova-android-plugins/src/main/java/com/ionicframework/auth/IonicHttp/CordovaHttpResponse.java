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
package com.ionicframework.auth.ionichttp;

import java.nio.ByteBuffer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import android.text.TextUtils;
import android.util.Log;
import android.util.Base64;

class CordovaHttpResponse {
  private int status;
  private String url;
  private Map<String, List<String>> headers;
  private String body;
  private byte[] rawData;
  private JSONObject fileEntry;
  private boolean hasFailed;
  private boolean isFileOperation;
  private boolean isRawResponse;
  private String error;

  public void setStatus(int status) {
    this.status = status;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public void setHeaders(Map<String, List<String>> headers) {
    this.headers = headers;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public void setData(byte[] rawData) {
    this.isRawResponse = true;
    this.rawData = rawData;
  }

  public void setFileEntry(JSONObject entry) {
    this.isFileOperation = true;
    this.fileEntry = entry;
  }

  public void setErrorMessage(String message) {
    this.hasFailed = true;
    this.error = message;
  }

  public boolean hasFailed() {
    return this.hasFailed;
  }

  public JSONObject toJSON() throws JSONException {
    JSONObject json = new JSONObject();

    json.put("status", this.status);
    json.put("url", this.url);

    if (this.headers != null && !this.headers.isEmpty()) {
      json.put("headers", new JSONObject(getFilteredHeaders()));
    }

    if (this.hasFailed) {
      json.put("error", this.error);
    } else if (this.isFileOperation) {
      json.put("file", this.fileEntry);
    } else if (this.isRawResponse) {
      json.put("data", Base64.encodeToString(this.rawData, Base64.DEFAULT));
    } else {
      json.put("data", this.body);
    }

    return json;
  }

  private Map<String, String> getFilteredHeaders() throws JSONException {
    Map<String, String> filteredHeaders = new HashMap<String, String>();

    for (Map.Entry<String, List<String>> entry : this.headers.entrySet()) {
      String key = entry.getKey();
      List<String> value = entry.getValue();

      if ((key != null) && (!value.isEmpty())) {
        filteredHeaders.put(key.toLowerCase(), TextUtils.join(", ", value));
      }
    }

    return filteredHeaders;
  }
}
