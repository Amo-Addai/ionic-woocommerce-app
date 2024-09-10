import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

import { Cart } from ''


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
        public navParams: NavParams,
        public storage: Storage,
        public toastCtrl: ToastController,
        public modalCtrl: ModalController
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

    addToCart = (
        product: any,
        added=0,
        quantity=0
    ) => (
        this.storage
            .get('cart')
            .then(
                (data: any) => (
                    !data?.length
                    ? (
                        data = [],
                        data.push({
                            product,
                            quantity: 1,
                            amount: parseFloat(
                                product?.price ?? 0
                            )
                        })
                    )
                    : (
                        data.map((item: any) => (
                            (
                                product?.id
                                && product?.id
                                ==
                                item?.product?.id
                            ) && (
                                console.log('Product is already in the cart'),
                                quantity = item?.quantity ?? 0,
                                item.quantity = quantity + 1,
                                item.amount =
                                    parseFloat(
                                        item?.amount ?? 0
                                    )
                                    + parseFloat(
                                        item?.product?.price
                                        ?? 0
                                    ),
                                added = 1
                            )
                        )),
                        added == 0
                        && (
                            data.push({
                                product,
                                quantity: 1,
                                amount: parseFloat(
                                    data?.price ?? 0
                                )
                            })
                        )
                    ),
                    this.storage
                        .set(
                            'cart',
                            data
                        )
                        .then(
                            () => (
                                console.log('Cart updated'),
                                console.log(data),
                                this.toastCtrl
                                    .create({
                                        message: 'Cart updated',
                                        duration: 3000
                                    }).present()
                            )
                        )
                ),
                (err: any) => console.log(err)
            )
    )

    openCart = () => (
        this.modalCtrl
            .create(Cart)
    )

}