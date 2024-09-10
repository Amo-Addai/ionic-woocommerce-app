import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppComponent } from './app.component';
import { Menu } from './pages/menu/menu';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Products } from './pages/products/product-details';
import { List } from './pages/list/list';


@NgModule({
  declarations: [
    AppComponent,
    Menu,
    Home,
    Products,
    List
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    Menu,
    Home,
    Products,
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
