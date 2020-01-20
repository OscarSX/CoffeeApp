import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

import { UserModel } from '../../models/user-model';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SignInPage {
  userModel: UserModel;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authService: AuthService) {
        this.userModel = new UserModel();
  }

  alert(title: string, message: string) {
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
    });
    alert.present();
  }

  signIn() {
    let loading = this.loadingCtrl.create({
        content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.authService.signInWithEmailAndPassword(this.userModel).then(result => {
        loading.dismiss();

        this.navCtrl.setRoot(HomePage);
    }).catch(error => {
        loading.dismiss();

        console.log(error);
        this.alert('Error', 'El correo y/o contraseña son incorrectos.');
    });
  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }

}