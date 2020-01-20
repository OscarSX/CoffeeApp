import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

interface Inventario{
    prodTotal: number;
    invAlmacen: number;
    invEnviado: number;
  }

@Component({
  selector: 'page-inventario',
  templateUrl: 'inventario.html'
})
export class InventarioPage {
  inventarioCollection: AngularFirestoreCollection<Inventario>;
  inventario: Inventario[];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private afs: AngularFirestore) {
  
  }

  ionViewDidEnter(){
    this.inventarioCollection = this.afs.collection('inventario');
    this.inventarioCollection.snapshotChanges().subscribe(inventarioList => {
      this.inventario = inventarioList.map(item => {
        return {
          prodTotal: item.payload.doc.data().prodTotal,
          invAlmacen: item.payload.doc.data().invAlmacen,
          invEnviado: item.payload.doc.data().invEnviado
        }
      })
    })
  }
}