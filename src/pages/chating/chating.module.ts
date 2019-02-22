import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatingPage } from './chating';

@NgModule({
  declarations: [
    ChatingPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatingPage),
  ],
})
export class ChatingPageModule {}
