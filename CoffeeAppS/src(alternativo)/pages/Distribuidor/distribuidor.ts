import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

import { AddDistribuidorPage } from '../adddistribuidor/adddistribuidor';
import { UpdateDistribuidorPage} from '../updatedistribuidor/updatedistribuidor';
import { HomePage } from '../home/home';
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
  selector: 'page-distribuidor',
  templateUrl: 'distribuidor.html'
})
export class DistribuidorPage {
  distribuidorCollection: AngularFirestoreCollection<Distribuidor>;
  distribuidor: Distribuidor[];
  canReorder: boolean = false;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private afs: AngularFirestore) {

  }

  ionViewDidEnter(){
    this.distribuidorCollection = this.afs.collection('distribuidor', ref => ref.orderBy('invVendido'));
    this.distribuidorCollection.snapshotChanges().subscribe(distribuidorList => {
      this.distribuidor = distribuidorList.map(item => {
        return {
          nombre: item.payload.doc.data().nombre,
          apellidos: item.payload.doc.data().apellidos,
          telefono: item.payload.doc.data().telefono,
          correo: item.payload.doc.data().correo,
          passwd: item.payload.doc.data().passwd,
          invTotal: item.payload.doc.data().invTotal,
          invVendido: item.payload.doc.data().invVendido,
          //ganancia: item.payload.doc.data().ganancia,
          id: item.payload.doc.id
        }
      })
    })
  }
  home(){
    this.navCtrl.setRoot(HomePage);
  }
  reorderItems(indexes: any){
    if (this.canReorder) {
      // Lote de procesos
      let batch = this.afs.firestore.batch();

      //Movemos elementos
      let element = this.distribuidor[indexes.from];
      this.distribuidor.splice(indexes.from, 1);
      this.distribuidor.splice(indexes.to, 0, element);

      // Agregamos updates al batch
      this.distribuidor.forEach((item: Distribuidor, index: number) =>{
        if (item.invVendido != index) {
          let ref = this.afs.doc(`distribuidor/${item.id}`).ref;
          batch.update(ref, { invVendido: index });
        }
      });
      
      //Ejecutamos lote de procesos
      batch.commit().then(() => {
        console.log('Lista de distribuidores reordenadas');
      }).catch(err => {
        console.error(err);
      });
    }
  }

  infoItem(item: Distribuidor){
    let prompt = this.alertCtrl.create({
      title: "Informacion del Distribuidor",
      message: `Nombre: "${item.nombre}" <br> Apellidos: "${item.apellidos}" <br> Telefono: "${item.telefono}" <br> Correo: "${item.correo}"`,
      buttons: [{text: 'Aceptar'}],
    }).present();
  }

  editItem(item: Distribuidor){
    let prompt = this.alertCtrl.create({
      title: "Editar Sucursal",
      message: "Edita la informacion de una sucursal",
      inputs: [{
        name: 'nombre',
        type: 'text',
        value: `${item.nombre}`
      },{
        name: 'apellidos',
        type: 'text',
        value: `${item.apellidos}`
      },{
        name: 'telefono',
        type: 'number',
        value: `${item.telefono}`
      },{
        name: 'correo',
        type: 'email',
        value: `${item.correo}`
      }],
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Guardar',
        handler: data => {
          this.saveChanges(data.nombre, data.apellidos, data.telefono, data.correo, item);
        }
      }]
    }).present();
  }

  saveChanges(nombre: string, apellidos: string, telefono: number, correo: string, item: Distribuidor){
    this.afs.doc(`distribuidor/${item.id}`).update({ nombre, apellidos, telefono, correo }).then(() => {
      console.log(`Distribuidor actualizado: "${item.nombre}"`);
    }).catch(err => {
      console.log(err);
    });
  }

  deleteItem(item: Distribuidor){
    this.afs.doc(`distribuidor/${item.id}`).delete().then(() => {
      console.log(`Distribuidor eliminado: "${item.nombre}"`);
    }).catch(err => {
      console.log(err);
    });
  }

  newItem(){
    let prompt = this.alertCtrl.create({
      title: "Agregar Distribuidor",
      message: "Agrega un nuevo distribuidor",
      inputs: [{
        name: 'nombre',
        type: 'text',
        placeholder: 'Nombre del distribuidor'
      },{
        name: 'apellidos',
        type: 'text',
        placeholder: 'Apellidos del distribuidor'
      },{
        name: 'telefono',
        type: 'number',
        placeholder: 'Telefono del distribuidor'
      },{
        name: 'correo',
        type: 'email',
        placeholder: 'Correo del distribuidor'
      }, {
        name: 'passwd',
        type: 'password',
        placeholder: 'Contraseña'
      }],
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Guardar',
        handler: data => {
          this.addNombre(data.nombre, data.apellidos, data.telefono, data.correo, data.passwd);
        }
      }]
    }).present();
  }

  addNombre(nombre: string, apellidos: string, telefono: number, correo: string, passwd: string){
    let invTotal = 0;
    let invVendido = 0;
    //let ganancia = 0;
    /*if(this.distribuidor.length > 0){
      let last = this.distribuidor.length - 1;
      prioridad = this.distribuidor[last].prioridad + 1;
    }*/
    this.afs.collection('distribuidor').add({ nombre, apellidos, telefono, correo, passwd, invTotal, invVendido }).then(newItem => {
      console.log('Nuevo distribuidor: "${nombre}" (ID: ${newItem.id})');
    }).catch(err => {
      console.error(err);
    });
  }

  estadisticasItem(item: Distribuidor){
    let prompt = this.alertCtrl.create({
      title: "Estadisticas del Distribuidor",
      message: `Nombre: "${item.nombre}" <br> Apellidos: "${item.apellidos}" <br> Inventario Total: "${item.invTotal}" kg. de café <br> Inventario Vendido: "${item.invVendido}" kg. de café`,
      buttons: [{text: 'Aceptar'}],
    }).present();
  }

  addDistribuidor(){
    this.navCtrl.push(AddDistribuidorPage);
  }

  updateDistribuidor(){
    this.navCtrl.push(UpdateDistribuidorPage);
  }

}