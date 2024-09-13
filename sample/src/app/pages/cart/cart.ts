import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Login } from '../login/login';
import { Checkout } from '../checkout/checkout';


@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html'
})
export class Cart {

    cartItems: any[] = [];
    total: any;
    showEmptyCartMessage: boolean = false;

    constructor(
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public storage: Storage
    ) {

        this.total = 0
        this.storage
            .ready()
            .then(() => (
                this.storage
                    .get('cart')
                    .then(
                        (data: any) => (
                            this.cartItems = data,
                            console.log(data),
                            this.cartItems
                                .length
                                ? (
                                    this.cartItems
                                        .forEach(
                                            (
                                                item: any,
                                                index: number
                                            ) => (
                                                this.total =
                                                    + (
                                                        item?.product
                                                            ?.price ?? 0
                                                            +
                                                            item?.quantity
                                                            ?? 0
                                                    )
                                            )
                                        )
                                )
                                : this.showEmptyCartMessage = true
                        )
                    )
            ))

    }

    ionViewDidLoad() {

    }

    removeFromCart = (
        item: any,
        i: number
    ) => (
        this.cartItems
            .splice(i, 1),
        this.storage
            .set(
                'cart',
                this.cartItems
            )
            .then(
                () => (
                    this.total =
                        this.total
                        - (
                            (
                                item?.product
                                ?.price ?? 0
                            )
                            *
                            (
                                item?.quantity
                                ?? 0
                            )
                        )
                )
            ),
        this.cartItems
            .length
            && (
                this.showEmptyCartMessage = true
            )
    )

    checkout = () => (
        this.storage
            .get('userLoginInfo')
            .then(
                (data: any) => (
                    !!data
                    ? this.navCtrl
                            .push(Checkout)
                    : this.navCtrl
                            .push(
                                Login,
                                { next: Checkout }
                            )
                )
            )
    )

    closeModal = () => (
        this.viewCtrl
            .dismiss()
    )

}