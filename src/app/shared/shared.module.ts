import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExpandableComponent } from '../Components/expandable/expandable.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    ExpandableComponent
  ],
  providers: [],
  exports: [
    ExpandableComponent
  ]
})
export class SharedModule { }
