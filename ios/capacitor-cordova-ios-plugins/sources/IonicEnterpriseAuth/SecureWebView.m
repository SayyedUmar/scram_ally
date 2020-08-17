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

#import "SecureWebView.h"

NSString* kSharedWebview = @"shared";
NSString* kPrivateWebview = @"private";

enum webViews {
  BestBySystem,
  SharedSession,
  PrivateSession,
};


@implementation SecureWebView
{
  #pragma clang diagnostic push
  #pragma clang diagnostic ignored "-Wpartial-availability"
  SFSafariViewController *_safariVC;
  SFAuthenticationSession *_authenticationVC;
  ASWebAuthenticationSession *_webAuthenticationVC;
  #pragma clang diagnostic pop

}

#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 130000

- (ASPresentationAnchor)presentationAnchorForWebAuthenticationSession:(ASWebAuthenticationSession *)session  API_AVAILABLE(ios(13.0)){
   return self.viewController.view.window;
}

#endif

- (void) isAvailable:(CDVInvokedUrlCommand*)command {
  bool avail = NSClassFromString(@"SFSecureWebView") != nil;
  CDVPluginResult * pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:avail];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)handleOpenURL:(NSNotification*)notification
{
    NSURL* url = [notification object];
    if ([url isKindOfClass:[NSURL class]] && self.callbackId != nil) {
        CDVPluginResult * pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{@"callback": url.absoluteString}];
        [self.commandDelegate  sendPluginResult:pluginResult callbackId:self.callbackId];
        self.callbackId = nil;
        [_safariVC dismissViewControllerAnimated:true completion:nil];
    }
}

