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
        this.category =
            this.navParams
                .get('category');

        if (!!this.wc)
            this.wc = WC({
                url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
                consumerKey: 'key',
                consumerSecret: 'secret'
            });
        
        this.wc
            .getAsync(
                `products?filter[category]=${
                    this.category
                        .slug
                }`
            )
            .then(
                (data: any) => (
                    data = JSON.parse(
                        data?.body || '{}'
                    )?.products ?? []

                ),
                (err: any) => console.log(err)
            );

    }

    ionViewDidLoad() {

    }

    loadMoreProducts() {
        this.page++;
        console.log(`Getting page ${this.page}`)

        this.wc
            .getAsync(
                `products?filter[category]=${
                    this.category?.slug ?? ''
                }&page=${this.page}`
            )
            .then(
                (data: any) => (
                    data = JSON.parse(data?.body || '{}')
                )
            )
    }

}