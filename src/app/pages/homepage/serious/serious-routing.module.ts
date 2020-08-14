import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriousPage } from './serious.page';

const routes: Routes = [
  {
    path: '',
    component: SeriousPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriousPageRoutingModule { }
