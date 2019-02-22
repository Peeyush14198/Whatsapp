import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { BuddyPage } from '../buddy/buddy';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ChatingPage } from '../chating/chating';

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myRequests
  myFriends
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider,
    private events: Events, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }

  ionViewWillEnter() {
    this.userService.getmyrequests();
    this.events.subscribe('gotrequests', () => {
      this.myRequests = [];
      this.myRequests = this.userService.userDetails;
    })
    this.userService.getMyFriends();
    this.events.subscribe('friends', () => {
      this.myFriends = [];
      this.myFriends = this.userService.myFriends;
      console.log(this.myFriends)
    })

  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }

  addbuddy() {
    this.navCtrl.push(BuddyPage);
  }
  accept(item) {
    this.userService.acceptRequest(item).then(() => {

      let newalert = this.alertCtrl.create({
        title: 'Friend added',
        subTitle: 'Tap on the friend to chat with him',
        buttons: ['Okay']
      });
      newalert.present();
    })
  }

  ignore(item) {
    this.userService.deleteRequest(item).then(() => {

    }).catch((err) => {
      alert(err);
    })
  }

  buddyChat(item) {
     this.userService.intializeBuddy(item);
     this.navCtrl.push(ChatingPage)
  }
}
