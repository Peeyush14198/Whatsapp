import firebase from 'firebase';
import { Injectable, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoaderProvider } from '../loader/loader';
import { AlertController } from 'ionic-angular';


@Injectable()
export class AuthProvider {
  firedata = firebase.database().ref('/whatsapp-e72e8');
  constructor(public afireauth: AngularFireAuth, private loader: LoaderProvider, private alertCtrl: AlertController,
  ) {

  }

  userEmailPasswordLogin(userEmail, userPassword) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.signInWithEmailAndPassword(userEmail, userPassword).then((user) => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise
  }

  userCreateEmailPassword(userEmail, userPassword, userName) {
    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(userEmail, userPassword).then(() => {
        resolve(true);
        this.loader.loading().then(() => {
          //Sends email for verification
          this.sendEmailVerification()
          this.addUser(userName);
          this.afireauth.authState.subscribe(auth => {
            let alertPopup = this.alertCtrl.create({
              title: 'Verification',
              message: 'Check Your Email For Verification',
              enableBackdropDismiss: false,
              buttons: [{
                text: 'Ok',
                handler: () => {
                  alertPopup.dismiss()
                  return false
                }
              },
              ]
            });
            // Show the alert`
            alertPopup.present();
            // Return false to avoid the page to be popped 
            return false;
          })

        }).catch((err) => {
          alert(err);
        });
        this.loader.dismiss();
      }).catch((err) => {
        reject(err)
      })
    })
    return promise;
  }
  private sendEmailVerification() {
    //To send email verification
    this.afireauth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        })
    });
  }
  private addUser(userName) {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: userName,
        photoURL: ''
      }).then(() => {
        this.firedata.child(this.afireauth.auth.currentUser.uid).set({
          uid: this.afireauth.auth.currentUser.uid,
          displayName: userName,
          photoURL: ' '
        })
      })
  }
}
