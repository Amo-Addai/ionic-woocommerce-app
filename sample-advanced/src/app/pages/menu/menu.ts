import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { WooCommerceProvider } from './providers/woocommerce/woocommerce';

import { Home } from '../home/home';
import { Cart } from '../cart/cart';


@IonicPage({})
@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class Menu {

    wc: any;
    homePage: Component;
    @ViewChild('content')
    childNavCtrl: NavController;
    user: any;
    categories: any[] = [];
    loggedIn: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public storage: Storage,
        private WC: WooCommerceProvider
    ) {
        this.homePage = Home; // TODO: check 'Home' for :Component - for mirrored lazy-loading with AppComponent to Home
        this.categories = [];
        this.user = {};

        this.wc = WC.init()
        
        this.wc
            .getAsync('products/categories')
            .this(
                (
                    data: any,
                    groupSubCategories: any = null, // O(n^2) t ; O(1) s
                    groupSubCategories_OnT_OnS_Wrong: any = null, // O(2n ~ n) t ; O(n) s
                    groupSubCategories_OnT_OnS_Correct: any = null // O(2n ~ n) t ; O(n) s
                ) => (
                    data = JSON.parse(data?.body || '{}'),
                    console.log(data?.product_categories),
                    data?.product_categories
                        ?.map((category: any) => {
                            if (category?.parent === 0) {
                                category.subCategories = []
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
                                console.log(category)
                                this.categories.push(category)
                            } else console.log(category) // todo:
                        }),

                    // Method-Options to Group sub-categories // todo: check moving inner-loop inside previous loop (as outer-loop), with incremental this.categories.length

                    groupSubCategories = (data: any) => // O(n^2) t ; O(1) s
                        data?.product_categories
                            ?.forEach(
                                (
                                    category: any,
                                    i: number
                                ) =>
                                    this.categories
                                        ?.forEach(
                                            (
                                                c: any,
                                                j: number
                                            ) => (
                                                console.log(`Checking ${i} - ${j}`),
                                                c?.id == category?.parent // .parent from woo-commerce data
                                                && (
                                                    this.categories[j]
                                                        ?.subCategories
                                                        ?.length >= 0 // check for non-null list, even if empty
                                                        ? this.categories[j]
                                                            ?.subCategories
                                                            ?.push(category)
                                                        : this.categories[j]
                                                            .subCategories = []
                                                )
                                            )
                                        )
                            ),
                        
                    groupSubCategories_OnT_OnS_Wrong = ( // O(2n ~ n) t ; O(n) s
                        data: any,
                        categories: any = {}
                    ) => (
                        data?.product_categories
                            ?.forEach( // O(n) t ; O(n) s
                                (category: any) =>
                                    category?.parent
                                    && (categories[category.parent] = category) // * 1/null/.. in case of no need to save category data, waste of space
                            ),
                        this.categories
                            ?.forEach( // O(n) t ; O(1) s
                                (
                                    c: any,
                                    j: number
                                ) => (
                                    !!c?.id
                                    && categories.hasOwnProperty(c?.id)
                                    && (
                                        this.categories[j]
                                            ?.subCategories
                                            ?.length >= 0 // check for non-null list, even if empty
                                            ? this.categories[j]
                                                ?.subCategories
                                                ?.push(categories[c?.id])
                                            : this.categories[j]
                                                .subCategories = []
                                    )
                                )
                            )
                    ),
                        
                    groupSubCategories_OnT_OnS_Correct = ( // O(2n ~ n) t ; O(n) s
                        data: any,
                        categories: any = {}
                    ) => (
                        data?.product_categories
                            ?.forEach( // O(n) t ; O(n) s
                                (category: any) =>
                                    category?.parent
                                    && (
                                        categories[category.parent]?.length >= 0 // check for non-null list, even if empty
                                        ? categories[category.parent].push(category) // push into hashTable instead
                                        : categories[category.parent] = []
                                    )
                            ),
                        this.categories
                            ?.forEach( // O(n) t ; O(1) s
                                (
                                    c: any,
                                    j: number
                                ) => (
                                    !this.categories[j]
                                        ?.subCategories // TODO: Test
                                    || // * risky null/empty checks - to take entire subCategory list from hashTable (filled in previous loop)
                                    this.categories[j]
                                        ?.subCategories
                                        ?.length == 0
                                        && (
                                            !!c?.id
                                            && categories.hasOwnProperty(c?.id)
                                            && (
                                                this.categories[j]
                                                    .subCategories =
                                                        categories[c?.id] // take entire subCategory list from hashTable

                                                // * if this.categories wasn't constructed from scratc .
                                                // & this was called in an event-listener with already stateful this.categories ..
                                                // then append categories[c?.id] as all new subCategories

                                                // * this.categories[j].subCategories = this.categories[j].subCategories.concat(categories[c?.id])

                                            )
                                        )
                                )
                            )
                    ),

                    // todo: test all others
                    // groupSubCategories_OnT_OnS_Wrong(data) // faster, but loses track of parents' subCategories in hashMap (only keeps last subCategory since they replace each other)
                    // groupSubCategories_OnT_OnS_Correct(data), // fastest, and keeps track of parents' subCategories in hashTable
                    groupSubCategories(data) // * best (brute-force), since (small) data is only menu's categories & sub-categories

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
                'Products',
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
                    ? 'SignUp'
                    : page === 'login'
                        ? 'Login'
                        : page === 'logout'
                            ? (() => (
                                this.storage
                                    .remove('userLoginInfo')
                                    .then(() => (
                                        this.user = {},
                                        this.loggedIn = false
                                    )),
                                'Login'
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
