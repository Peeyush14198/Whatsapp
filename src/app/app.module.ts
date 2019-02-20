import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, ElementRef } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Tabs, NavController,} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import firebase from 'firebase';
import { AngularFireModule } from "angularfire2";
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoaderProvider } from '../providers/loader/loader';
import { SignUpPage } from '../pages/sign-up/sign-up';

export const firebaseConfig = {
  apiKey: "AIzaSyD2d3qSUsZoLAZNvu0H7Q-q89avOrbc6FA",
  authDomain: "whatsapp-e72e8.firebaseapp.com",
  databaseURL: "https://whatsapp-e72e8.firebaseio.com",
  projectId: "whatsapp-e72e8",
  storageBucket: "whatsapp-e72e8.appspot.com",
  messagingSenderId: "995847434298"
  };
  firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    SignUpPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    SignUpPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireModule,
    StatusBar,
    AuthProvider,
    AngularFireAuth,
    LoaderProvider,
    AngularFireModule,
   
   
  ]
})
export class AppModule {}
