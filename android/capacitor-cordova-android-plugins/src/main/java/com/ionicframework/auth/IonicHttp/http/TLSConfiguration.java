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

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.KeyManager;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;

import com.ionicframework.auth.ionichttp.http.TLSSocketFactory;

public class TLSConfiguration {
  private TrustManager[] trustManagers;
  private KeyManager[] keyManagers;
  private HostnameVerifier hostnameVerifier;

  private SSLSocketFactory socketFactory;

  public void setHostnameVerifier(HostnameVerifier hostnameVerifier) {
    this.hostnameVerifier = hostnameVerifier;
  }

  public void setKeyManagers(KeyManager[] keyManagers) {
    this.keyManagers = keyManagers;
    this.socketFactory = null;
  }

  public void setTrustManagers(TrustManager[] trustManagers) {
    this.trustManagers = trustManagers;
    this.socketFactory = null;
  }

  public HostnameVerifier getHostnameVerifier() {
    return this.hostnameVerifier;
  }

  public SSLSocketFactory getTLSSocketFactory() throws IOException {
    if (this.socketFactory != null) {
      return this.socketFactory;
    }

    try {
      SSLContext context = SSLContext.getInstance("TLS");

      context.init(this.keyManagers, this.trustManagers, new SecureRandom());

      if (android.os.Build.VERSION.SDK_INT < 20) {
        this.socketFactory = new TLSSocketFactory(context);
      } else {
        this.socketFactory = context.getSocketFactory();
      }

      return this.socketFactory;
    } catch (GeneralSecurityException e) {
      IOException ioException = new IOException("Security exception occured while configuring TLS context");
      ioException.initCause(e);
      throw ioException;
    }
  }
}
