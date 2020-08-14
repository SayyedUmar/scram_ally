import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { CriticalPageRoutingModule } from './critical-routing.module';
import { CriticalPage } from './critical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriticalPageRoutingModule,
    SharedModule
  ],
  declarations: [CriticalPage]
})
export class CriticalPageModule { }
