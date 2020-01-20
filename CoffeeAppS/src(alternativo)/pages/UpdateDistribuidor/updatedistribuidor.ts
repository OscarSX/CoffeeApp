import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DistribuidorPage } from '../distribuidor/distribuidor';

@Component({
  selector: 'page-updatedistribuidor',
  templateUrl: 'updatedistribuidor.html'
})
export class UpdateDistribuidorPage {

  constructor(public navCtrl: NavController) {

  }

  distribuidor(){
    this.navCtrl.push(DistribuidorPage);
  }
}