import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignInPage } from '../signin/signin';
import { ProfilePage } from '../profile/profile';
import { PedidosPage } from '../pedidos/pedidos';
import { InventarioPage } from '../inventario/inventario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  perfil(){
    this.navCtrl.push(ProfilePage);
  }

  pedidos(){
    this.navCtrl.push(PedidosPage);
  }

  inventario(){
    this.navCtrl.push(InventarioPage);
  }

  salir(){
    this.navCtrl.push(SignInPage);
  }
}