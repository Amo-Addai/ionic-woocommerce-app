import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';


@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class Search {

    wc: any;
    searchQuery: string = '';
    products: any[] = [];
    page: number = 2; // only required after the 1st infinite-scroll

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController
    ) {
        console.log(
            this.navParams
                .get('searchQuery')
        )
        this.searchQuery =
            this.navParams
                .get('searchQuery')
        
        !this.wc
        && (
            this.wc = WC({
                url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
                consumerKey: 'key',
                consumerSecret: 'secret'
            })
        )

        this.wc
            .getAsync(
                `products?filter[q]=${
                    this.searchQuery
                }`
            )
            .then(
                (data: any) => (
                    this.products = JSON.parse(
                        data?.body || '{}'
                    )?.products ?? {},
                    0
                )
            )

    }

    ionViewDidLoad() {

    }

    loadMoreProducts = (event: any) => (
        this.wc
            .getAsync(
                `products?filter[q]=${
                    this.searchQuery
                }&page=${
                    this.page
                }`
            ).then(
                (data: any) => (
                    data = JSON.parse(
                        data?.body || '{}'
                    )?.products ?? {},
                    this.products
                        .concat(data),
                    this.products.length < 10
                    && (
                        event.enable(false),
                        this.toastCtrl
                            .create({
                                message: 'No more products!',
                                duration: 5000
                            }).present()
                    ),
                    event.complete(), // complete to remove infinite-scroll loading-state
                    this.page++
                )
            )
    )
    
}