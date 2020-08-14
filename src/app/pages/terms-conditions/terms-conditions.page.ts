import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { CommonAPIService } from 'src/app/provider/common-api/common-api.service';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';

const { Browser } = Plugins;

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {

  constructor(private commonAPIService: CommonAPIService, public modalController: ModalController,
              private logService: LogfileService) { }

  ngOnInit() {
    this.logService.logDebug('TermsConditionsPage', 'ngOnInit()', 'ngOnInit');
  }

  onAccept() {
    this.commonAPIService.setStorageValue('isTermsAndCondAccepted', true);
    this.logService.logInfo('TermsConditionsPage', 'onAccept()', 'isTermsAndCondAccepted : ' + true);
    this.commonAPIService.presentToast('Thank you for accepting Terms & Conditions!');
    this.closeModal(true);
  }

  async openURL() {
    await Browser.open({ url: 'https://www.scramsystems.com/terms-and-conditions/ally/' });
  }

  onDisagee() {
    this.commonAPIService.setStorageValue('isTermsAndCondAccepted', false);
    this.logService.logInfo('TermsConditionsPage', 'onDisagee()', 'isTermsAndCondAccepted: ' + false);
    this.closeModal(false);
  }

  async closeModal(status) {
    this.logService.logDebug('TermsConditionsPage', 'closeModal()', 'closeModal');
    await this.modalController.dismiss({
      'dismissed': status
    });
  }

}
