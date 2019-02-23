import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the CreateGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {
  newGroup = {
    groupName: 'GroupName',
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService:UserServiceProvider
    ,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGroupPage');
  }

  createGroup() {
    this.userService.addGroup(this.newGroup).then(() => {
      this.navCtrl.pop();
    }).catch((err) => {
      alert(JSON.stringify(err));
    })
  }

  editGroupName() {
    let alert = this.alertCtrl.create({
      title: 'Edit Group Name',
      inputs: [{
        name: 'groupname',
        placeholder: 'Give a new groupname'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
 
        }
      },
      {
        text: 'Set',
        handler: data => {
          if (data.groupname) {
            this.newGroup.groupName = data.groupname
          }
 
          else {
            this.newGroup.groupName = 'groupName';
          }
        }
      }
      ]
    });
    alert.present();
  }

}
