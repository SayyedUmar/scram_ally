import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DialNumberPageRoutingModule } from './dial-number-routing.module';
import { DialNumberPage } from './dial-number.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DialNumberPageRoutingModule
  ],
  declarations: [DialNumberPage]
})
export class DialNumberPageModule { }
