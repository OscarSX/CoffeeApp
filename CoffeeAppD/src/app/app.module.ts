import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/signin/signin';
import { ProfilePage } from '../pages/profile/profile';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { InventarioPage } from '../pages/inventario/inventario';
import { LocationDetailsPage } from '../pages/locationdetails/locationdetails';
import { LocationSucursalPage } from '../pages/locationsucursal/locationsucursal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignInPage,
    ProfilePage,
    PedidosPage,
    InventarioPage,
    LocationDetailsPage,
    LocationSucursalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignInPage,
    ProfilePage,
    PedidosPage,
    InventarioPage,
    LocationDetailsPage,
    LocationSucursalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
