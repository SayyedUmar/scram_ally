import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedClientsPage } from './assigned-clients.page';

const routes: Routes = [
  {
    path: '',
    component: AssignedClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedClientsPageRoutingModule { }
