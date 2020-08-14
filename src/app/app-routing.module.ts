import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './provider/auth-guard/auth-gaurd.service';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth0/auth/auth.module').then(m => m.AuthPageModule)
  },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGaurdService] },
  {
    path: 'show-map',
    loadChildren: () => import('./pages/show-map/show-map.module').then(m => m.ShowMapPageModule), canActivate: [AuthGaurdService]
  },
  {
    path: 'homepage',
    loadChildren: () => import('./pages/homepage/homepage.module').then(m => m.HomepagePageModule),
    canActivate: [AuthGaurdService]
  },
  {
    path: 'assigned-clients',
    loadChildren: () => import('./pages/assigned-clients/assigned-clients.module').then(m => m.AssignedClientsPageModule),
    canActivate: [AuthGaurdService]
  },
  {
    path: 'dial-number',
    loadChildren: () => import('./modal/dial-number/dial-number.module').then(m => m.DialNumberPageModule)
  },
  {
    path: 'tour-swipe',
    loadChildren: () => import('./modal/tour-swipe/tour-swipe.module').then(m => m.TourSwipePageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
