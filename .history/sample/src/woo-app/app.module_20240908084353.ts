import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppComponent } from './app.component';

import { HomePage } from './pages/home/home';
import { Menu } from './pages/menu/menu';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    Menu
  ],
  imports: [BrowserModule, IonicModule.forRoot(AppComponent), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
