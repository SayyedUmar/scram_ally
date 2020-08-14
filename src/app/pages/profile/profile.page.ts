import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MenuController, ModalController } from '@ionic/angular';
import { CommonAPIService } from 'src/app/provider/common-api/common-api.service';
import { UserDetails } from 'src/app/store/models/user-details.model';
import { environment } from 'src/environments/environment';
import { IVictimDetails } from '../../provider/business-model/index';
import { TermsConditionsPage } from '../terms-conditions/terms-conditions.page';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';
const { Browser } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  victimDetailsProfile: any;
  private userDetailsObj: UserDetails;

  victimDetails: IVictimDetails;

  constructor(private menuCtrl: MenuController, public commonAPIService: CommonAPIService, public modalController: ModalController,
              private logService: LogfileService) {
    this.victimDetailsProfile = this.commonAPIService.victimDetails;
    this.victimDetails = {
      name: this.victimDetailsProfile.firstName + ' ' + this.victimDetailsProfile.lastName,
      email: this.victimDetailsProfile.username,
      phone: this.victimDetailsProfile.cellPhone,
      account: this.victimDetailsProfile.accountName,
      primaryAgent: '',
      zoneRadius: this.commonAPIService.appConfiguration.zoneRadiusDisplayName
    };

    this.userDetailsObj = {
      name: '',
      email: '',
      emailVerified: false,
      nickname: '',
      picture: ''
    };
  }

  ionViewWillEnter() {
  }

  ngOnInit() {
    this.logService.logDebug('ProfilePage', 'ngOnInit()','ngOnInit');
    this.getAppSettingDetails();
    this.getLoggedInUserDetails();
  }

  getPrimaryAgentData() {
    this.logService.logDebug('ProfilePage', 'getPrimaryAgentData()', 'Calling API victimPrimaryAgentAPI : ' +
    environment.gatewayUrl + environment.victimPrimaryAgentAPI + this.commonAPIService.victimDetails.victimId);

    this.commonAPIService.getData(environment.victimPrimaryAgentAPI + this.commonAPIService.victimDetails.victimId).subscribe(data => {
      console.log(data);
      this.commonAPIService.primaryAgentInfo = data.body;
      this.logService.logInfo('ProfilePage', 'getPrimaryAgentData','Called API victimPrimaryAgentAPI with response: ' +JSON.stringify(this.commonAPIService.primaryAgentInfo));

      this.victimDetails = {
        name: this.victimDetailsProfile.firstName + ' ' + this.victimDetailsProfile.lastName,
        email: this.victimDetailsProfile.username,
        phone: this.victimDetailsProfile.cellPhone,
        account: this.victimDetailsProfile.accountName,
        primaryAgent: (this.commonAPIService.primaryAgentInfo !== null &&
          this.commonAPIService.primaryAgentInfo !== undefined) ? this.commonAPIService.primaryAgentInfo.firstName + ' ' +
          this.commonAPIService.primaryAgentInfo.lastName : '',
        zoneRadius: this.commonAPIService.appConfiguration.zoneRadiusDisplayName
      };
    }, err => {
      console.log(err);
      this.logService.logError('ProfilePage', 'getPrimaryAgentData','Called API victimPrimaryAgentAPI with failed response: '+  JSON.stringify(err));
    });
  }

  getAppSettingDetails() {
    this.commonAPIService.showLoader('Loading data...');
    // Get Configuration data
    this.logService.logDebug('ProfilePage', 'getAppSettingDetails()','Calling API victimConfigurationAPI : ' +
    environment.gatewayUrl + environment.victimConfigurationAPI + this.commonAPIService.victimDetails.victimId);

    this.commonAPIService.getData(environment.victimConfigurationAPI + this.commonAPIService.victimDetails.victimId).subscribe(data => {
      console.log('Configuration data : ');
      console.log(data);
      this.logService.logInfo('ProfilePage', 'getAppSettingDetails_Response', 'Called API victimConfigurationAPI with response : ' + JSON.stringify(data.body));
      if (data.body) {
        this.commonAPIService.appConfiguration = data.body;
        setTimeout(() => {
          this.getPrimaryAgentData();
        }, 500);
      } else {
        this.commonAPIService.presentToast('No client assigned...');
      }

      this.commonAPIService.hideLoader();
    }, err => {
      this.commonAPIService.hideLoader();
      this.logService.logError('ProfilePage', 'getAppSettingDetails', 'Called API victimConfigurationAPI with failed response : ' +JSON.stringify(err));
    });
  }

  async getLoggedInUserDetails() {
    await this.commonAPIService.getStorageValue('loggedInUserDetails').then(res => {
      this.logService.logDebug('ProfilePage', 'getLoggedInUserDetails()','loggedInUserDetails : ' + JSON.stringify(res));      
      this.userDetailsObj.name = res.name;
      this.userDetailsObj.emailVerified = res.email_verified;
      this.userDetailsObj.email = res.email;
      this.userDetailsObj.picture = res.picture;
      this.userDetailsObj.nickname = res.nickname;

      this.commonAPIService.userDetails = this.userDetailsObj;

      // this.commonAPIService.showLoader('Loading data...');
      // Get Victim Details by email id
      this.logService.logDebug('ProfilePage', 'getLoggedInUserDetails()','Calling API getVictimDetailsAPI : ' +
      environment.gatewayUrl + environment.getVictimDetailsAPI + res.email);
      this.commonAPIService.getData(environment.getVictimDetailsAPI + this.commonAPIService.userDetails.email).subscribe(data => {
        console.log('User details : ');
        console.log(data);
        this.commonAPIService.victimDetails = data.body;
        this.logService.logInfo('ProfilePage', 'getLoggedInUserDetails','Called API getVictimDetailsAPI with response: ' + JSON.stringify(data.body));
        this.victimDetailsProfile = this.commonAPIService.victimDetails;
        this.victimDetails = {
          name: this.victimDetailsProfile.firstName + ' ' + this.victimDetailsProfile.lastName,
          email: this.victimDetailsProfile.username,
          phone: this.victimDetailsProfile.cellPhone,
          account: this.victimDetailsProfile.accountName,
          primaryAgent: (this.commonAPIService.primaryAgentInfo !== null &&
            this.commonAPIService.primaryAgentInfo !== undefined) ? this.commonAPIService.primaryAgentInfo.firstName + ' ' +
            this.commonAPIService.primaryAgentInfo.lastName : '',
          zoneRadius: this.commonAPIService.appConfiguration.zoneRadiusDisplayName
        };
      }, err => {
        this.logService.logInfo('ProfilePage', 'getLoggedInUserDetails','Called API getVictimDetailsAPI with failed response: ' + JSON.stringify(err));
      });
    });
  }

  openTermsCondition() {
    this.logService.logDebug('ProfilePage', 'openTermsCondition()','openTermsCondition' )
    this.showTermsConditionModal();
  }

  async showTermsConditionModal() {
    const modal = await this.modalController.create({
      component: TermsConditionsPage,
      cssClass: '',
      backdropDismiss: false
    });
    return await modal.present();
  }

  async openURL() {
    this.logService.logDebug('openURL', 'openURL()','openURL' )
    await Browser.open({ url: 'https://www.scramsystems.com/terms-and-conditions/ally/' });
  }
}
