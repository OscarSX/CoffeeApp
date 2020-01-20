import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocationSucursalPage } from '../locationsucursal/locationsucursal';

@Component({
  selector: 'page-inventario',
  templateUrl: 'inventario.html'
})
export class InventarioPage {
  
  constructor(public navCtrl: NavController) {

  }

  ubicSuc(){
    this.navCtrl.push(LocationSucursalPage);
  }
}