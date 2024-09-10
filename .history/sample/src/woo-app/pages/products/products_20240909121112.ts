import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-products',
    templateUrl: 'products.html'
})
export class Products {

    @Input() wc: any;
    products: any[];
    page: number;
    category: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) {

        if (!!this.wc)
            this.wc = WC({
                url: '',
                con
            })

    }

    ionViewDidLoad() {

    }

}