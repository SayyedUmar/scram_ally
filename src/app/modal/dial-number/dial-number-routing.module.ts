import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialNumberPage } from './dial-number.page';

const routes: Routes = [
  {
    path: '',
    component: DialNumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DialNumberPageRoutingModule { }
