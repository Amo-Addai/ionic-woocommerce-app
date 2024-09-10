import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html'
})
export class Cart {

    cartItems: any[] = [];
    total: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public storage: Storage
    ) {

        this.storage
            .ready()
            .then(() => (
                this.storage
                    .get('cart')
            ))

    }

    ionViewDidLoad() {

    }

}