import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    wc: any;

    constructor(public navCtrl: NavController) {
        this.wc = WC({
            url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
            consumerKey: 'key',
            consumerSecret: 'secret'
        });

        this.wc
            .getAsync('products')
            .then(
                data => {
                    
                },
                err => console.log(err)
            )
    }

}