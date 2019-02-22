import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-chating',
  templateUrl: 'chating.html',
})
export class ChatingPage {
  @ViewChild('content') content: Content;
  buddy: any;
  newmessage;
  allmessages = [];
  photoURL;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider,
              public events: Events, public zone: NgZone) {
    this.buddy = this.userService.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.zone.run(() => {
        this.allmessages = this.userService.buddymessages;
      })
      
      
    })
  }

  addmessage() {
    this.userService.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }
  ionViewDidEnter() {
    this.userService.getbuddymessages();
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

}
