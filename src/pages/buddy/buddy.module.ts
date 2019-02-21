import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuddyPage } from './buddy';

@NgModule({
  declarations: [
    BuddyPage,
  ],
  imports: [
    IonicPageModule.forChild(BuddyPage),
  ],
})
export class BuddyPageModule {}
