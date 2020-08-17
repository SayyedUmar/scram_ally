#import "IonicHttp.h"
#import "IAC_BinaryResponseSerializer.h"
#import "IAC_TextResponseSerializer.h"
#import "IAC_TextRequestSerializer.h"
#import "IAC_AFHTTPSessionManager.h"
#import "IAC_SDNetworkActivityIndicator.h"

@interface IonicHttp()

- (void)setRequestHeaders:(NSDictionary*)headers forManager:(IAC_AFHTTPSessionManager*)manager;
- (void)handleSuccess:(NSMutableDictionary*)dictionary withResponse:(NSHTTPURLResponse*)response andData:(id)data;
- (void)handleError:(NSMutableDictionary*)dictionary withResponse:(NSHTTPURLResponse*)response error:(NSError*)error;
- (NSNumber*)getStatusCode:(NSError*) error;
- (NSMutableDictionary*)copyHeaderFields:(NSDictionary*)headerFields;
- (void)setTimeout:(NSTimeInterval)timeout forManager:(IAC_AFHTTPSessionManager*)manager;
- (void)setRedirect:(bool)redirect forManager:(IAC_AFHTTPSessionManager*)manager;

@end

@implementation IonicHttp {
    IAC_AFSecurityPolicy *securityPolicy;
}

- (void)pluginInitialize {
    securityPolicy = [IAC_AFSecurityPolicy policyWithPinningMode:IAC_AFSSLPinningModeNone];
}

- (void)setRequestSerializer:(NSString*)serializerName forManager:(IAC_AFHTTPSessionManager*)manager {
    if ([serializerName isEqualToString:@"json"]) {
        manager.requestSerializer = [IAC_AFJSONRequestSerializer serializer];
    } else if ([serializerName isEqualToString:@"utf8"]) {
        manager.requestSerializer = [IAC_TextRequestSerializer serializer];
    } else {
        manager.requestSerializer = [IAC_AFHTTPRequestSerializer serializer];
    }
}

- (void)setRequestHeaders:(NSDictionary*)headers forManager:(IAC_AFHTTPSessionManager*)manager {
    [headers enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop) {
        [manager.requestSerializer setValue:obj forHTTPHeaderField:key];
    }];
}

- (void)setRedirect:(bool)followRedirect forManager:(IAC_AFHTTPSessionManager*)manager {
    [manager setTaskWillPerformHTTPRedirectionBlock:^NSURLRequest * _Nonnull(NSURLSession * _Nonnull session,
        NSURLSessionTask * _Nonnull task, NSURLResponse * _Nonnull response, NSURLRequest * _Nonnull request) {

        if (followRedirect) {
            return request;
        } else {
            return nil;
        }
    }];
}

- (void)setTimeout:(NSTimeInterval)timeout forManager:(IAC_AFHTTPSessionManager*)manager {
    [manager.requestSerializer setTimeoutInterval:timeout];
}

- (void)setResponseSerializer:(NSString*)responseType forManager:(IAC_AFHTTPSessionManager*)manager {
    if ([responseType isEqualToString: @"text"]) {
        manager.responseSerializer = [IAC_TextResponseSerializer serializer];
    } else {
        manager.responseSerializer = [IAC_BinaryResponseSerializer serializer];
    }
}


- (void)handleSuccess:(NSMutableDictionary*)dictionary withResponse:(NSHTTPURLResponse*)response andData:(id)data {
    if (response != nil) {
        [dictionary setValue:response.URL.absoluteString forKey:@"url"];
        [dictionary setObject:[NSNumber numberWithInt:(int)response.statusCode] forKey:@"status"];
        [dictionary setObject:[self copyHeaderFields:response.allHeaderFields] forKey:@"headers"];
    }

    if (data != nil) {
        [dictionary setObject:data forKey:@"data"];
    }
}

