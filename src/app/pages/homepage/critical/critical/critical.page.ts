import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { AlertController, Events, IonInfiniteScroll } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { CommonAPIService } from 'src/app/provider/common-api/common-api.service';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/app/provider/business-model/index';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-critical',
  templateUrl: './critical.page.html',
  styleUrls: ['./critical.page.scss'],
})
export class CriticalPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  localToken: any;
  criticalAlertList: any = [];
  public items: any = [];
  clearAllBtn: boolean;

  notificationAlertList = [];
  isTodayDataAvailable: boolean;
  notifyList: any = {};
  itemToSearch: any;

  criticalFilteredList = [];
  pageLimit = 10;

  constructor(
    public alertController: AlertController,
    public commonAPIService: CommonAPIService,
    private store: Store<IAppState>,
    private events: Events,
    private logService: LogfileService,
    private route: ActivatedRoute,
    private zone: NgZone) {

    events.subscribe('allEventAlertList', (data) => {
      this.logService.logDebug('CriticalPage', 'allEventAlertList_subscribe', 'allEventAlertList Critical');
      this.getCurrentTabData();
    });

    this.clearAllBtn = false;
  }

  ionViewWillEnter() {
    this.pageLimit = 10;
    this.getCurrentTabData();
  }

  getCurrentTabData() {
    this.commonAPIService.exceptionLevelCritical = [];
    this.logService.logDebug('CriticalPage', 'allEventAlertList_subscribe', 'allEventAlertList Critical');
    if (this.commonAPIService.allAlertListCombineData) {
      this.commonAPIService.exceptionLevelCritical = this.commonAPIService.allAlertListCombineData.filter((el: any) => {
        return el.exceptionLevel === 'Critical';
      });
    }

    this.criticalAlertList = this.commonAPIService.exceptionLevelCritical;
    this.criticalFilteredList = [];
    this.criticalFilteredList = this.criticalAlertList.slice(0, this.pageLimit);

    if (this.criticalFilteredList.length !== this.criticalAlertList.length) {
      this.infiniteScroll.disabled = false;
    }

    this.zone.run(() => {
      this.criticalAlertList = this.commonAPIService.exceptionLevelCritical;
      this.criticalFilteredList = this.criticalFilteredList;
    });

    this.criticalAlertList.forEach((item, index) => {
      item.expanded = false;

      if (item.isDeleted === false && (this.checkForTodaysDate(item.exceptionDateTime))) {
        this.isTodayDataAvailable = true;
      }
    });

    this.route.queryParams.subscribe(params => {
      this.notifyList = params;
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

  loadMoreData(event) {
    setTimeout(() => {
      this.pageLimit = this.pageLimit + 5;
      this.criticalFilteredList = this.criticalAlertList.slice(0, this.pageLimit);
      event.target.complete();
      if (this.criticalFilteredList.length === this.criticalAlertList.length) {
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
      this.criticalAlertList.map(listItem => {
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

    this.closeClearAll();
  }

  callReadApi(item) {
    if (this.commonAPIService.networkStatus.connected) {
      this.logService.logDebug('CriticalPage', 'callReadApi', 'Calling API eventReadAPI : ' + environment.eventReadAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventReadAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('CriticalPage', 'callReadApi', 'Called API eventReadAPI with response : eventId=' +
            item.eventId + ' read');
          this.events.publish('update:count', item);
        }, err => {
          this.logService.logError('CriticalPage', 'callReadApi', 'Called API eventReadAPI with failed response : ' + JSON.stringify(err));
        });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('CriticalPage', 'callReadApi', 'No Internet! Please check your internet connectivity');
    }
  }

  deleteItem(item) {

    if (this.commonAPIService.networkStatus.connected) {
      // this.presentAlertConfirm(item);
      this.commonAPIService.showLoader('Deleting item ...');
      this.logService.logDebug('CriticalPage', 'deleteItem', 'Calling API eventDeleteAPI : ' + environment.eventDeleteAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventDeleteAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('CriticalPage', 'deleteItem', 'Called API eventReadAPI : eventId=' + item.eventId + ' delete');
          item.isDeleted = true;
          this.commonAPIService.hideLoader();
          this.events.publish('allAlertsDeleted', 'refreshList');
          this.commonAPIService.presentToastWithCloseBtn('Alert deleted');
        }, err => {
          this.commonAPIService.presentToast('Error while deleting alert!');
          this.commonAPIService.hideLoader();
        });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('CriticalPage', 'deleteItem', 'No Internet! Please check your internet connectivity');
    }
  }

  deleteAllItem() {
    if (this.commonAPIService.networkStatus.connected) {
      this.commonAPIService.showLoader('Deleting item ...');
      this.logService.logDebug('CriticalPage', 'deleteAllItem', 'Calling API eventDeleteAllAPI : ' + environment.eventDeleteAllAPI +
        this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Critical');
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventDeleteAllAPI +
        this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Critical', null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('CriticalPage', 'deleteItem', 'Called API eventReadAPI with response : victimId=' +
            this.commonAPIService.victimDetails.victimId + '. delete all');
          this.criticalAlertList.forEach((item, index) => {
            item.isDeleted = true;
          });
          this.commonAPIService.hideLoader();
          this.events.publish('allAlertsDeleted', 'refreshList');
          this.criticalAlertList = [];
          this.commonAPIService.presentToastWithCloseBtn('All alerts deleted');
        }, err => {
          this.commonAPIService.hideLoader();
          this.commonAPIService.presentToast('Error while deleting all alerts!');
          this.logService.logDebug('CriticalPage', 'deleteAllItem', 'Called API eventDeleteAllAPI with response: victimId=' + JSON.stringify(err));
        });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('CriticalPage', 'deleteAllItem', 'No Internet! Please check your internet connectivity');
    }
  }

  clearAll() {
    // this.alertConfirmClearAll();
    this.logService.logDebug('CriticalPage', 'clearAll', 'clearAll');
    this.clearAllBtn = true;
  }

  closeClearAll() {
    this.logService.logDebug('CriticalPage', 'closeClearAll', 'closeClearAll');
    this.clearAllBtn = false;
  }

  clearAllAlerts() {
    this.logService.logDebug('CriticalPage', 'clearAllAlerts', 'clearAllAlerts');
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
            this.logService.logDebug('CriticalPage', 'presentAlertConfirm', 'Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.notificationAlertList = this.notificationAlertList.filter(list => list.messageId !== item);
            this.logService.logDebug('CriticalPage', 'presentAlertConfirm', 'Notification deleted!');
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
            this.logService.logDebug('CriticalPage', 'alertConfirmClearAll', 'Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.notificationAlertList = [];
            this.logService.logDebug('CriticalPage', 'alertConfirmClearAll', 'All Notifications are deleted!');
            this.commonAPIService.presentToast('All Notifications are deleted!');
          }
        }
      ]
    });

    await alert.present();
  }

  checkForTodaysDate(date) {
    this.logService.logDebug('CriticalPage', 'checkForTodaysDate', 'checkForTodaysDate Todate:' + date);
    return this.commonAPIService.isToday(date);
  }
}
