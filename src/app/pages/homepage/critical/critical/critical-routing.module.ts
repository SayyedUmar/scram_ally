import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriticalPage } from './critical.page';

const routes: Routes = [
  {
    path: '',
    component: CriticalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriticalPageRoutingModule { }
