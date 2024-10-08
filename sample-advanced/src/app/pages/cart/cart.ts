import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


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
        public toastCtrl: ToastController,
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

    changeQuantity = (
        item: any,
        i: number,
        change: number,
        price: number = 0,
        quantity: number = 0
    ) => (
        price = parseFloat(
            item?.product
                ?.price ?? ''
        ),
        quantity = item?.quantity ?? 0,
        !(
            change < 0
            && quantity == 1
        ) && (
            quantity += change,
            item.quantity = quantity,
            item.amount = quantity * price,
            this.cartItems[i] = item,
            this.storage
                .set(
                    'cart',
                    this.cartItems
                )
                .then(
                    () =>
                        this.toastCtrl
                            .create({
                                message: 'Cart Updated',
                                duration: 2000,
                                showCloseButton: true
                            }).present()
                )
        )
    )

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
                            .push('Checkout')
                    : this.navCtrl
                            .push(
                                'Login',
                                { next: 'Checkout' } // * next: also 'Checkout' for layered-lazy-loading (in Login)
                            )
                )
            )
    )

    closeModal = () => (
        this.viewCtrl
            .dismiss()
    )

}