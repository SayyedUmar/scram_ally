import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourSwipePage } from './tour-swipe.page';

const routes: Routes = [
  {
    path: '',
    component: TourSwipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourSwipePageRoutingModule { }
