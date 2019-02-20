import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, AlertController, NavController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { LoaderProvider } from '../../providers/loader/loader';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  authForm: FormGroup;
  constructor( private formBuilder: FormBuilder, public viewController: ViewController,private alertCtrl:AlertController,
    private loader: LoaderProvider,private authServcie : AuthProvider,private angularFireAuth:AngularFireAuth,private navCtrl:NavController) {
    //User form validators intiallization
    this.authForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      renterPassword: ['', [Validators.required, this.equalto('password')]],
      username: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }
  ionViewDidLoad()
  {
    
  }
  //To check wether all the validators are filled
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;
      let isValid = control.root.value[field_name] == input
      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }
  //Called when register button is clicked
  onSubmit(value: any): void {
    this.authServcie.userCreateEmailPassword(value.email,value.password,value.username).then((res:any)=>{
      if(!res.code)
      {
        //Write your own stuff
        this.navCtrl.setRoot(LoginPage)
      }
      else{
        alert(res);
      }
   })
  }
 
}
