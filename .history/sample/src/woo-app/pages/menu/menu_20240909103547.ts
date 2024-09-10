import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

import { HomePage } from '../home/home';


@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class Menu {

    wc: any;
    homePage: Component;
    categories: any[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.homePage = HomePage;
        this.categories = [];
        this.wc = WC({
            url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
            consumerKey: 'key',
            consumerSecret: 'secret'
        });
        this.wc
            .getAsync('products/categories')
            .this(
                (data: any) => (
                    data = JSON.parse(data?.body || '{}'),
                    console.log(data?.product_categories),
                    data?.product_categories
                        ?.map((category: any) => {
                            (category?.parent === 0)
                            ? (
                                this.categories.push(category);
                                switch (category?.slug) {
                                    case ''
                                }
                                == 'clothing'
                            ) : console.log(category) // todo:
                        })
                    ),
                (err: any) => console.log(err)
            )
    }
    ,
    // switch (category?.slug || '') {}
    ionViewDidLoad() {
        console.log('ionViewDidLoad')
    }

}