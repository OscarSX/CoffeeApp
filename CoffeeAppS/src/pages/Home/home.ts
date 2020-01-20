import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

import { UserModel } from '../../models/user-model';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

import { SignInPage } from '../signin/signin';
import { SucursalPage } from '../sucursal/sucursal';
import { DistribuidorPage } from '../distribuidor/distribuidor';
import { InventarioPage } from '../inventario/inventario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userModel: UserModel;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authService: AuthService, private afs: AngularFirestore) {
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

  sucursal(){
    this.navCtrl.push(SucursalPage);
  }

  distribuidor(){
    this.navCtrl.push(DistribuidorPage);
  }

  inventario(){
    this.navCtrl.push(InventarioPage);
  }

  salir(){
    let loading = this.loadingCtrl.create({
      content: 'Cerrando sesión...'
    });
    loading.present();

    this.authService.signOut().then(result => {
      loading.dismiss();
      
      this.navCtrl.setRoot(SignInPage);
    }).catch(error => {
      loading.dismiss();

      console.log(error);
      this.alert('Error', 'Algo ha ocurrido.');
    });
  }
}