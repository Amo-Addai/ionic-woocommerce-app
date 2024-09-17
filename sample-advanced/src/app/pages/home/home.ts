import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';

import { WooCommerceProvider } from './providers/woocommerce/woocommerce';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {

    // View-Model data
    wc: any;
    page: number;
    products: any[];
    moreProducts: any[];
    searchQuery: string = '';

    // child component
    @ViewChild('productSlides') productSlides: Slides;

    constructor( // dependencies
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        private WC: WooCommerceProvider
    ) {
        this.page = 2;
        this.products = [];
        this.moreProducts = [];

        this.wc = WC.init()
        
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
                    !!event && (
                        event.complete()
                    )
                    (data?.products?.length < 10) && (
                        event.enable(false),
                        this.toastCtrl
                            .create({
                                message: 'No more products.',
                                duration: 5000
                            })
                            .present()
                    )
                },
                (err: any) => console.log(err)
            );
    }

    openProductPage(product: any) {
        this.navCtrl
            .push(
                'ProductDetails',
                { product }
            )
    }

    onSearch = (event: any) => (
        this.searchQuery
            .length
            && this.navCtrl
                    .push(
                        'Search',
                        {
                            searchQuery: this.searchQuery
                        }
                    )
    )

}