- (void) show:(CDVInvokedUrlCommand*)command {
  NSDictionary* options = [command.arguments objectAtIndex:0];
  // check for web view option
  enum webViews requestedWebView = BestBySystem;
  NSString* webViewString = options[@"iosWebView"];
  if(webViewString == nil) {
    requestedWebView = BestBySystem;
  }
  else if ([kSharedWebview caseInsensitiveCompare:webViewString] == NSOrderedSame) {
    requestedWebView = SharedSession;
  }
  else if ([kPrivateWebview caseInsensitiveCompare:webViewString] == NSOrderedSame) {
    requestedWebView = PrivateSession;
  }
  else {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
      messageAsString:@"unsupported webView option requested"] callbackId:command.callbackId];
    return;
  }


  // parse url
  NSString* urlString = options[@"url"];
  NSString* callbackUrlString = options[@"callbackUrl"];
  NSURL* callbackUrl = [NSURL URLWithString:callbackUrlString];
  if (urlString == nil) {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
      messageAsString:@"url can't be empty"] callbackId:command.callbackId];
    return;
  }
  if (![[urlString lowercaseString] hasPrefix:@"http"]) {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
      messageAsString:@"url must start with http or https"] callbackId:command.callbackId];
    return;
  }
  NSURL *url = [NSURL URLWithString:urlString];
  if (url == nil) {
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
      messageAsString:@"bad url"] callbackId:command.callbackId];
    return;
  }
  self.animated = [options[@"animated"] isEqual:[NSNumber numberWithBool:YES]];
  self.callbackId = command.callbackId;

  bool openedUserAgent = FALSE;

  // iOS 12 and later, use ASWebAuthenticationSession
  if (@available(iOS 12.0, *)) {

    // ASWebAuthenticationSession doesn't work with guided access (rdar://40809553)
    if ((requestedWebView == SharedSession || requestedWebView == BestBySystem) && !UIAccessibilityIsGuidedAccessEnabled()) {
      ASWebAuthenticationSession *authenticationVC = [[ASWebAuthenticationSession alloc] initWithURL:url
        callbackURLScheme:callbackUrl.scheme
        completionHandler:^(NSURL * _Nullable callbackURL, NSError * _Nullable error)
      {
        if (callbackURL) {
          NSLog(@"show::completionHanlder: ASWebAuthenticationSession: Callback: %@", callbackURL);

          CDVPluginResult * pluginResult = [CDVPluginResult
            resultWithStatus:CDVCommandStatus_OK
            messageAsDictionary:@{@"event":@"opened", @"callback":callbackURL.absoluteString}];

          [pluginResult setKeepCallback:[NSNumber numberWithBool:YES]];
          [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
        } else {
          NSLog(@"show::completionHanlder: ASWebAuthenticationSession: Error: %@", error);

          NSString *messageString = [error localizedDescription];
          NSString *moreString = [error localizedFailureReason] ?
            [error localizedFailureReason] :
            nil;
          messageString = [NSString stringWithFormat:@"%@. %@", messageString, moreString];

          [self.commandDelegate sendPluginResult:[CDVPluginResult
            resultWithStatus:CDVCommandStatus_ERROR
            messageAsString:messageString] callbackId:command.callbackId];

          return;
        }
      }];
      _webAuthenticationVC = authenticationVC;

#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 130000
      if (@available(iOS 13.0, *)) {
        authenticationVC.presentationContextProvider = self;
      }
#endif

      openedUserAgent = [authenticationVC start];
    }
  }
  // iOS 11, use SFAuthenticationSession
  if (@available(iOS 11.0, *)) {
    // SFAuthenticationSession doesn't work with guided access (rdar://40809553)
    if ((requestedWebView == SharedSession || requestedWebView == BestBySystem) &&
        !openedUserAgent && !UIAccessibilityIsGuidedAccessEnabled()) {
      SFAuthenticationSession *authenticationVC = [[SFAuthenticationSession alloc] initWithURL:url
        callbackURLScheme:callbackUrl.scheme
        completionHandler:^(NSURL * _Nullable callbackURL, NSError * _Nullable error)
      {
        if (callbackURL) {
          NSLog(@"show::completionHanlder: SFAuthenticationSession: Callback: %@", callbackURL);

          CDVPluginResult * pluginResult =
            [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
              messageAsDictionary:@{@"event":@"opened", @"callback":callbackURL.absoluteString}];
          [pluginResult setKeepCallback:[NSNumber numberWithBool:YES]];
          [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
        } else {
          NSLog(@"show::completionHanlder: SFAuthenticationSession: Error: %@", error);

          NSString *messageString = [error localizedDescription];
          NSString *moreString = [error localizedFailureReason] ?
            [error localizedFailureReason] :
            nil;
          messageString = [NSString stringWithFormat:@"%@. %@", messageString, moreString];

          [self.commandDelegate sendPluginResult:[CDVPluginResult
            resultWithStatus:CDVCommandStatus_ERROR
            messageAsString:messageString] callbackId:command.callbackId];
          return;
        }
      }];
      _authenticationVC = authenticationVC;
      openedUserAgent = [authenticationVC start];
    }
  }
  // iOS 9 and 10, use SFSafariViewController
  if (@available(iOS 9.0, *)) {
    if (!openedUserAgent) {
      SFSafariViewController *safariVC = [[SFSafariViewController alloc] initWithURL:url];
      (void)safariVC.view;
      safariVC.delegate = self;
      _safariVC = safariVC;
      [self.viewController presentViewController:safariVC animated:YES completion:nil];
      NSString *tintColor = options[@"tintColor"];
      NSString *controlTintColor = options[@"controlTintColor"];
      NSString *barColor = options[@"barColor"];

      // if only tintColor is set, use that as the controlTintColor for iOS 10
      if (barColor == nil && controlTintColor == nil) {
        controlTintColor = tintColor;
      } else if (tintColor == nil) {
        tintColor = controlTintColor;
      }

      if (tintColor != nil) {
      #if __IPHONE_OS_VERSION_MAX_ALLOWED >= 100000 // iOS 10.0 supported (compile time)
        if (IsAtLeastiOSVersion(@"10")) { // iOS 10.0 supported (runtime)
          _safariVC.preferredControlTintColor = [self colorFromHexString:controlTintColor];
        } else {
          _safariVC.view.tintColor = [self colorFromHexString:tintColor];
        }
      #else
        _safariVC.view.tintColor = [self colorFromHexString:tintColor];
      #endif
      }

      #if __IPHONE_OS_VERSION_MAX_ALLOWED >= 100000 // iOS 10.0 supported
      if (IsAtLeastiOSVersion(@"10")) { // iOS 10.0 supported (runtime)
        if (barColor != nil) {
          _safariVC.preferredBarTintColor = [self colorFromHexString:barColor];
        }
      }
      #endif

      NSLog(@"show::completionHanlder: SFSafariViewController");

      self.callbackId = command.callbackId;
      openedUserAgent = YES;
    }
  }

  if (!openedUserAgent) {
    [self.commandDelegate sendPluginResult:[CDVPluginResult
      resultWithStatus:CDVCommandStatus_ERROR
      messageAsString:@"Unable to open Safari."] callbackId:command.callbackId];
  }
}

- (UIModalTransitionStyle) getTransitionStyle:(NSString*) input {
  if (input == nil) {
    return UIModalTransitionStyleCoverVertical;
  } else if ([input isEqualToString:@"curl"]) {
    return UIModalTransitionStylePartialCurl;
  } else if ([input isEqualToString:@"fade"]) {
    return UIModalTransitionStyleCrossDissolve;
  } else if ([input isEqualToString:@"flip"]) {
    return UIModalTransitionStyleFlipHorizontal;
  } else {
    return UIModalTransitionStyleCoverVertical;
  }
}

- (UIColor *)colorFromHexString:(NSString *)hexString {
    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:hexString];
    [scanner setScanLocation:1]; // bypass '#' character
    [scanner scanHexInt:&rgbValue];
    return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0 green:((rgbValue & 0xFF00) >> 8)/255.0 blue:(rgbValue & 0xFF)/255.0 alpha:1.0];
}

