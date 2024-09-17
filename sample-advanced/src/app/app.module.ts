import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PayPal } from '@ionic-native/paypal';
import { OneSignal } from '@ionic-native/onesignal';

import { AppComponent } from './app.component';
import { Cart } from './pages/cart/cart'; // not a page-module; created by a ModalController
// all other page-modules lazy-loaded

import { WooCommerceProvider } from './providers/woocommerce/woocommerce';


@NgModule({
  declarations: [
    AppComponent,
    Cart,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    Cart,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PayPal,
    OneSignal,
    { 
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    // custom providers
    WooCommerceProvider
  ],
})

export class AppModule {}