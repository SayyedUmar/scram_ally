import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { TermsConditionsPage } from 'src/app/pages/terms-conditions/terms-conditions.page';
import { AuthenticationService } from 'src/app/provider/auth/authentication.service';
import { CommonAPIService } from 'src/app/provider/common-api/common-api.service';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isNetworkConnected: boolean;
  constructor(public router: Router,
    private authenticationService: AuthenticationService,
    private menuCtrl: MenuController,
    private commonAPIService: CommonAPIService,
    public modalController: ModalController,
    private diagnostic: Diagnostic,
    private logService: LogfileService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async onClick() {
    this.logService.logInfo('AuthPage', 'onClick_SignIn()', 'isNetworkConnected?: ' + this.commonAPIService.networkStatus.connected);
    if (this.commonAPIService.networkStatus.connected) {
      this.checkIfTermsAndConditionAccepted();
    } else {
      // tslint:disable-next-line:max-line-length
      this.commonAPIService.presentToast('Ally requires cellular data to be enabled. Please enable the cellular data to access the Ally app.');
      this.logService.logDebug('AuthPage', 'onClick_SignIn()', 'Ally requires cellular data to be enabled. Please enable the cellular data to access the Ally app.');
    }

  }

  async checkIfTermsAndConditionAccepted() {
    await this.commonAPIService.getStorageValue('isTermsAndCondAccepted').then(res => {
      if (res) {
        this.openOAuthPage();
      } else {
        this.logService.logError('AuthPage', 'checkIfTermsAndConditionAccepted', 'Terms & Condition are not accepted!');
        this.showTermsConditionModal();
      }
      this.logService.logInfo('AuthPage', 'checkIfTermsAndConditionAccepted', 'isTermsAndCondAccepted: ' + res);
    });
  }

  async openOAuthPage(): Promise<void> {
    await this.authenticationService.isAuth0Authenticated();
    this.logService.logInfo('AuthPage', 'openOAuthPage()', 'this.authenticationService.isUserAuthenticated :' + this.authenticationService.isUserAuthenticated);
    if (this.authenticationService.isUserAuthenticated) {
      this.authenticationService.setToken();
    } else {
      await this.authenticationService.login();
    }
  }

  async showTermsConditionModal() {
    this.logService.logInfo('AuthPage', 'showTermsConditionModal()', 'Displaying terms and conditions');
    const modal = await this.modalController.create({
      component: TermsConditionsPage,
      cssClass: '',
      backdropDismiss: false
    }).then(res => {
      res.present();
      res.onDidDismiss().then(dis => {
        console.log('showTermsConditionModal closed!' + dis);
        console.log(dis);
        console.log(dis.data.dismissed);
        if (dis.data.dismissed) {
          this.openOAuthPage();
        }
      });
    });
    // modal.present();
  }

}
