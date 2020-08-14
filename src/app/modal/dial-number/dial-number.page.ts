import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TourSwipePage } from '../tour-swipe/tour-swipe.page';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';

@Component({
  selector: 'app-dial-number',
  templateUrl: './dial-number.page.html',
  styleUrls: ['./dial-number.page.scss'],
})
export class DialNumberPage implements OnInit {

  constructor(public modalController: ModalController, private logService: LogfileService) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss({
      dismissed: true
    });

    this.showSwipeTourModal();
  }

  async showSwipeTourModal() {
    this.logService.logInfo('DialNumberPage', 'showSwipeTourModal()', ' Tour for Dialer');
    const modal = await this.modalController.create({
      component: TourSwipePage,
      cssClass: 'tour-swipe-modal-css',
      backdropDismiss: false
    });
    return await modal.present();
  }

}
