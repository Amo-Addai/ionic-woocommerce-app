import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class List {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {

    }

    ionViewDidLoad() {

    }
    
}