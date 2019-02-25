import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';



@IonicPage()
@Component({
  selector: 'page-group-members',
  templateUrl: 'group-members.html',
})
export class GroupMembersPage {
  groupmembers;
  tempgrpmembers;
  groupname;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UserServiceProvider,
              public events: Events) {
     this.groupname = this.navParams.get('groupName')
     console.log(this.groupname)
  } 
 
  ionViewWillEnter() {
    this.groupmembers = this.userService.currentgroup;
    console.log(this.groupmembers)
    this.tempgrpmembers = this.groupmembers;
    this.events.subscribe('gotintogroup', () => {
      this.groupmembers = this.userService.currentgroup;
      this.tempgrpmembers = this.groupmembers;
    })
  }
 
  ionViewWillLeave() {
    this.events.unsubscribe('gotintogroups');
  }
 
  searchuser(searchbar) {
    let tempmembers = this.tempgrpmembers;
 
    var q = searchbar.target.value;
 
    if (q.trim() === '') {
      this.groupmembers = this.tempgrpmembers;
      return;
    }
 
    tempmembers = tempmembers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
    
    this.groupmembers = tempmembers;
 
  }
 
  removemember(member) {
    this.userService.deleteMember(member);
  }
 
}