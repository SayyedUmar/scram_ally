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

import java.nio.ByteBuffer;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;
import java.nio.charset.CodingErrorAction;
import java.nio.charset.MalformedInputException;

public class HttpBodyDecoder {
  private static final String[] ACCEPTED_CHARSETS = new String[] { "UTF-8", "ISO-8859-1" };

  public static String decodeBody(byte[] body, String charsetName)
      throws CharacterCodingException, MalformedInputException {

    return decodeBody(ByteBuffer.wrap(body), charsetName);
  }

  public static String decodeBody(ByteBuffer body, String charsetName)
      throws CharacterCodingException, MalformedInputException {

    if (charsetName == null) {
      return tryDecodeByteBuffer(body);
    } else {
      return decodeByteBuffer(body, charsetName);
    }
  }

  private static String tryDecodeByteBuffer(ByteBuffer buffer)
      throws CharacterCodingException, MalformedInputException {

    for (int i = 0; i < ACCEPTED_CHARSETS.length - 1; i++) {
      try {
        return decodeByteBuffer(buffer, ACCEPTED_CHARSETS[i]);
      } catch (MalformedInputException e) {
        continue;
      } catch (CharacterCodingException e) {
        continue;
      }
    }

    return decodeBody(buffer, ACCEPTED_CHARSETS[ACCEPTED_CHARSETS.length - 1]);
  }

  private static String decodeByteBuffer(ByteBuffer buffer, String charsetName)
      throws CharacterCodingException, MalformedInputException {

    return createCharsetDecoder(charsetName).decode(buffer).toString();
  }

  private static CharsetDecoder createCharsetDecoder(String charsetName) {
    return Charset.forName(charsetName).newDecoder().onMalformedInput(CodingErrorAction.REPORT)
        .onUnmappableCharacter(CodingErrorAction.REPORT);
  }
}
