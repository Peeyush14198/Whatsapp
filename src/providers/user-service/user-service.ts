
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserServiceProvider {
  firedata = firebase.database().ref('/whatsapp-e72e8')
  nativepath: any;
  firestore = firebase.storage();
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  constructor(public afireauth:AngularFireAuth,private Camera:Camera) {
    console.log('Hello UserServiceProvider Provider');
    this.myPhotosRef = firebase.storage().ref('/Photos/');
  }


  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
        alert(snapshot.val())
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getAllUsers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}
