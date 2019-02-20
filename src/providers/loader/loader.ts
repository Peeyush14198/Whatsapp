
import { Injectable } from '@angular/core';
import { LoadingController, Events, Loading } from 'ionic-angular';

@Injectable()
export class LoaderProvider {
  loader: Loading
  constructor(
    public loadingcontroller: LoadingController, public events: Events) {
  }
  // To create a loader
  loading() {
    this.loader = this.loadingcontroller.create({
      spinner: 'hide',
      content: `<div class="container">
  <div class="dot-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>  
  </div>
  <div class="dot-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>  
  </div>
  <div class="dot-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>  
  </div>
</div> `,
      cssClass: 'loader'
    });
    return this.loader.present();
  }
  // To dismiss the laoder
  dismiss() {
    return new Promise((resolve, reject) => {
      if (this.loading) {
        return this.loader.dismiss(resolve(true)).catch(error => {
          console.log('loading error: ', error);
        });
      } else {
        resolve(true);
      }
    });
  }
  timeLoading() {
    this.loader = this.loadingcontroller.create({
      spinner: 'hide',
      content: `<div class="container">
  <div class="dot-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>  
  </div>
  <div class="dot-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>  
  </div>
  <div class="dot-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>  
  </div>
</div>`,
      cssClass: 'loader',
      duration:2500
    });
    return this.loader.present();
  }
}
