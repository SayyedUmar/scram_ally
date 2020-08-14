import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { SeriousPageRoutingModule } from './serious-routing.module';
import { SeriousPage } from './serious.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeriousPageRoutingModule,
    SharedModule
  ],
  declarations: [SeriousPage]
})
export class SeriousPageModule { }
