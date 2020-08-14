import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TourSwipePageRoutingModule } from './tour-swipe-routing.module';
import { TourSwipePage } from './tour-swipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TourSwipePageRoutingModule
  ],
  declarations: [TourSwipePage]
})
export class TourSwipePageModule { }
