import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AppComponent } from './app.component';
import { SignUp } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { Menu } from './pages/menu/menu';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { ProductDetails } from './pages/product-details/product-details';
import { Cart } from './pages/cart/cart';
import { List } from './pages/list/list';


@NgModule({
  declarations: [
    AppComponent,
    SignUp,
    Login,
    Menu,
    Home,
    Products,
    ProductDetails,
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
    SignUp,
    Login,
    Menu,
    Home,
    Products,
    ProductDetails,
    Cart,
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
