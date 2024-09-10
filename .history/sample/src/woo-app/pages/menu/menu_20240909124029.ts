import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

import { Home } from '../home/home';
import { Products } from '../products/products';


@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class Menu {

    @Input() wc: any;
    homePage: Component;
    categories: any[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.homePage = Home;
        this.categories = [];

        if (!!this.wc)
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
                            if (category?.parent === 0) {
                                this.categories.push(category);
                                switch (category?.slug) {
                                    case 'clothing':
                                        category.icon = 'shirt';
                                        break;
                                    case 'music':
                                        category.icon = 'musical-notes';
                                        break;
                                    case 'posters':
                                        category.icon = 'images';
                                        break;
                                }
                            } else console.log(category) // todo:
                        })
                    ),
                (err: any) => console.log(err)
            )
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad')
    }

    openCategoryPage(category: any) {
        this.navCtrl
            .setRoot(
                Products,
                { category }
            )
    }

}