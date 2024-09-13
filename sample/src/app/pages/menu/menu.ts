import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';

import { SignUp } from '../signup/signup';
import { Login } from '../login/login';
import { Home } from '../home/home';
import { Products } from '../products/products';
import { Cart } from '../cart/cart';


@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class Menu {

    @Input() wc: any;
    homePage: Component;
    categories: any[];
    @ViewChild('content')
    childNavCtrl: NavController;
    user: any;
    loggedIn: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public storage: Storage
    ) {
        this.homePage = Home;
        this.categories = [];
        this.user = {};

        !this.wc
        && (
            this.wc = WC({
                url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
                consumerKey: 'key',
                consumerSecret: 'secret'
            })
        )
        
        this.wc
            .getAsync('products/categories')
            .this(
                (data: any) => (
                    data = JSON.parse(data?.body || '{}'),
                    console.log(data?.product_categories),
                    data?.product_categories
                        ?.map((category: any) => {
                            if (category?.parent === 0) {
                                this.categories.push(category);
                                switch (category?.slug) {
                                    case 'clothing':
                                        category.icon = 'shirt';
                                        break;
                                    case 'music':
                                        category.icon = 'musical-notes';
                                        break;
                                    case 'posters':
                                        category.icon = 'images';
                                        break;
                                }
                            } else console.log(category) // todo:
                        })
                    ),
                (err: any) => console.log(err)
            )
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad')
    }

    ionViewDidEnter() {
        this.storage
            .ready()
            .then(() => (
                this.storage
                    .get('userLoginInfo')
                    .then((userLoginInfo: any) => (
                        !!userLoginInfo
                        ? (
                            console.log('user logged in'),
                            this.user = userLoginInfo?.user ?? {},
                            console.log(this.user),
                            this.loggedIn = true
                        )
                        : (
                            console.log('No user found'),
                            this.user = {},
                            this.loggedIn = false
                        )
                    ))
            ))
    }

    openCategoryPage(category: any) {
        this.childNavCtrl
            .setRoot(
                Products,
                {
                    category, // todo: check category: category (angular-wise)
                    // wc: this.wc // * check too
                }
            )
    }

    openPage = (page: string) => (
        this.navCtrl
            .push(
                page === 'signup'
                    ? SignUp
                    : page === 'login'
                        ? Login
                        : page === 'logout'
                            ? (() => (
                                this.storage
                                    .remove('userLoginInfo')
                                    .then(() => (
                                        this.user = {},
                                        this.loggedIn = false
                                    )),
                                Login
                            ))()
                            : page === 'cart'
                                && ((
                                    modal = this.modalCtrl
                                                .create(Cart)
                                ) => (
                                    modal.present(),
                                    null
                                ))() // todo: Test default-exec modal with (unnecessary) null-return to navCtrl
            )
    )

}
