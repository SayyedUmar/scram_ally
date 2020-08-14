// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // auth0DiscoveryUrl: 'https://ally-test.auth0.com/.well-known/openid-configuration',
  // auth0ClientId: 'P7O3h8R82arok6N5afcBPl6EeTN2wGUX',
  // auth0Host: 'com.scram.mobile.ally://',
  // auth0Audience: 'https://ally-test/',

  // // Following are the APIs needed for applications to run
  // gatewayUrl: 'https://allymobileapigateway.scramtest.com/api/v1/',
  // oAuthTokenURL: 'https://ally-test.auth0.com/oauth/token',


  // Following for stage environment

  auth0DiscoveryUrl: 'https://ally-stage.auth0.com/.well-known/openid-configuration',
  auth0ClientId: '0NvTrsmmCHhqGdNq55ta17xKf041yUGI',
  auth0Host: 'com.scram.mobile.ally://',
  auth0Audience: 'https://ally-stage/',
  gatewayUrl: 'https://allymobileapigateway.scramstage.com/api/v1/',
  oAuthTokenURL: 'https://ally-stage.auth0.com/oauth/token',

  // End for Stage environment

  // Following for prod environment
  // auth0DiscoveryUrl: 'https://ally-prod.auth0.com/.well-known/openid-configuration',

  // auth0ClientId: 'ArzRQtIOT51g8yvrCe6LDJoMsMEVi0TP',
  // auth0Host: 'com.scram.mobile.ally://',
  // auth0Audience: 'https://ally/',
  // gatewayUrl: 'https://allymobileapigateway.scramnetwork.com/api/v1/',

  // oAuthTokenURL: 'https://ally-prod.auth0.com/oauth/token',

  // End for prod environment

  pushNotificationTokenUrl: '',
  version: '1.0.0',
  name: 'test',
  getVictimDetailsAPI: 'Victim/userName/',
  victim_userNameTest: 'Victim/userNameTest2/',
  mobileDeviceConfigurationAPI: 'MobileDevice/Configuration',
  locationApi: 'Location',
  mobileDeviceEventsAPI: 'MobileDevice/DeviceEvents',
  panicBtnEventAPI: 'Panic/PanicEvent',
  victimConfigurationAPI: 'Victim/configuration/',
  victimClientsAPI: 'Victim/clients/',
  victimPrimaryAgentAPI: 'Victim/primaryAgent/',
  alertEventsListAPI: 'Event/events/',
  eventReadAPI: 'Event/read?victimId=',
  eventDeleteAPI: 'Event/delete?victimId=',
  eventDeleteAllAPI: 'Event/deleteall?victimId=',
  mobileDeviceValidateDevice: 'MobileDevice/ValidateDevice',
  mobileDeviceRegisterDevice: 'MobileDevice/RegisterDevice'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
