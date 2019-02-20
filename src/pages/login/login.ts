import { Component} from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import firebase, { auth } from "firebase";
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { LoaderProvider } from '../../providers/loader/loader';
import { SignUpPage } from '../sign-up/sign-up';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    phone:any;
    public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
   constructor(public navCtrl: NavController,public alertCtrl:AlertController,private authService:AuthProvider,
    private loader:LoaderProvider) {
 
   }
 
   ionViewDidLoad() {
    
   }

   login(userEmail,userPassword)
   {
     this.loader.loading();
     this.authService.userEmailPasswordLogin(userEmail,userPassword).then((res:any)=>{
        if(!res.code)
        {
          this.navCtrl.setRoot(TabsPage);
          this.loader.dismiss();
        }
        else{
          alert(res);
          this.loader.dismiss();
        }
     })
   }

   signUp()
   {
     this.navCtrl.setRoot(SignUpPage);
   }
  
}
 
 
 