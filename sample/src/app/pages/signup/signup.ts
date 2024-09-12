import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import * as WC from 'woocommerce-api';


@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignUp {

    @Input() wc: any;
    same_billing_shipping: boolean = false;
    newUser: any = {
        billing_address: {},
        shipping_address: {}
    };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController
    ) {

        if (!this.wc)
            this.wc = WC({
                url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
                consumerKey: 'key',
                consumerSecret: 'secret'
            });

    }

    ionViewDidLoad() {

    }

    toggleIsSameAddress =
        () => 
            this.same_billing_shipping
                = !this.same_billing_shipping

    toggleSameAddress = () => (
        this.same_billing_shipping
        ? this.newUser
            .shipping_address =
            {
                ...
                this.newUser
                ?.billing_address
                ?? {}
            }
        : this.newUser
            .shipping_address = {}
    )
    
    checkInput = (input: any) => (
            valid = false,
            regEx = (() => {
                let regEx = /^default-regex-if-required/
                switch(input) {
                    case 'email': regEx = /^email-regex/ // * TODO: replace with valid email regex
                }
                return regEx
            })()
        ) => (
            regEx.test(
                this.newUser?.email
            )
            ? (
                this.wc
                    .getAsync(
                        'customers/email/',
                        + this.newUser?.email
                    )
                    .then(
                        (data: any) => (
                            data = JSON.parse(
                                data?.body ?? '{}'
                            ),
                            valid = !!data?.errors,
                            console.log(valid),
                            this.toastCtrl
                                .create({
                                    message: valid
                                        ? 'Email valid'
                                        : 'Email already exists',
                                    duration: 3000,
                                    showCloseButton: !valid
                                }).present()
                        ),
                        (err: any) => console.log(err)
                    )
            )
            : (
                valid = false,
                this.toastCtrl
                    .create({
                        message: 'Email invalid',
                        showCloseButton: true
                    }).present()
            )
        )

    signup = (
        _ = this.toggleSameAddress() // * validate newUser shipping_address = billing_address
    ) => ( // * instant-exec'd
        (
            customerData = { customer: this.newUser },
        ) => (
            [
                'first_name',
                'last_name',
                'company'
            ].map(prop => (
                customerData
                    .customer
                    .billing_address
                    [prop] =
                        prop !== 'company'
                        ? customerData
                            .customer
                            [prop]
                        : '',
                customerData
                    .customer
                    .billing_address
                    [prop] =
                        prop !== 'company'
                        ? customerData
                            .customer
                            [prop]
                        : ''
            )),
            this.wc
                .postAsync(
                    'customers',
                    customerData
                )
                .then(
                    (data: any) => {
                        let { body } = data?.body ?? '{}'
                        body = JSON.parse(body)
                        console.log(body)
                        !!body?.customer
                        ? this.alertCtrl
                                .create({
                                    title: 'Account created',
                                    message: 'Account created successfully',
                                    buttons: [
                                        {
                                            text: 'Login',
                                            handler: () => {}
                                        }
                                    ]
                                }).present()
                        : !!body?.errors
                        && this.toastCtrl
                                .create({
                                    message: (
                                        body?.errors
                                        ?? [null]
                                    )[0]?.message ?? ''
                                }).present()
                    }
                )
        )
    )()

    
}