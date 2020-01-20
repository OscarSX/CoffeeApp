import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

import { AddSucursalPage } from '../addsucursal/addsucursal';
import { UpdateSucursalPage} from '../updatesucursal/updatesucursal'
import { HomePage } from '../home/home';

interface Sucursal{
  nombre: string;
  telefono: number;
  correo: string;
  inventario: number;
  id?: string;
}

interface Inventario{
  prodTotal: number;
  invAlmacen: number;
  invEnviado: number;
}

@Component({
  selector: 'page-sucursal',
  templateUrl: 'sucursal.html'
})
export class SucursalPage {
  sucursalCollection: AngularFirestoreCollection<Sucursal>;
  sucursal: Sucursal[];

  inventarioCollection: AngularFirestoreCollection<Inventario>;
  inventario: Inventario[];

  canReorder: boolean = false;
  intento: boolean = true;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private afs: AngularFirestore) {
  
  }

  ionViewDidEnter(){
    this.sucursalCollection = this.afs.collection('sucursal', ref => ref.orderBy('inventario'));
    this.sucursalCollection.snapshotChanges().subscribe(sucursalList => {
      this.sucursal = sucursalList.map(item => {
        return {
          nombre: item.payload.doc.data().nombre,
          telefono: item.payload.doc.data().telefono,
          correo: item.payload.doc.data().correo,
          inventario: item.payload.doc.data().inventario,
          id: item.payload.doc.id
        }
      })
    })
  }
  reorderItems(indexes: any){
    if (this.canReorder) {
      // Lote de procesos
      let batch = this.afs.firestore.batch();

      //Movemos elementos
      let element = this.sucursal[indexes.from];
      this.sucursal.splice(indexes.from, 1);
      this.sucursal.splice(indexes.to, 0, element);

      // Agregamos updates al batch
      this.sucursal.forEach((item: Sucursal, index: number) =>{
        if (item.inventario != index) {
          let ref = this.afs.doc(`sucursal/${item.id}`).ref;
          batch.update(ref, { inventario: index });
        }
      });
      
      //Ejecutamos lote de procesos
      batch.commit().then(() => {
        console.log('Lista de sucursales reordenadas');
      }).catch(err => {
        console.error(err);
      });
    }
  }

  infoItem(item: Sucursal){
    let prompt = this.alertCtrl.create({
      title: "Informacion de Sucursal",
      message: `Nombre: "${item.nombre}" <br> Telefono: "${item.telefono}" <br> Correo: "${item.correo}" <br> Inventario actual: "${item.inventario}" kg. de café`,
      buttons: [{text: 'Aceptar'}],
    }).present();
  }

  editItem(item: Sucursal){
    let prompt = this.alertCtrl.create({
      title: "Editar Sucursal",
      message: "Edita la informacion de una sucursal",
      inputs: [{
        name: 'nombre',
        type: 'text',
        value: `${item.nombre}`
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
          this.saveChanges(data.nombre, data.telefono, data.correo, item);
        }
      }]
    }).present();
  }

  saveChanges(nombre: string, telefono: number, correo: string, item: Sucursal){
    this.afs.doc(`sucursal/${item.id}`).update({ nombre, telefono, correo }).then(() => {
      console.log(`Sucursal actualizada: "${item.nombre}"`);
    }).catch(err => {
      console.log(err);
    });
  }

  deleteItem(item: Sucursal){
    this.afs.doc(`sucursal/${item.id}`).delete().then(() => {
      console.log(`Sucursal eliminada: "${item.nombre}"`);
    }).catch(err => {
      console.log(err);
    });
  }

  newItem(){
    let prompt = this.alertCtrl.create({
      title: "Agregar Sucursal",
      message: "Llena los siguientes campos",
      inputs: [{
        name: 'nombre',
        type: 'text',
        placeholder: 'Nombre de la sucursal'
      },{
        name: 'telefono',
        type: 'number',
        placeholder: 'Telefono de la sucursal'
      },{
        name: 'correo',
        type: 'email',
        placeholder: 'Correo de la sucursal'
      }],
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Agregar',
        handler: data => {
          this.addNombre(data.nombre, data.telefono, data.correo);
        }
      }]
    }).present();
  }

  addNombre(nombre: string, telefono: number, correo: string){
    let inventario=0;
    /*if(this.sucursal.length > 0){
      let last = this.sucursal.length - 1;
      inventario = this.sucursal[last].inventario + 1;
    }*/
    this.afs.collection('sucursal').add({ nombre, telefono, inventario, correo }).then(newItem => {
      console.log('Nueva sucursal: "${nombre}" (ID: ${newItem.id})');
    }).catch(err => {
      console.error(err);
    });
  }

  abastecerItem(item: Sucursal){
    let prompt = this.alertCtrl.create({
      title: "Abastecer Sucursal",
      message: "Ingresa la cantidad de café a enviar",
      inputs: [{
        name: 'inventario',
        type: 'number',
        placeholder: 'Kg. de café'
      }],
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Abastecer',
        handler: data => {
          this.updateInventario(data.inventario, item);
          this.updateInvPrinicpal(data.inventario, item);
          this.intento = true;
        }
      }]
    }).present();
  }

  updateInventario(abast: number, item: Sucursal){
    var abastAlt: any = abast;
    var invAct: any = item.inventario;
    var inventario: any = parseInt(abastAlt) + parseInt(invAct);    

    this.afs.doc(`sucursal/${item.id}`).update({ inventario }).then(() => {
      console.log(`Sucursal abastecida: "${item.nombre}"`);
    }).catch(err => {
      console.log(err);
    });
  }

  updateInvPrinicpal(abast: number, item: Sucursal){
    var abastAlt: any = abast;

    this.inventarioCollection = this.afs.collection('inventario');
    this.inventarioCollection.snapshotChanges().subscribe(inventarioList => {
      this.inventario = inventarioList.map(item => {
        if(item.payload.doc.id == 'invSucPrincipal' && this.intento){
          var invAlmacenAlt: any = item.payload.doc.data().invAlmacen;
          var invEnviadoAlt: any = item.payload.doc.data().invEnviado;

          var invEnviado: any = parseInt(invEnviadoAlt) + parseInt(abastAlt);
          var invAlmacen: any = parseInt(invAlmacenAlt) - parseInt(abastAlt);
          
          this.intento = false;

          this.afs.doc(`inventario/invSucPrincipal`).update({ invAlmacen, invEnviado }).then(() => {
            console.log(`Inventario actualizado`);
          }).catch(err => {
            console.log(err);
          });
        }
        return{
          prodTotal: item.payload.doc.data().prodTotal,
          invAlmacen: item.payload.doc.data().invAlmacen,
          invEnviado: item.payload.doc.data().invEnviado
        }
      })
    })
  }

  addSucursal(){
    this.navCtrl.push(AddSucursalPage);
  }

  updateSucursal(){
    this.navCtrl.push(UpdateSucursalPage);
  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }
}