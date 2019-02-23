import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';


@IonicPage()
@Component({
  selector: 'page-group-people',
  templateUrl: 'group-people.html',
})
export class GroupPeoplePage {
  myfriends = [];
  groupmembers = [];
  searchstring;
  tempmyfriends = [];
  newbuddy;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider,
              public events: Events) {
  }
 
  ionViewWillEnter() {
    this.userService.getMyFriends();
    this.events.subscribe('gotintogroup', () => {
      this.myfriends.splice(this.myfriends.indexOf(this.newbuddy.uid), 1);
      this.tempmyfriends = this.myfriends;
    })
    this.events.subscribe('friends', () => {
      
      this.myfriends = [];
      this.myfriends = this.userService.myFriends;
      this.groupmembers = this.userService.currentgroup;
      for (var key in this.groupmembers)
        for (var friend in this.myfriends) {
          if (this.groupmembers[key].uid === this.myfriends[friend].uid)
            this.myfriends.splice(this.myfriends.indexOf(this.myfriends[friend]), 1);
        }
      this.tempmyfriends = this.myfriends;
    })
  }
 
  searchuser(searchbar) {
    let tempfriends = this.tempmyfriends;
 
    var q = searchbar.target.value;
 
    if (q.trim() === '') {
      this.myfriends = this.tempmyfriends;
      return;
    }
 
    tempfriends = tempfriends.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
    
    this.myfriends = tempfriends;
 
  }
 
  addbuddy(buddy) {
    this.newbuddy = buddy;
    console.log(buddy)
    this.userService.addmember(buddy);
  }
 
}