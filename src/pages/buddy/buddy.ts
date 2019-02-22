import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import firebase from 'firebase';
import {conReq} from '../../models/request';

@IonicPage()
@Component({
  selector: 'page-buddy',
  templateUrl: 'buddy.html',
})
export class BuddyPage {
  arr = [];
  filteredUsers = [];
  newRequest = {} as conReq;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService:UserServiceProvider,
    private alertCtrl:AlertController) {
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

sendreq(recipient) {
    this.newRequest.sender = firebase.auth().currentUser.uid;
    this.newRequest.recipient = recipient.uid;
    if (this.newRequest.sender === this.newRequest.recipient)
      alert('You are your friend always');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });
    
      this.userService.sendrequest(this.newRequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredUsers.indexOf(recipient);
          this.filteredUsers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }

}
