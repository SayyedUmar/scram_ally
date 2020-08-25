import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Network } from '@ionic-native/network/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialNumberPageModule } from './modal/dial-number/dial-number.module';
import { TourSwipePageModule } from './modal/tour-swipe/tour-swipe.module';
import { TermsConditionsPageModule } from './pages/terms-conditions/terms-conditions.module';
import { InterceptorService } from './provider/interceptor/interceptor.service';
import { SharedModule } from './shared/shared.module';
import { metaReducers, reducers } from './store/reducers';
// import { FCM } from '@ionic-native/fcm/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicSwipeAllModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    DialNumberPageModule,
    TourSwipePageModule,
    TermsConditionsPageModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: false
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BatteryStatus,
    Geolocation,
    Network,
    Sim,
    UniqueDeviceID,
    Diagnostic,
    LocationAccuracy,
    Device,
    HTTP,
    ForegroundService,
    CallNumber,
    Dialogs,
    NativeGeocoder,
    OpenNativeSettings,
    AppVersion,
    AppMinimize,
    BackgroundMode,
    AndroidPermissions,
    Badge,
    // FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
