import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Content, Events } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupPeoplePage } from '../group-people/group-people';
import { GroupMembersPage } from '../group-members/group-members';
import { GroupInfoPage } from '../group-info/group-info';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-group-chat',
  templateUrl: 'group-chat.html',
})
export class GroupChatPage {
  owner: boolean = false;
  groupName;
  @ViewChild('content') content: Content;
  
  newmessage;
  allgroupmsgs;
  alignuid;
  photoURL;
  imgornot;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider,
              public actionSheet: ActionSheetController,public events:Events ) {
    this.groupName = this.navParams.get('groupName');
    this.alignuid = firebase.auth().currentUser.uid;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.groupName = this.navParams.get('groupName');
    this.userService.getOwnerShip(this.groupName).then((res) => {
      if (res)
        this.owner = true;  
    }).catch((err) => {
      alert(err);
      })
    this.userService.getgroupmsgs(this.groupName);
    this.events.subscribe('newgroupmsg', () => {
      this.allgroupmsgs = [];
      this.imgornot = [];
      this.allgroupmsgs = this.userService.groupmsgs;
      for (var key in this.allgroupmsgs) {
        var d = new Date(this.allgroupmsgs[key].timestamp);
        var hours = d.getHours();
        var minutes = "0" + d.getMinutes();
        var month = d.getMonth();
        var da = d.getDate();
 
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        var formattedTime = monthNames[month] + "-" + da + "-" + hours + ":" + minutes.substr(-2);
 
        this.allgroupmsgs[key].timestamp = formattedTime;
        if (this.allgroupmsgs[key].message.substring(0, 4) === 'http') {
          this.imgornot.push(true);
        }
        else {
          this.imgornot.push(false);
        }
      }
      this.scrollto();
    })
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupchatPage');
  }
 
  presentOwnerSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Add member',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.push(GroupPeoplePage);
          }
        },
        {
          text: 'Remove member',
          icon: 'remove-circle',
          handler: () => {
            this.navCtrl.push(GroupMembersPage,{groupName:this.groupName});
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push(GroupInfoPage, {groupName: this.groupName});
          }
        },
        {
          text: 'Delete Group',
          icon: 'trash',
          handler: () => {
          this.userService.deletegroup().then(()=>{
            this.navCtrl.pop()
          }).catch((err)=>{
              console.log(err)
          })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }
 
  presentMemberSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Leave Group',
          icon: 'log-out',
          handler: () => {
            this.userService.leavegroup().then(()=>{
              this.navCtrl.pop();
            }).catch((err)=>{
              console.log(err)
            });
          }
        },
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push(GroupInfoPage, {groupName: this.groupName});
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

addgroupmsg() {
    this.userService.addgroupmsg(this.newmessage).then(() => {
      this.scrollto();
      this.newmessage = '';
    })
  }
 
  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }
 
}