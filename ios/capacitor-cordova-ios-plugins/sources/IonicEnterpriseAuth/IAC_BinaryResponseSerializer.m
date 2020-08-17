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

#import "IAC_BinaryResponseSerializer.h"

static NSError * AFErrorWithUnderlyingError(NSError *error, NSError *underlyingError) {
  if (!error) {
    return underlyingError;
  }

  if (!underlyingError || error.userInfo[NSUnderlyingErrorKey]) {
    return error;
  }

  NSMutableDictionary *mutableUserInfo = [error.userInfo mutableCopy];
  mutableUserInfo[NSUnderlyingErrorKey] = underlyingError;

  return [[NSError alloc] initWithDomain:error.domain code:error.code userInfo:mutableUserInfo];
}

static BOOL AFErrorOrUnderlyingErrorHasCodeInDomain(NSError *error, NSInteger code, NSString *domain) {
  if ([error.domain isEqualToString:domain] && error.code == code) {
    return YES;
  } else if (error.userInfo[NSUnderlyingErrorKey]) {
    return AFErrorOrUnderlyingErrorHasCodeInDomain(error.userInfo[NSUnderlyingErrorKey], code, domain);
  }

  return NO;
}

@implementation IAC_BinaryResponseSerializer

+ (instancetype)serializer {
  IAC_BinaryResponseSerializer *serializer = [[self alloc] init];
  return serializer;
}

- (instancetype)init {
  self = [super init];

  if (!self) {
    return nil;
  }

  self.acceptableContentTypes = nil;

  return self;
}

- (NSString*)decodeResponseData:(NSData*)rawResponseData withEncoding:(CFStringEncoding)cfEncoding {
  NSStringEncoding nsEncoding;
  NSString* decoded = nil;

  if (cfEncoding != kCFStringEncodingInvalidId) {
    nsEncoding = CFStringConvertEncodingToNSStringEncoding(cfEncoding);
  }

  NSStringEncoding supportedEncodings[6] = {
    NSUTF8StringEncoding, NSWindowsCP1252StringEncoding, NSISOLatin1StringEncoding,
    NSISOLatin2StringEncoding, NSASCIIStringEncoding, NSUnicodeStringEncoding
  };

  for (int i = 0; i < sizeof(supportedEncodings) / sizeof(NSStringEncoding) && !decoded; ++i) {
    if (cfEncoding == kCFStringEncodingInvalidId || nsEncoding == supportedEncodings[i]) {
      decoded = [[NSString alloc] initWithData:rawResponseData encoding:supportedEncodings[i]];
    }
  }

  return decoded;
}

- (CFStringEncoding) getEncoding:(NSURLResponse *)response {
  CFStringEncoding encoding = kCFStringEncodingInvalidId;

  if (response.textEncodingName) {
    encoding = CFStringConvertIANACharSetNameToEncoding((CFStringRef)response.textEncodingName);
  }

  return encoding;
}

#pragma mark -

- (BOOL)validateResponse:(NSHTTPURLResponse *)response
                    data:(NSData *)data
                   error:(NSError * __autoreleasing *)error
{
  if (response && [response isKindOfClass:[NSHTTPURLResponse class]]) {
    if (self.acceptableStatusCodes && ![self.acceptableStatusCodes containsIndex:(NSUInteger)response.statusCode] && [response URL]) {
      NSMutableDictionary *mutableUserInfo = [@{
        NSLocalizedDescriptionKey: [NSString stringWithFormat:NSLocalizedStringFromTable(@"Request failed: %@ (%ld)", @"AFNetworking", nil), [NSHTTPURLResponse localizedStringForStatusCode:response.statusCode], (long)response.statusCode],
        NSURLErrorFailingURLErrorKey: [response URL],
        IAC_AFNetworkingOperationFailingURLResponseErrorKey: response,
      } mutableCopy];

      if (data) {
        mutableUserInfo[IAC_AFNetworkingOperationFailingURLResponseDataErrorKey] = data;

        // trying to decode error message in body
        mutableUserInfo[IAC_AFNetworkingOperationFailingURLResponseBodyErrorKey] = [self decodeResponseData:data withEncoding:[self getEncoding:response]];
      }

      if (error) {
        *error = [NSError errorWithDomain:IAC_AFURLResponseSerializationErrorDomain code:NSURLErrorBadServerResponse userInfo:mutableUserInfo];
      }

      return NO;
    }
  }

  return YES;
}

#pragma mark - IAC_AFURLResponseSerialization

- (id)responseObjectForResponse:(NSURLResponse *)response
                           data:(NSData *)data
                          error:(NSError *__autoreleasing *)error
{
  if (![self validateResponse:(NSHTTPURLResponse *)response data:data error:error]) {
    if (!error || AFErrorOrUnderlyingErrorHasCodeInDomain(*error, NSURLErrorCannotDecodeContentData, IAC_AFURLResponseSerializationErrorDomain)) {
      return nil;
    }
  }

  return [data base64EncodedStringWithOptions:0];
}

@end
