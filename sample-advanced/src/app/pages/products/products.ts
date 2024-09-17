import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WooCommerceProvider } from './providers/woocommerce/woocommerce';

@Component({
    selector: 'page-products',
    templateUrl: 'products.html'
})
export class Products {

    wc: any;
    products: any[];
    page: number;
    category: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private WC: WooCommerceProvider
    ) {

        this.products = [];
        this.page = 1;
        this.category =
            this.navParams
                .get('category');

        this.wc = WC.init()
        
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

    loadMoreProducts = (event: any) => (
        this.page++,
        console.log(`Getting page ${this.page}`),
        this.wc
            .getAsync(
                `products?filter[category]=${
                    this.category?.slug ?? ''
                }&page=${this.page}`
            )
            .then(
                (data: any) => (
                    data = JSON.parse(data?.body || '{}'),
                    this.products =
                        this.products
                            .concat(
                                data?.products ?? []
                            ),
                    console.log(this.products),
                    event.complete(),
                    (data?.length < 10)
                    && event?.enable(false)
                ),
                (err: any) => console.log(err)
            )
    )
    
    openProductPage = (product: any) => (
        this.navCtrl
            .push(
                'ProductDetails',
                { product }
            )
    )

}