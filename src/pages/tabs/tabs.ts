import { Component, NgModule, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, IonicPageModule, AlertController } from 'ionic-angular';
import { SuperTabsModule, SuperTabs } from 'ionic2-super-tabs';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    SuperTabsModule
  ],
})
export class TabsPage {
  pages = [
    { pageName: 'ChatsPage', title: 'Chats', icon: 'chatbubbles', id: 'chatsTab'},
    { pageName: 'GroupsPage', title: 'Groups', icon: 'contacts', id: 'groupsTab'},
    { pageName: 'ProfilePage', title: 'Profile', icon: 'contact', id: 'profileTab'}
  ];
 
  selectedTab = 0;
 
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
   
  }

  onTabSelect(ev: any) {
    if (ev.index === 2) {
      
    } else {
      this.selectedTab = ev.index;
      this.superTabs.clearBadge(this.pages[ev.index].id);
    }
  }

}
