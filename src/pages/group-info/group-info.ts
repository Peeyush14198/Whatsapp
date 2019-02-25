import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-group-info',
  templateUrl: 'group-info.html',
})
export class GroupInfoPage {
  groupmembers;
  groupName;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider,
              public events: Events) {
            this.groupName = this.navParams.get('groupName')
  }
 
  ionViewDidLoad() {
    this.userService.getOwnerShip(this.userService.currentgroupname).then((res) => {
      if (res){
      this.groupmembers = this.userService.currentgroup;
      console.log(this.groupmembers)
      this.events.subscribe('gotintogroup', () => {
        this.groupmembers = this.userService.currentgroup;
      })
    }
      else {
        this.userService.getgroupmembers();
      }   
    })
 
    this.events.subscribe('gotmembers', () => {
      this.groupmembers = this.userService.currentgroup;
    })
    
  }
 
  ionViewWillLeave() {
    this.events.unsubscribe('gotmembers');
  }
 
 
}
