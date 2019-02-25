import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupPeoplePage } from '../group-people/group-people';
import { GroupMembersPage } from '../group-members/group-members';
import { GroupInfoPage } from '../group-info/group-info';

@IonicPage()
@Component({
  selector: 'page-group-chat',
  templateUrl: 'group-chat.html',
})
export class GroupChatPage {
  owner: boolean = false;
  groupName;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider,
              public actionSheet: ActionSheetController) {
    this.groupName = this.navParams.get('groupName');
    this.userService.getOwnerShip(this.groupName).then((res) => {
      if (res)
        this.owner = true;  
    }).catch((err) => {
      alert(err);
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
            //this.userService.leavegroup();
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
 
}