- (void)handleError:(NSMutableDictionary*)dictionary withResponse:(NSHTTPURLResponse*)response error:(NSError*)error {
    if (response != nil) {
        [dictionary setValue:response.URL.absoluteString forKey:@"url"];
        [dictionary setObject:[NSNumber numberWithInt:(int)response.statusCode] forKey:@"status"];
        [dictionary setObject:[self copyHeaderFields:response.allHeaderFields] forKey:@"headers"];
        if (error.userInfo[IAC_AFNetworkingOperationFailingURLResponseBodyErrorKey]) {
            [dictionary setObject:error.userInfo[IAC_AFNetworkingOperationFailingURLResponseBodyErrorKey] forKey:@"error"];
        }
    } else {
        [dictionary setObject:[self getStatusCode:error] forKey:@"status"];
        [dictionary setObject:[error localizedDescription] forKey:@"error"];
    }
}

- (void)handleException:(NSException*)exception withCommand:(CDVInvokedUrlCommand*)command {
  IonicHttp* __weak weakSelf = self;

  NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
  [dictionary setValue:exception.userInfo forKey:@"error"];
  [dictionary setObject:[NSNumber numberWithInt:-1] forKey:@"status"];

  CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dictionary];
  [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (NSNumber*)getStatusCode:(NSError*) error {
    switch ([error code]) {
        case -1001:
            // timeout
            return [NSNumber numberWithInt:-4];
        case -1002:
            // unsupported URL
            return [NSNumber numberWithInt:-5];
        case -1003:
            // server not found
            return [NSNumber numberWithInt:-3];
        case -1009:
            // no connection
            return [NSNumber numberWithInt:-6];
        case -1200: // secure connection failed
        case -1201: // certificate has bad date
        case -1202: // certificate untrusted
        case -1203: // certificate has unknown root
        case -1204: // certificate is not yet valid
            // configuring SSL failed
            return [NSNumber numberWithInt:-2];
        default:
            return [NSNumber numberWithInt:-1];
    }
}

- (NSMutableDictionary*)copyHeaderFields:(NSDictionary *)headerFields {
    NSMutableDictionary *headerFieldsCopy = [[NSMutableDictionary alloc] initWithCapacity:headerFields.count];
    NSString *headerKeyCopy;

    for (NSString *headerKey in headerFields.allKeys) {
        headerKeyCopy = [[headerKey mutableCopy] lowercaseString];
        [headerFieldsCopy setValue:[headerFields objectForKey:headerKey] forKey:headerKeyCopy];
    }

    return headerFieldsCopy;
}

- (void)setServerTrustMode:(CDVInvokedUrlCommand*)command {
    NSString *certMode = [command.arguments objectAtIndex:0];

    if ([certMode isEqualToString: @"default"] || [certMode isEqualToString: @"legacy"]) {
        securityPolicy = [IAC_AFSecurityPolicy policyWithPinningMode:IAC_AFSSLPinningModeNone];
        securityPolicy.allowInvalidCertificates = NO;
        securityPolicy.validatesDomainName = YES;
    } else if ([certMode isEqualToString: @"nocheck"]) {
        securityPolicy = [IAC_AFSecurityPolicy policyWithPinningMode:IAC_AFSSLPinningModeNone];
        securityPolicy.allowInvalidCertificates = YES;
        securityPolicy.validatesDomainName = NO;
    } else if ([certMode isEqualToString: @"pinned"]) {
        securityPolicy = [IAC_AFSecurityPolicy policyWithPinningMode:IAC_AFSSLPinningModeCertificate];
        securityPolicy.allowInvalidCertificates = NO;
        securityPolicy.validatesDomainName = YES;
    }

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)get:(CDVInvokedUrlCommand*)command {
    IAC_AFHTTPSessionManager *manager = [IAC_AFHTTPSessionManager manager];
    manager.securityPolicy = securityPolicy;

    NSString *url = [command.arguments objectAtIndex:0];
    NSDictionary *headers = [command.arguments objectAtIndex:1];
    NSTimeInterval timeoutInSeconds = [[command.arguments objectAtIndex:2] doubleValue];
    bool followRedirect = [[command.arguments objectAtIndex:3] boolValue];
    NSString *responseType = [command.arguments objectAtIndex:4];

    [self setRequestSerializer: @"default" forManager: manager];
    [self setRequestHeaders: headers forManager: manager];
    [self setTimeout:timeoutInSeconds forManager:manager];
    [self setRedirect:followRedirect forManager:manager];
    [self setResponseSerializer:responseType forManager:manager];

    IonicHttp* __weak weakSelf = self;
    [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] startActivity];

    @try {
        [manager GET:url parameters:nil success:^(NSURLSessionTask *task, id responseObject) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            [self handleSuccess:dictionary withResponse:(NSHTTPURLResponse*)task.response andData:responseObject];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        } failure:^(NSURLSessionTask *task, NSError *error) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            [self handleError:dictionary withResponse:(NSHTTPURLResponse*)task.response error:error];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        }];
    }
    @catch (NSException *exception) {
        [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        [self handleException:exception withCommand:command];
    }
}

