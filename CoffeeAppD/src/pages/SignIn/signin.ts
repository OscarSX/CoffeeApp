import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SignInPage {

  constructor(public navCtrl: NavController) {

  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }

}