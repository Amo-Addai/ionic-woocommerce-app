import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-products',
    templateUrl: 'products.html'
})
export class Products {

    @Input() wc: any;

    
}