- (void)head:(CDVInvokedUrlCommand*)command {
    IAC_AFHTTPSessionManager *manager = [IAC_AFHTTPSessionManager manager];
    manager.securityPolicy = securityPolicy;
    manager.responseSerializer = [IAC_AFHTTPResponseSerializer serializer];

    NSString *url = [command.arguments objectAtIndex:0];
    NSDictionary *headers = [command.arguments objectAtIndex:1];
    NSTimeInterval timeoutInSeconds = [[command.arguments objectAtIndex:2] doubleValue];
    bool followRedirect = [[command.arguments objectAtIndex:3] boolValue];

    [self setRequestHeaders: headers forManager: manager];
    [self setTimeout:timeoutInSeconds forManager:manager];
    [self setRedirect:followRedirect forManager:manager];

    IonicHttp* __weak weakSelf = self;
    [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] startActivity];

    @try {
        [manager HEAD:url parameters:nil success:^(NSURLSessionTask *task) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            // no 'body' for HEAD request, omitting 'data'
            [self handleSuccess:dictionary withResponse:(NSHTTPURLResponse*)task.response andData:nil];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        } failure:^(NSURLSessionTask *task, NSError *error) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            [self handleError:dictionary withResponse:(NSHTTPURLResponse*)task.response error:error];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        }];
    }
    @catch (NSException *exception) {
        [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        [self handleException:exception withCommand:command];
    }
}

- (void)delete:(CDVInvokedUrlCommand*)command {
    IAC_AFHTTPSessionManager *manager = [IAC_AFHTTPSessionManager manager];
    manager.securityPolicy = securityPolicy;

    NSString *url = [command.arguments objectAtIndex:0];
    NSDictionary *headers = [command.arguments objectAtIndex:1];
    NSTimeInterval timeoutInSeconds = [[command.arguments objectAtIndex:2] doubleValue];
    bool followRedirect = [[command.arguments objectAtIndex:3] boolValue];
    NSString *responseType = [command.arguments objectAtIndex:4];

    [self setRequestSerializer: @"default" forManager: manager];
    [self setRequestHeaders: headers forManager: manager];
    [self setTimeout:timeoutInSeconds forManager:manager];
    [self setRedirect:followRedirect forManager:manager];
    [self setResponseSerializer:responseType forManager:manager];

    IonicHttp* __weak weakSelf = self;
    [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] startActivity];

    @try {
        [manager DELETE:url parameters:nil success:^(NSURLSessionTask *task, id responseObject) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            [self handleSuccess:dictionary withResponse:(NSHTTPURLResponse*)task.response andData:responseObject];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        } failure:^(NSURLSessionTask *task, NSError *error) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            [self handleError:dictionary withResponse:(NSHTTPURLResponse*)task.response error:error];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        }];
    }
    @catch (NSException *exception) {
        [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        [self handleException:exception withCommand:command];
    }
}

- (void)post:(CDVInvokedUrlCommand*)command {
    IAC_AFHTTPSessionManager *manager = [IAC_AFHTTPSessionManager manager];
    manager.securityPolicy = securityPolicy;

    NSString *url = [command.arguments objectAtIndex:0];
    NSDictionary *data = [command.arguments objectAtIndex:1];
    NSString *serializerName = [command.arguments objectAtIndex:2];
    NSDictionary *headers = [command.arguments objectAtIndex:3];
    NSTimeInterval timeoutInSeconds = [[command.arguments objectAtIndex:4] doubleValue];
    bool followRedirect = [[command.arguments objectAtIndex:5] boolValue];
    NSString *responseType = [command.arguments objectAtIndex:6];

    [self setRequestSerializer: serializerName forManager: manager];
    [self setRequestHeaders: headers forManager: manager];
    [self setTimeout:timeoutInSeconds forManager:manager];
    [self setRedirect:followRedirect forManager:manager];
    [self setResponseSerializer:responseType forManager:manager];

    IonicHttp* __weak weakSelf = self;
    [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] startActivity];

    @try {
        [manager POST:url parameters:data success:^(NSURLSessionTask *task, id responseObject) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            [self handleSuccess:dictionary withResponse:(NSHTTPURLResponse*)task.response andData:responseObject];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        } failure:^(NSURLSessionTask *task, NSError *error) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            [self handleError:dictionary withResponse:(NSHTTPURLResponse*)task.response error:error];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        }];
    }
    @catch (NSException *exception) {
        [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        [self handleException:exception withCommand:command];
    }
}

