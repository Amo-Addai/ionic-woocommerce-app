import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../'

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class Menu {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {}

    ionViewDidLoad() {
        
    }

}