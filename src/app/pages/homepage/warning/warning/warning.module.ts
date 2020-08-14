import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { WarningPageRoutingModule } from './warning-routing.module';
import { WarningPage } from './warning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WarningPageRoutingModule,
    SharedModule
  ],
  declarations: [WarningPage]
})
export class WarningPageModule { }
