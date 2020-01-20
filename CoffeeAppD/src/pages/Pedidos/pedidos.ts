import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocationDetailsPage } from '../locationdetails/locationdetails';


@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html'
})
export class PedidosPage {

  constructor(public navCtrl: NavController) {

  }

  detallesUbic(){
    this.navCtrl.push(LocationDetailsPage);
  }
}