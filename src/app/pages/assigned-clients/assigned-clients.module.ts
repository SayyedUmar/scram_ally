import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssignedClientsPageRoutingModule } from './assigned-clients-routing.module';
import { AssignedClientsPage } from './assigned-clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedClientsPageRoutingModule
  ],
  declarations: [AssignedClientsPage]
})
export class AssignedClientsPageModule { }
