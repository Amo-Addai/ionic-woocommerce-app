import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    WC: any;

    constructor(public navCtrl: NavController) {
        this.wc = 
    }

}