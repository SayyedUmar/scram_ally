import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepagePage } from './homepage.page';

const routes: Routes = [
  {
    path: '',
    component: HomepagePage,
    children: [
      {
        path: 'critical',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./critical/critical/critical.module').then(m => m.CriticalPageModule)
          }
        ]
      },
      {
        path: 'warning',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./warning/warning/warning.module').then(m => m.WarningPageModule)
          }
        ]
      },
      {
        path: 'message',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./message/message/message.module').then(m => m.MessagePageModule)
          }
        ]
      },
      {
        path: 'serious',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./serious/serious.module').then(m => m.SeriousPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/homepage/critical',
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepagePageRoutingModule { }
