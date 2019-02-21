import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
import { LoaderProvider } from '../../providers/loader/loader';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar: string;
  displayName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userService:UserServiceProvider, public camera:Camera,
    public zone: NgZone,private loader : LoaderProvider,private alertCtrl:AlertController) {
  }

  ionViewWillEnter() {
   this.loaduserdetails()
  }
  
  loaduserdetails() {
    this.userService.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }

  logout(){
    this.loader.loading().then(()=>{
      firebase.auth().signOut().then(()=>{
        this.navCtrl.setRoot(LoginPage)
        this.loader.dismiss();
      })
    })
  }

  editUserImage()
  {
   
  }

}
