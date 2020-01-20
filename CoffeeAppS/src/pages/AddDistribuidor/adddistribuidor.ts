import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthService } from '../../providers/auth-service';

import { DistribuidorPage } from '../distribuidor/distribuidor';
import { UserModel } from '../../models/user-model';

interface Distribuidor{
    nombre: string;
    apellidos: string;
    telefono: number;
    correo: string;
    passwd: string;
    invTotal: number;
    invVendido: number;
    //ganancia: number,
    id?: string;
  }

  @Component({
    selector: 'page-adddistribuidor',
    templateUrl: 'adddistribuidor.html'
  })
  export class AddDistribuidorPage {
    distribuidorCollection: AngularFirestoreCollection<Distribuidor>;
    distribuidor: Distribuidor[];

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
        var apellidos: any = this.userModel.apellidos;
        var telefono: any = this.userModel.telefono;
        var correo: any = this.userModel.email;
        var passwd: any = this.userModel.password;

        this.addNombre(nombre, apellidos, telefono, correo, passwd);

        let loading = this.loadingCtrl.create({
            content: 'Creando cuenta. Por favor, espere...'
        });
        loading.present();

        this.authService.createUserWithEmailAndPassword(this.userModel).then(result => {
            loading.dismiss();

            this.navCtrl.push(DistribuidorPage);
        }).catch(error => {
            loading.dismiss();

            console.log(error);
            this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
        });
    }

    addNombre(nombre: string, apellidos: string, telefono: number, correo: string, passwd: string){
        let invTotal = 0;
        let invVendido = 0;
        //let ganancia = 0;
        /*if(this.distribuidor.length > 0){
          let last = this.distribuidor.length - 1;
          prioridad = this.distribuidor[last].prioridad + 1;
        }*/
        this.afs.collection('distribuidor').add({nombre, apellidos, telefono, correo, passwd, invTotal, invVendido }).then(newItem => {
          console.log('Nuevo distribuidor: "${nombre}" (ID: ${newItem.id})');
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