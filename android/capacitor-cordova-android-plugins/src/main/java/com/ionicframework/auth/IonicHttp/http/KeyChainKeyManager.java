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

import android.content.Context;
import android.security.KeyChain;

import java.net.Socket;
import java.security.Principal;
import java.security.PrivateKey;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.X509ExtendedKeyManager;

public class KeyChainKeyManager extends X509ExtendedKeyManager {
  private final String alias;
  private final X509Certificate[] chain;
  private final PrivateKey key;

  public KeyChainKeyManager(String alias, PrivateKey key, X509Certificate[] chain) {
    this.alias = alias;
    this.key = key;
    this.chain = chain;
  }

  @Override
  public String chooseClientAlias(String[] keyTypes, Principal[] issuers, Socket socket) {
    return this.alias;
  }

  @Override
  public X509Certificate[] getCertificateChain(String alias) {
    return chain;
  }

  @Override
  public PrivateKey getPrivateKey(String alias) {
    return key;
  }

  @Override
  public final String chooseServerAlias(String keyType, Principal[] issuers, Socket socket) {
    // not a client SSLSocket callback
    throw new UnsupportedOperationException();
  }

  @Override
  public final String[] getClientAliases(String keyType, Principal[] issuers) {
    // not a client SSLSocket callback
    throw new UnsupportedOperationException();
  }

  @Override
  public final String[] getServerAliases(String keyType, Principal[] issuers) {
    // not a client SSLSocket callback
    throw new UnsupportedOperationException();
  }
}
