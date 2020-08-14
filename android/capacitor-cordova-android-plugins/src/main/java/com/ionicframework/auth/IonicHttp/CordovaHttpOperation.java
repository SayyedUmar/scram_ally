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

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSocketFactory;

import com.ionicframework.auth.ionichttp.http.TLSConfiguration;

import org.apache.cordova.CallbackContext;
import org.json.JSONObject;

class CordovaHttpOperation extends CordovaHttpBase {
  public CordovaHttpOperation(String method, String url, String serializer, Object data, JSONObject headers,
      int timeout, boolean followRedirects, String responseType, TLSConfiguration tlsConfiguration,
      CallbackContext callbackContext) {

    super(method, url, serializer, data, headers, timeout, followRedirects, responseType, tlsConfiguration,
        callbackContext);
  }

  public CordovaHttpOperation(String method, String url, JSONObject headers, int timeout, boolean followRedirects,
      String responseType, TLSConfiguration tlsConfiguration, CallbackContext callbackContext) {

    super(method, url, headers, timeout, followRedirects, responseType, tlsConfiguration, callbackContext);
  }
}
