import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as WC from 'woocommerce-api';


@Injectable()
export class WooCommerceProvider {

    wc: any;

    constructor() {
        this.wc = WC({
            url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
            consumerKey: 'key',
            consumerSecret: 'secret'
        })
    }
    
    init = () => this.wc // todo: check lambda for in-built 'init'

}