- (void)put:(CDVInvokedUrlCommand*)command {
    IAC_AFHTTPSessionManager *manager = [IAC_AFHTTPSessionManager manager];
    manager.securityPolicy = securityPolicy;

    NSString *url = [command.arguments objectAtIndex:0];
    NSDictionary *data = [command.arguments objectAtIndex:1];
    NSString *serializerName = [command.arguments objectAtIndex:2];
    NSDictionary *headers = [command.arguments objectAtIndex:3];
    NSTimeInterval timeoutInSeconds = [[command.arguments objectAtIndex:4] doubleValue];
    bool followRedirect = [[command.arguments objectAtIndex:5] boolValue];
    NSString *responseType = [command.arguments objectAtIndex:6];

    [self setRequestSerializer: serializerName forManager: manager];
    [self setRequestHeaders: headers forManager: manager];
    [self setTimeout:timeoutInSeconds forManager:manager];
    [self setRedirect:followRedirect forManager:manager];
    [self setResponseSerializer:responseType forManager:manager];

    IonicHttp* __weak weakSelf = self;
    [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] startActivity];

    @try {
        [manager PUT:url parameters:data success:^(NSURLSessionTask *task, id responseObject) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            [self handleSuccess:dictionary withResponse:(NSHTTPURLResponse*)task.response andData:responseObject];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        } failure:^(NSURLSessionTask *task, NSError *error) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            [self handleError:dictionary withResponse:(NSHTTPURLResponse*)task.response error:error];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        }];
    }
    @catch (NSException *exception) {
        [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        [self handleException:exception withCommand:command];
    }
}

- (void)patch:(CDVInvokedUrlCommand*)command {
    IAC_AFHTTPSessionManager *manager = [IAC_AFHTTPSessionManager manager];
    manager.securityPolicy = securityPolicy;

    NSString *url = [command.arguments objectAtIndex:0];
    NSDictionary *data = [command.arguments objectAtIndex:1];
    NSString *serializerName = [command.arguments objectAtIndex:2];
    NSDictionary *headers = [command.arguments objectAtIndex:3];
    NSTimeInterval timeoutInSeconds = [[command.arguments objectAtIndex:4] doubleValue];
    bool followRedirect = [[command.arguments objectAtIndex:5] boolValue];
    NSString *responseType = [command.arguments objectAtIndex:6];

    [self setRequestSerializer: serializerName forManager: manager];
    [self setRequestHeaders: headers forManager: manager];
    [self setTimeout:timeoutInSeconds forManager:manager];
    [self setRedirect:followRedirect forManager:manager];
    [self setResponseSerializer:responseType forManager:manager];

    IonicHttp* __weak weakSelf = self;
    [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] startActivity];

    @try {
        [manager PATCH:url parameters:data success:^(NSURLSessionTask *task, id responseObject) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            [self handleSuccess:dictionary withResponse:(NSHTTPURLResponse*)task.response andData:responseObject];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        } failure:^(NSURLSessionTask *task, NSError *error) {
            NSMutableDictionary *dictionary = [NSMutableDictionary dictionary];
            [self handleError:dictionary withResponse:(NSHTTPURLResponse*)task.response error:error];

            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dictionary];
            [weakSelf.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
            [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        }];
    }
    @catch (NSException *exception) {
        [[IAC_SDNetworkActivityIndicator sharedActivityIndicator] stopActivity];
        [self handleException:exception withCommand:command];
    }
}


@end
