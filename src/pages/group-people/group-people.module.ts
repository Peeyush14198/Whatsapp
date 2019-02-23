import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupPeoplePage } from './group-people';

@NgModule({
  declarations: [
    GroupPeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(GroupPeoplePage),
  ],
})
export class GroupPeoplePageModule {}