- (void) hide:(CDVInvokedUrlCommand*)command {
  if (_safariVC != nil) {
    SFSafariViewController *childVc = [self.viewController.childViewControllers lastObject];
    if (childVc != nil) {
      [childVc willMoveToParentViewController:nil];
      [childVc.view removeFromSuperview];
      [childVc removeFromParentViewController];
      childVc = nil;
    }

    [_safariVC dismissViewControllerAnimated:self.animated completion:nil];
    _safariVC = nil;
  }

  if(_authenticationVC != nil) {
    [_authenticationVC cancel];
    _authenticationVC = nil;
  }

  if(_webAuthenticationVC != nil) {
    [_webAuthenticationVC cancel];
    _webAuthenticationVC = nil;
  }

  [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] callbackId:command.callbackId];
}

# pragma mark - SFSafariViewControllerDelegate

/*! @abstract Delegate callback called when the user taps the Done button.
    Upon this call, the view controller is dismissed modally.
 */
- (void)safariViewControllerDidFinish:(SFSafariViewController *)controller {
  if (self.callbackId != nil) {
    NSString * cbid = [self.callbackId copy];
    self.callbackId = nil;
    CDVPluginResult * pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{@"event":@"closed"}];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:cbid];
  }
}

/*! @abstract Invoked when the initial URL load is complete.
    @param success YES if loading completed successfully, NO if loading failed.
    @discussion This method is invoked when SFSafariViewController completes the loading of the URL that you pass
    to its initializer. It is not invoked for any subsequent page loads in the same SFSafariViewController instance.
 */
- (void)safariViewController:(SFSafariViewController *)controller didCompleteInitialLoad:(BOOL)didLoadSuccessfully {
  if (self.callbackId != nil) {
//    CDVPluginResult * pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:@{@"event":@"loaded"}];
//    [pluginResult setKeepCallback:[NSNumber numberWithBool:YES]];
//    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackId];
  }
}

- (NSArray<UIActivity *> *)safariViewController:(SFSafariViewController *) controller activityItemsForURL:(NSURL *)URL title:(nullable NSString *)title {
    if(self.activityItemProvider)
        return [self.activityItemProvider SecureWebView:controller activityItemsForURL:URL title:title];
    else
        return nil;
}

@end
