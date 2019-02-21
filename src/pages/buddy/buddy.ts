import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-buddy',
  templateUrl: 'buddy.html',
})
export class BuddyPage {
  arr = [];
  filteredUsers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService:UserServiceProvider) {
    this.userService.getAllUsers().then((res: any) => {
      this.filteredUsers = res;
      this.arr = res;
      console.log(this.arr +  " "  + this.filteredUsers)
   })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddyPage');
  }

  searchuser(searchbar) {
    this.filteredUsers = this.arr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
 
    this.filteredUsers = this.filteredUsers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

}
