import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppComponent } from './app.component';
import { Menu } from './pages/menu/menu';
import { HomePage } from './pages/home/home';
import { Products }


@NgModule({
  declarations: [
    AppComponent,
    Menu,
    HomePage,
  ],
  imports: [BrowserModule, IonicModule.forRoot(AppComponent)],
  bootstrap: [IonicApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
})

export class AppModule {}
