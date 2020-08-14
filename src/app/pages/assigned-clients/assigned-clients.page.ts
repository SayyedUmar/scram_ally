import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CommonAPIService } from 'src/app/provider/common-api/common-api.service';
import { environment } from 'src/environments/environment';
import { LogfileService } from 'src/app/provider/common-file/logfile.service';

@Component({
  selector: 'app-assigned-clients',
  templateUrl: './assigned-clients.page.html',
  styleUrls: ['./assigned-clients.page.scss'],
})
export class AssignedClientsPage implements OnInit {

  assignedClientsList: any;
  isClientAssigned: boolean;
  constructor(private menuCtrl: MenuController, private commonAPIService: CommonAPIService,
              private logService: LogfileService) {

    this.isClientAssigned = false;
    this.assignedClientsList = [
      {
        clientId: '',
        firstName: '',
        lastName: '',
        middleName: '',
        accountId: '',
        accountName: '',
        primaryAgent: {
          applicationUserId: '',
          firstName: '',
          lastName: '',
          middleName: '',
          roleType: '',
          phoneNumber: '',
          accountId: '',
          accountName: ''
        },
        startOfService: '',
        endOfService: null,
        courtDate: null
      }
    ];
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.getAssignedClientsList();
  }

  getAssignedClientsList() {
    this.commonAPIService.showLoader('Loading data..');
    this.logService.logDebug('AssignedClientsPage', 'getAssignedClientsList()', 'Calling victimClientsAPI : '+ 
    environment.gatewayUrl + environment.victimClientsAPI + this.commonAPIService.victimDetails.victimId);

    this.commonAPIService.getData(environment.victimClientsAPI + this.commonAPIService.victimDetails.victimId).subscribe(async res => {
      this.assignedClientsList = await res.body;
      this.logService.logDebug('AssignedClientsPage', 'getAssignedClientsList()', 'Called victimClientsAPI with response :'+ JSON.stringify(this.assignedClientsList));
      if (this.assignedClientsList === null) {
        this.isClientAssigned = false;
        this.logService.logDebug('AssignedClientsPage', 'getAssignedClientsList()', 'Called victimClientsAPI with response :'+ 'No individuals assigned');
        this.commonAPIService.hideLoader();
      } else {
        this.isClientAssigned = true;
        this.assignedClientsList.forEach(element => {
          if (element.endOfService !== null) {
            element.endOfService = element.endOfService.split('T')[0];
          }
          if (element.courtDate !== null) {
            element.courtDate = element.courtDate.split('T')[0];
          }
        });
        this.commonAPIService.hideLoader();
      }
    }, err => {
      this.logService.logDebug('AssignedClientsPage', 'getAssignedClientsList()', 'Called victimClientsAPI with failed response :'+ JSON.stringify(err));
      this.commonAPIService.hideLoader();
    
    });
  }

}
