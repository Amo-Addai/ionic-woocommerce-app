import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import * as WC from 'woocommerce-api';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    wc: any;
    page: number;
    products: any[];
    moreProducts: any[];

    @ViewChild('productSlides') productSlides: Slides;

    constructor(
        public navCtrl: NavController
        
    ) {
        this.page = 2;
        this.products = [];
        this.moreProducts = [];

        this.wc = WC({
            url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
            consumerKey: 'key',
            consumerSecret: 'secret'
        });
        this.wc
            .getAsync('products')
            .then(
                (data: any) => {
                    data = JSON.parse(data.body); // original data.body: string type
                    console.log(data); // todo: work with data
                    this.products = data?.products ?? [];
                },
                (err: any) => console.log(err)
            );
        this.loadMoreProducts();
    }
    
    ionViewDidLoad() {
        setInterval(() => {
            if (
                this.productSlides
                    .getActiveIndex()
                ==
                this.productSlides
                    .length() - 1    
            )
            this.productSlides
                .slideTo(0);
            
            this.productSlides
                .slideNext();
        }, 3000);
    }

    loadMoreProducts(event: any = null) {
        !!event
        ? this.page++
        : (
            this.page = 2,
            this.moreProducts = []
        )
        this.wc
            .getAsync(`products?page=${this.page}`)
            .then(
                (data: any) => {
                    data = JSON.parse(data.body); // original data.body: string type
                    console.log(data); // todo: work with data
                    this.moreProducts =
                        this.moreProducts
                            .concat(
                                data?.products ?? []
                            );
                    if (!!event) event.complete();
                    if (data?.products?.length < 10)
                        event.enable(false);
                },
                (err: any) => console.log(err)
            );
    }

}
