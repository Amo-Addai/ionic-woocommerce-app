import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';


@Component({
    selector: 'page-product-details',
    templateUrl: 'product-details.html'
})
export class ProductDetails {

    @Input() wc: any;
    product: any;
    reviews: any[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.reviews = []
        this.product =
            this.navParams
                .get('product')
        console.log(this.product)

        if (!this.wc)
            this.wc = WC({
                url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
                consumerKey: 'key',
                consumerSecret: 'secret'
            });
        5
        this.wc
            .getAsync(
                'products/'
                + (this.product?.id ?? '')
                + '/reviews'
            )
            .then(
                (data: any) => (
                    data = JSON.parse(data?.body || '{}'),
                    this.reviews = data?.product_reviews ?? [],
                    console.log(this.reviews)
                ),
                (err: any) => console.log(err)
            )
    }

    ionViewDidLoad() {

    }

}