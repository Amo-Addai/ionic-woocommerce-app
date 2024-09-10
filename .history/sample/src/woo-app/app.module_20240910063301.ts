import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppComponent } from './app.component';
import { Menu } from './pages/menu/menu';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { ProductDetails } from './pages/product-details/product-details';
imort { Cart } from './pages/cart/cart';
import { List } from './pages/list/list';


@NgModule({
  declarations: [
    AppComponent,
    Menu,
    Home,
    Products,
    ProductDetails,
    Cart,
    List
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    Menu,
    Home,
    Products,
    ProductDetails,
    List
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { 
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ],
})

export class AppModule {}
