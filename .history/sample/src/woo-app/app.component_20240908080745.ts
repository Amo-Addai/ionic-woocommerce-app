import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Menu } from './pages/menu/menu';
import { ListPage } from './pages/list/list';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<
  {
    title: string,
    component: any
  }
  >;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];
  }

  initializeApp() {
    this.platform.ready().then(() => {

    });
  }

}
