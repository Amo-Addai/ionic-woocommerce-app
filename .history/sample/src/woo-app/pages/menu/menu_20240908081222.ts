import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class Menu {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this
    }

    ionViewDidLoad() {
        
    }

}