import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PedidosPage } from '../pedidos/pedidos';

@Component({
  selector: 'page-locationdetails',
  templateUrl: 'locationdetails.html'
})
export class LocationDetailsPage {

  constructor(public navCtrl: NavController) {

  }

  pedidos(){
    this.navCtrl.push(PedidosPage);
  }
}