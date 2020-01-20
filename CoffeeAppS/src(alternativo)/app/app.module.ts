import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from '../providers/auth-service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignInPage } from '../pages/signin/signin';
import { InventarioPage } from '../pages/inventario/inventario';
import { SucursalPage } from '../pages/sucursal/sucursal';
import { AddSucursalPage} from '../pages/addsucursal/addsucursal';
import { UpdateSucursalPage } from '../pages/updatesucursal/updatesucursal';
import { DistribuidorPage } from '../pages/distribuidor/distribuidor';
import { AddDistribuidorPage } from '../pages/adddistribuidor/adddistribuidor';
import { UpdateDistribuidorPage } from '../pages/updatedistribuidor/updatedistribuidor';

export const firebaseConfig = {
  apiKey: "AIzaSyAtnd-lJ2ahSwbUKXK6XcKBI3pyXhkMr6Y",
  authDomain: "coffeeapp-33186.firebaseapp.com",
  databaseURL: "https://coffeeapp-33186.firebaseio.com",
  projectId: "coffeeapp-33186",
  storageBucket: "coffeeapp-33186.appspot.com",
  messagingSenderId: "545066491696"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignInPage,
    InventarioPage,
    SucursalPage,
    AddSucursalPage,
    UpdateSucursalPage,
    DistribuidorPage,
    AddDistribuidorPage,
    UpdateDistribuidorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignInPage,
    InventarioPage,
    SucursalPage,
    AddSucursalPage,
    UpdateSucursalPage,
    DistribuidorPage,
    AddDistribuidorPage,
    UpdateDistribuidorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
