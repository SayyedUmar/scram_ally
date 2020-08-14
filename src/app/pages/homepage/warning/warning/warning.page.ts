import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController, Events, IonInfiniteScroll } from '@ionic/angular';
import { CommonAPIService } from 'src/app/provider/common-api/common-api.service';
import { environment } from 'src/environments/environment';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.page.html',
  styleUrls: ['./warning.page.scss'],
})
export class WarningPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  warningAlertList: any = [];
  unreadMessageCount: number;
  isTodayDataAvailable: boolean;
  clearAllBtn: boolean;
  warningFilteredList = [];
  pageLimit = 10;
  constructor(
    public alertController: AlertController, public commonAPIService: CommonAPIService,
    private events: Events, private zone: NgZone,
    private logService: LogfileService) {
    // this.getCurrentTabData();
    events.subscribe('allEventAlertList', (data) => {
      this.logService.logDebug('WarningPage', 'allEventAlertList_subscribe', 'allEventAlertList Message');
      this.getCurrentTabData();
    });
  }

  ionViewWillEnter() {
    this.pageLimit = 10;
    this.getCurrentTabData();
  }

  // ionViewDidEnter() {
  //   this.getCurrentTabData();
  // }

  getCurrentTabData() {
    if (this.commonAPIService.allAlertListCombineData) {
      this.commonAPIService.exceptionLevelWarning = this.commonAPIService.allAlertListCombineData.filter((el: any) => {
        return el.exceptionLevel === 'Warning';
      });

      this.warningAlertList = this.commonAPIService.exceptionLevelWarning;
      this.warningFilteredList = [];
      this.warningFilteredList = this.warningAlertList.slice(0, this.pageLimit);

      if (this.warningFilteredList.length !== this.warningAlertList.length) {
        this.infiniteScroll.disabled = false;
      }

      this.zone.run(() => {
        this.warningAlertList = this.warningAlertList;
        this.warningFilteredList = this.warningFilteredList;
      });
    }

    this.logService.logDebug('WarningPage', 'getCurrentTabData', 'getCurrentTabData Message');
    this.unreadMessageCount = 0;
    this.warningAlertList.forEach((item, index) => {
      item.expanded = false;
      if (!item.readBy) {
        this.unreadMessageCount = this.unreadMessageCount + 1;
      }
      if (item.isDeleted === false && (this.checkForTodaysDate(item.exceptionDateTime))) {
        this.isTodayDataAvailable = true;
      }
    });
  }

  loadMoreData(event) {
    setTimeout(() => {
      this.pageLimit = this.pageLimit + 5;
      this.warningFilteredList = this.warningAlertList.slice(0, this.pageLimit);
      event.target.complete();
      if (this.warningFilteredList.length === this.warningAlertList.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ngOnInit() {
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.warningAlertList.map(listItem => {
        if (item === listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
      if (!item.readBy) {
        this.callReadApi(item);
        item.readBy = 'Victim 1 Mobile';
      }
    }
    this.clearAllBtn = false;
  }

  callReadApi(item) {
    if (this.commonAPIService.networkStatus.connected) {
      this.logService.logDebug('WarningPage', 'callReadApi', 'Calling API eventReadAPI : ' + environment.eventReadAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventReadAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('WarningPage', 'callReadApi', 'Called API eventReadAPI with response : eventId=' +
            item.eventId + ' read');
          this.events.publish('update:count', item);
        }, err => {
          this.logService.logError('WarningPage', 'callReadApi', 'Called API eventReadAPI with failed response : ' + JSON.stringify(err));
        });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('WarningPage', 'callReadApi', 'No Internet! Please check your internet connectivity');
    }
  }

  deleteItem(item) {
    if (this.commonAPIService.networkStatus.connected) {
      this.commonAPIService.showLoader('Deleting item ...');
      this.logService.logDebug('WarningPage', 'deleteItem', 'Calling API eventDeleteAPI : ' + environment.eventDeleteAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventDeleteAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('WarningPage', 'deleteItem', 'Called API eventReadAPI : eventId=' + item.eventId + ' delete');
          item.isDeleted = true;
          this.commonAPIService.hideLoader();
          this.events.publish('allAlertsDeleted', 'refreshList');
          this.commonAPIService.presentToastWithCloseBtn('Alert deleted');
        }, err => {
          this.logService.logError('WarningPage', 'deleteItem', 'Called API eventReadAPI with failed response : ' + JSON.stringify(err));
          this.commonAPIService.presentToast('Error while deleting alert!');
          this.commonAPIService.hideLoader();
        });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('WarningPage', 'deleteItem', 'No Internet! Please check your internet connectivity');
    }
  }

  deleteAllItem() {
    if (this.commonAPIService.networkStatus.connected) {
      this.commonAPIService.showLoader('Deleting item ...');
      this.logService.logDebug('SeriousPage', 'deleteAllItem', 'Calling API eventDeleteAllAPI : ' + environment.eventDeleteAllAPI +
        this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Serious');
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventDeleteAllAPI +
        this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Warning', null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('WarningPage', 'deleteItem', 'Called API eventReadAPI with response : victimId=' +
            this.commonAPIService.victimDetails.victimId + '. delete all');
          this.warningAlertList.forEach((item, index) => {
            item.isDeleted = true;
          });
          this.commonAPIService.hideLoader();
          this.events.publish('allAlertsDeleted', 'refreshList');
          this.warningAlertList = [];
          this.commonAPIService.presentToastWithCloseBtn('All alerts deleted');
        }, err => {
          this.logService.logDebug('WarningPage', 'deleteAllItem', 'Called API eventDeleteAllAPI with response: victimId=' + JSON.stringify(err));
          this.commonAPIService.hideLoader();
          this.commonAPIService.presentToast('Error while deleting all alerts!');

        });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('WarningPage', 'deleteAllItem', 'No Internet! Please check your internet connectivity');
    }
  }

  clearAll() {
    this.logService.logDebug('WarningPage', 'clearAll', 'clearAll');
    this.clearAllBtn = true;
  }

  closeClearAll() {
    this.logService.logDebug('WarningPage', 'closeClearAll', 'closeClearAll');
    this.clearAllBtn = false;
  }

  clearAllAlerts() {
    this.logService.logDebug('WarningPage', 'clearAllAlerts', 'clearAllAlerts');
    this.deleteAllItem();
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      header: 'Delete?',
      message: 'Do you really want to delete?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.logService.logDebug('WarningPage', 'presentAlertConfirm', 'Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.warningAlertList = this.warningAlertList.filter(list => list.messageId !== item);
            this.logService.logDebug('WarningPage', 'presentAlertConfirm', 'Notification deleted!');
            this.commonAPIService.presentToast('Notification deleted!');
          }
        }
      ]
    });

    await alert.present();
  }

  async alertConfirmClearAll() {
    const alert = await this.alertController.create({
      header: 'Delete All?',
      message: 'Do you really want to delete all notifications?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.logService.logDebug('WarningPage', 'alertConfirmClearAll', 'Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.warningAlertList = [];
            this.commonAPIService.presentToast('All Notifications are deleted!');
            this.logService.logDebug('WarningPage', 'alertConfirmClearAll', 'All Notifications are deleted!');
          }
        }
      ]
    });

    await alert.present();
  }

  checkForTodaysDate(date) {
    this.logService.logDebug('WarningPage', 'checkForTodaysDate', 'checkForTodaysDate Todate:' + date);
    return this.commonAPIService.isToday(date);
  }

}
