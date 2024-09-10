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
        
        this.wc
            .getAsync(
                'products/'
                + this.product?.id ?? ''
                + '/reviews'
            )
            .then(
                (data: any) => (
                    data = JSON.parse()
                    this.reviews 
                ),
                (err: any) => console.log(err)
            )
    }

    ionViewDidLoad() {

    }

}