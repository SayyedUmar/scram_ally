import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonAPIService } from 'src/app/provider/common-api/common-api.service';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';

@Component({
  selector: 'app-tour-swipe',
  templateUrl: './tour-swipe.page.html',
  styleUrls: ['./tour-swipe.page.scss'],
})
export class TourSwipePage implements OnInit {
  constructor(
    public modalController: ModalController,
    public commonAPIService: CommonAPIService,
    private logService: LogfileService
  ) { }

  ngOnInit() { }

  async closeModal() {
    await this.modalController.dismiss({
      dismissed: true,
    });

    this.commonAPIService.setStorageValue('showTutorial', true);
    this.logService.logInfo('DialNumberPage', 'closeModal', 'showTutorial: ' + true);
  }
}
