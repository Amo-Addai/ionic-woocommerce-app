import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
    selector: 'page-products',
    templateUrl: 'products.html'
})
export class Products {

    @Input() wc: any;
    products: any[];
    page: number;
    category: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) {
        
        this.page = 1;

        if (!!this.wc)
            this.wc = WC({
                url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
                consumerKey: 'key',
                consumerSecret: 'secret'
            });
        
        

    }

    ionViewDidLoad() {

    }

}