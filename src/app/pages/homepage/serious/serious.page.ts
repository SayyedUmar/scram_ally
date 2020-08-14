import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Events, IonInfiniteScroll } from '@ionic/angular';
import { CommonAPIService } from 'src/app/provider/common-api/common-api.service';
import { environment } from 'src/environments/environment';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-serious',
  templateUrl: './serious.page.html',
  styleUrls: ['./serious.page.scss'],
})
export class SeriousPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  seriousAlertList: any = [];
  isTodayDataAvailable: boolean;
  clearAllBtn: boolean;
  notifyList: any = {};
  itemToSearch: any;
  seriousFilteredList = [];
  pageLimit = 10;

  constructor(
    private events: Events, public commonAPIService: CommonAPIService, private zone: NgZone,
    private logService: LogfileService, private route: ActivatedRoute) {
    this.clearAllBtn = false;
    events.subscribe('allEventAlertList', (data) => {
      this.logService.logDebug('SeriousPageSeriousPage', 'allEventAlertList_subscribe', 'allEventAlertList Message');
      setTimeout(() => {
        this.route.queryParams.subscribe(params => {
          this.notifyList = params;
        });
        this.getCurrentTabData();
      }, 1000);
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
      this.commonAPIService.exceptionLevelSerious = this.commonAPIService.allAlertListCombineData.filter((el: any) => {
        return el.exceptionLevel === 'Serious';
      });

      this.seriousAlertList = this.commonAPIService.exceptionLevelSerious;
      this.seriousFilteredList = [];
      this.seriousFilteredList = this.seriousAlertList.slice(0, this.pageLimit);

      if (this.seriousFilteredList.length !== this.seriousAlertList.length) {
        this.infiniteScroll.disabled = false;
      }

      this.zone.run(() => {
        this.seriousAlertList = this.seriousAlertList;
        this.seriousFilteredList = this.seriousFilteredList;
      });
    }

    this.logService.logDebug('SeriousPage', 'getCurrentTabData', 'getCurrentTabData Message');

    this.isTodayDataAvailable = false;
    this.seriousAlertList.forEach((item, index) => {
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

  loadMoreData(event) {
    setTimeout(() => {
      this.pageLimit = this.pageLimit + 5;
      this.seriousFilteredList = this.seriousAlertList.slice(0, this.pageLimit);
      event.target.complete();
      if (this.seriousFilteredList.length === this.seriousAlertList.length) {
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
      this.seriousAlertList.map(listItem => {
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
      this.logService.logDebug('SeriousPage', 'callReadApi', 'Calling API eventReadAPI : ' + environment.eventReadAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventReadAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('SeriousPage', 'callReadApi', 'Called API eventReadAPI with response : eventId=' +
            item.eventId + ' read');
          this.events.publish('update:count', item);
        }
          , err => {
            this.logService.logError('SeriousPage', 'callReadApi', 'Called API eventReadAPI with failed response : ' + JSON.stringify(err));
          });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('SeriousPage', 'callReadApi', 'No Internet! Please check your internet connectivity');
    }
  }

  deleteItem(item) {
    if (this.commonAPIService.networkStatus.connected) {
      this.commonAPIService.showLoader('Deleting item ...');
      this.logService.logDebug('SeriousPage', 'deleteItem', 'Calling API eventDeleteAPI : ' + environment.eventDeleteAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType);
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventDeleteAPI +
        this.commonAPIService.victimDetails.victimId + '&eventId=' + item.eventId + '&eventType=' + item.eventType, null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('SeriousPage', 'deleteItem', 'Called API eventReadAPI : eventId=' + item.eventId + ' delete');
          item.isDeleted = true;
          this.commonAPIService.hideLoader();
          this.events.publish('allAlertsDeleted', 'refreshList');
          this.commonAPIService.presentToastWithCloseBtn('Alert deleted');
        }, err => {
          this.logService.logError('SeriousPage', 'deleteItem', 'Called API eventReadAPI with failed response : ' + JSON.stringify(err));
          this.commonAPIService.presentToast('Error while deleting alert!');
          this.commonAPIService.hideLoader();
        });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('SeriousPage', 'deleteItem', 'No Internet! Please check your internet connectivity');
    }
  }

  deleteAllItem() {
    if (this.commonAPIService.networkStatus.connected) {
      this.commonAPIService.showLoader('Deleting item ...');
      this.logService.logDebug('SeriousPage', 'deleteAllItem', 'Calling API eventDeleteAllAPI : ' + environment.eventDeleteAllAPI +
        this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Serious');
      this.commonAPIService.putDataWithInterceptorObservable(environment.eventDeleteAllAPI +
        this.commonAPIService.victimDetails.victimId + '&exceptionlevel=Serious', null)
        .toPromise().then(async response => {
          await response;
          this.logService.logDebug('SeriousPage', 'deleteItem', 'Called API eventReadAPI with response : victimId=' +
            this.commonAPIService.victimDetails.victimId + '. delete all');
          this.seriousAlertList.forEach((item, index) => {
            item.isDeleted = true;
          });
          this.commonAPIService.hideLoader();
          this.events.publish('allAlertsDeleted', 'refreshList');
          this.seriousAlertList = [];
          this.commonAPIService.presentToastWithCloseBtn('All alerts deleted');
        }, err => {
          this.commonAPIService.hideLoader();
          this.commonAPIService.presentToast('Error while deleting all alerts!');
          this.logService.logDebug('SeriousPage', 'deleteAllItem', 'Called API eventDeleteAllAPI with response: victimId=' + JSON.stringify(err));
        });
    } else {
      this.commonAPIService.presentToast('No Internet! Please check your internet connectivity');
      this.logService.logError('SeriousPage', 'deleteAllItem', 'No Internet! Please check your internet connectivity');
    }
  }

  clearAll() {
    this.logService.logDebug('SeriousPage', 'clearAll', 'clearAll');
    this.clearAllBtn = true;
  }

  closeClearAll() {
    this.logService.logDebug('SeriousPage', 'closeClearAll', 'closeClearAll');
    this.clearAllBtn = false;
  }

  clearAllAlerts() {
    this.logService.logDebug('SeriousPage', 'clearAllAlerts', 'clearAllAlerts');
    this.deleteAllItem();
  }

  checkForTodaysDate(date) {
    this.logService.logDebug('SeriousPage', 'checkForTodaysDate', 'checkForTodaysDate Todate:' + date);
    return this.commonAPIService.isToday(date);
  }

}
