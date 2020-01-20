import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SucursalPage } from '../sucursal/sucursal';

@Component({
  selector: 'page-updatesucursal',
  templateUrl: 'updatesucursal.html'
})
export class UpdateSucursalPage {

  constructor(public navCtrl: NavController) {

  }

  sucursal(){
    this.navCtrl.push(SucursalPage);
  }
}