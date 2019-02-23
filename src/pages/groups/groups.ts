import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { CreateGroupPage } from '../create-group/create-group';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  allmygroups
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService:UserServiceProvider,
    public events:Events  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

  ionViewWillEnter()
  {
    this.userService.getmygroups();
    this.events.subscribe('allmygroups', () => {
      this.allmygroups = this.userService.myGroups;
    })
  }
  
  ionViewDidLeave() {
    this.events.unsubscribe('allmygroups');
  }
 
  addGroup() {
    this.navCtrl.push(CreateGroupPage);
  }

  openChat(group)
  {
       alert("Created") 
  }

  

}
