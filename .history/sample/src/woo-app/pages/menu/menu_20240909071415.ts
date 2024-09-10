import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

import { HomePage } from '../home/home';


@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class Menu {

    homePage: Component;
    wc: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.homePage = HomePage;
        this.wc = WC({
            url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
            consumerKey: 'key',
            consumerSecret: 'secret'
        });
        this.wc
            .getAsync('products/categories')
            .this(
                data => {

                },
                e
            )
    }

    ionViewDidLoad() {
        
    }

}