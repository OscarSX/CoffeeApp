import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthService } from '../../providers/auth-service';

import { SucursalPage } from '../sucursal/sucursal';
import { UserModel } from '../../models/user-model';

  @Component({
    selector: 'page-addsucursal',
    templateUrl: 'addsucursal.html'
  })
  export class AddSucursalPage {
    userModel: UserModel;
    
    constructor(

        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private afs: AngularFirestore,
        public authService: AuthService) {
        this.userModel = new UserModel();
    }

    signUp() {
        var nombre: any = this.userModel.nombre;
        var telefono: any = this.userModel.telefono;
        var correo: any = this.userModel.email;

        let loading = this.loadingCtrl.create({
            content: 'Creando cuenta. Por favor, espere...'
        });
        loading.present();
        this.addNombre(nombre, telefono, correo);
        loading.dismiss();
        this.navCtrl.push(SucursalPage);
/*
        this.authService.createUserWithEmailAndPassword(this.userModel).then(result => {
            loading.dismiss();

            this.navCtrl.push(SucursalPage);
        }).catch(error => {
            loading.dismiss();

            console.log(error);
            this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
        });*/
    }
    sucursal(){
        this.navCtrl.setRoot(SucursalPage);
    }
    addNombre(nombre: string, telefono: number, correo: string){
        let inventario=0;
        //let ganancia = 0;
        /*if(this.distribuidor.length > 0){
          let last = this.distribuidor.length - 1;
          prioridad = this.distribuidor[last].prioridad + 1;
        }*/
        this.afs.collection('sucursal').add({ nombre, telefono, inventario, correo }).then(newItem => {
          console.log('Nueva sucursal: "${nombre}" (ID: ${newItem.id})');
        }).catch(err => {
          console.error(err);
        });
      }

    alert(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }
}