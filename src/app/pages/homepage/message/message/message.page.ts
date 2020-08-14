import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController, Events, IonInfiniteScroll } from '@ionic/angular';
import { CommonAPIService } from 'src/app/provider/common-api/common-api.service';
import { environment } from 'src/environments/environment';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  messageAlertList: any = [];
  isTodayDataAvailable: boolean;
  clearAllBtn: boolean;
  notifyList: any = {};
  itemToSearch: any;
  messageFilteredList = [];
  pageLimit = 10;

  constructor(
    public alertController: AlertController, public commonAPIService: CommonAPIService,
    private events: Events, private zone: NgZone,
    private logService: LogfileService,
    private route: ActivatedRoute) {
    this.clearAllBtn = false;
    events.subscribe('allEventAlertList', (data) => {
      this.logService.logDebug('MessagePage', 'allEventAlertList_subscribe', 'allEventAlertList Message');
      setTimeout(() => {
        this.route.queryParams.subscribe(params => {
          this.notifyList = params;
        });
        this.getCurrentTabData();
      }, 1000);
    });
  }

  ngOnInit() {

  }

  // ionViewDidEnter() {
  //   this.getCurrentTabData();
  // }

  ionViewWillEnter() {
    this.pageLimit = 10;
    this.getCurrentTabData();
  }

  loadMoreData(event) {
    setTimeout(() => {
      this.pageLimit = this.pageLimit + 5;
      this.messageFilteredList = this.messageAlertList.slice(0, this.pageLimit);
      event.target.complete();
      if (this.messageFilteredList.length === this.messageAlertList.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  getCurrentTabData() {
    if (this.commonAPIService.allAlertListCombineData) {
      this.commonAPIService.exceptionLevelMessage = this.commonAPIService.allAlertListCombineData.filter((el: any) => {
        return el.exceptionLevel === 'Message';
      });

      this.messageAlertList = this.commonAPIService.exceptionLevelMessage;
      this.messageFilteredList = [];
      this.messageFilteredList = this.messageAlertList.slice(0, this.pageLimit);

      if (this.messageFilteredList.length !== this.messageAlertList.length) {
        this.infiniteScroll.disabled = false;
      }

      this.zone.run(() => {
        this.messageAlertList = this.messageAlertList;
        this.messageFilteredList = this.messageFilteredList;
      });
    }

    this.logService.logDebug('CriticalPage', 'getCurrentTabData', 'getCurrentTabData Message');

    this.messageAlertList.forEach((item, index) => {
      item.expanded = false;
      if (item.isDeleted === false && (this.checkForTodaysDate(item.exceptionDateTime))) {
        this.isTodayDataAvailable = true;
      }
    });

    if (Object.keys(this.notifyList).length > 0) {
      if (this.commonAPIService.allAlertListCombineData) {
        this.itemToSearch = this.commonAPIService.allAlertListCombineData.filter((el: any) => {
          // tslint:disable-next-line:radix
          return el.eventId === parseInt(this.notifyList.EventId);
        });

        this.itemToSearch[0].expanded = false;
        this.expandItem(this.itemToSearch[0]);
      }
    }
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.messageAlertList.map(listItem => {
        if (item === listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
      if (!item.readBy) {
        this.callReadApi(item);
        item.readBy = 'Victim';
      }
    }
  }

  callReadApi(item) {
    if (this.commonAPIService.networkStatus.connected) {
      this.logService.logDebug('MessagePage', 'callReadApi', 'Calling API eventReadAPI : ' + environment.eventReadAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventReadAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('MessagePage', 'callReadApi', 'Called API eventReadAPI with response : eventId=' +
            item.eventId + ' read');
          this.events.publish('update:count', item);
        }, err => {
          this.logService.logError('MessagePage', 'callReadApi', 'Called API eventReadAPI with failed response : ' + JSON.stringify(err));
        });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('MessagePage', 'callReadApi', 'No Internet! Please check your internet connectivity');
    }
  }

  deleteItem(item) {
    if (this.commonAPIService.networkStatus.connected) {
      this.commonAPIService.showLoader('Deleting item ...');
      this.logService.logDebug('MessagePage', 'deleteItem', 'Calling API eventDeleteAPI : ' + environment.eventDeleteAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventDeleteAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('MessagePage', 'deleteItem', 'Called API DeleteAPI : eventId=' + item.eventId + ' delete');
          item.isDeleted = true;
          this.commonAPIService.hideLoader();
          this.events.publish('allAlertsDeleted', 'refreshList');
          this.commonAPIService.presentToastWithCloseBtn('Alert deleted');
        }, err => {
          this.logService.logError('MessagePage', 'deleteItem', 'Called API DeleteAPI with failed response : ' + JSON.stringify(err));
          this.commonAPIService.presentToast('Error while deleting alert!');
          this.commonAPIService.hideLoader();
        });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('MessagePage', 'deleteItem', 'No Internet! Please check your internet connectivity');
    }
  }

  deleteAllItem() {
    if (this.commonAPIService.networkStatus.connected) {
      this.commonAPIService.showLoader('Deleting item ...');
      this.logService.logDebug('MessagePage', 'deleteAllItem', 'Calling API eventDeleteAllAPI : ' + environment.eventDeleteAllAPI +
        this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Message');
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventDeleteAllAPI +
        this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Message', null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('MessagePage', 'deleteItem', 'Called API eventReadAPI with response : victimId=' +
            this.commonAPIService.victimDetails.victimId + '. delete all');
          this.messageAlertList.forEach((item, index) => {
            item.isDeleted = true;
          });
          this.commonAPIService.hideLoader();
          this.events.publish('allAlertsDeleted', 'refreshList');
          this.messageAlertList = [];
          this.commonAPIService.presentToastWithCloseBtn('All alerts deleted');
        }, err => {
          this.commonAPIService.hideLoader();
          this.commonAPIService.presentToast('Error while deleting all alerts!');
          this.logService.logDebug('MessagePage', 'deleteAllItem', 'Called API eventDeleteAllAPI with response: victimId=' + JSON.stringify(err));

        });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('MessagePage', 'deleteAllItem', 'No Internet! Please check your internet connectivity');
    }
  }

  clearAll() {
    this.logService.logDebug('MessagePage', 'clearAll', 'clearAll');
    this.clearAllBtn = true;
  }

  closeClearAll() {
    this.logService.logDebug('MessagePage', 'closeClearAll', 'closeClearAll');
    this.clearAllBtn = false;
  }

  clearAllAlerts() {
    this.logService.logDebug('MessagePage', 'clearAllAlerts', 'clearAllAlerts');
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
            this.logService.logDebug('MessagePage', 'presentAlertConfirm', 'Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.messageAlertList = this.messageAlertList.filter(list => list.messageId !== item);
            this.logService.logDebug('MessagePage', 'presentAlertConfirm', 'Notification deleted!');
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
            this.logService.logDebug('MessagePage', 'alertConfirmClearAll', 'Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.messageAlertList = [];
            this.logService.logDebug('MessagePage', 'alertConfirmClearAll', 'All Notifications are deleted!');
            this.commonAPIService.presentToast('All Notifications are deleted!');
          }
        }
      ]
    });

    await alert.present();
  }

  checkForTodaysDate(date) {
    this.logService.logDebug('MessagePage', 'checkForTodaysDate', 'checkForTodaysDate Todate:' + date);
    return this.commonAPIService.isToday(date);
  }
}
