import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { OneSignal } from '@ionic-native/onesignal';

// import { Menu } from './pages/menu/menu'; // * only required for non-lazy-loading


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'Menu'; // string instead of raw class-type Menu, for lazy-loading

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public onesignal: OneSignal
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      // when platform ready, can add higher-level native plugins required

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // * sets up as a user in OneSignal
      this.onesignal
          .startInit( // TODO: get from process.env in environments/
            'ONESIGNAL_APP_ID',
            'FIREBASE_CLOUD_MESSAGING_SENDER_ID'
          )
      this.onesignal
          .inFocusDisplaying(
            this.onesignal
                .OSInFocusDisplayOption
                .InAppAlert
          )
      this.onesignal
          .handleNotificationReceived()
          .subscribe(() => (
            null // todo:
          ))
      this.onesignal
          .handleNotificationOpened()
          .subscribe(() => (
            null // todo:
          ))
      this.onesignal
          .endInit()
    });
  }

}
