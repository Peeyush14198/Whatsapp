import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupInfoPage } from './group-info';

@NgModule({
  declarations: [
    GroupInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupInfoPage),
  ],
})
export class GroupInfoPageModule {}
