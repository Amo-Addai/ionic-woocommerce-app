import { Component } from '@angular/core';
import { Input, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';
import {
    PayPal,
    PayPalPayment,
    PayPalConfiguration
} from '@ionic-native/paypal';

import { Home } from '../home/home';


@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html'
})
export class Checkout {

    @Input() wc: any;
    userInfo: any;
    newOrder: any;
    same_billing_shipping: boolean = false;
    paymentMethod: any;
    paymentMethods: any[] = [
        { method_id: 'bacs', method_title: 'Bank Transfer' },
        { method_id: 'cheque', method_title: 'Cheque' },
        { method_id: 'momo', method_title: 'Mobile Money' },
        { method_id: 'paypal', method_title: 'PayPal' },
        { method_id: 'cod', method_title: 'Cash on Delivery' },
    ];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public storage: Storage,
        public alertCtrl: AlertController,
        public paypal: PayPal
    ) {
        this.newOrder = {};
        this.newOrder.billing_address = {};
        this.newOrder.shipping_address = {};

        !this.wc
        && (
            this.wc = WC({
                url: 'ECOMMERCE_STORE_URL', // TODO: process.env.ECOMMERCE_STORE_URL ionic-angular config
                consumerKey: 'key',
                consumerSecret: 'secret'
            })
        )
        
        this.storage
            .get('userLoginInfo')
            .then(
                (userLoginInfo: any) => (
                    !!userLoginInfo
                    && (
                        this.userInfo = userLoginInfo?.user ?? {},
                        this.newOrder = { ...this.userInfo }, // same props
                        !!this.userInfo?.email
                        && this.wc
                            .getAsync(
                                `customers/email/${
                                    this.userInfo.email
                                }`
                            )
                            .then(
                                (data: any) => (
                                    this.newOrder =
                                        JSON.parse(
                                            data?.body || '{}'
                                        )?.customer ?? {}
                                )
                            )
                    )
                )
            )

    }

    ionViewDidLoad() {

    }

    toggleIsSameAddress =
        () => 
            this.same_billing_shipping
                = !this.same_billing_shipping

    toggleSameAddress = () =>
        this.same_billing_shipping
        ? this.newOrder
                .shipping_address =
                {
                    ...
                    this.newOrder
                        ?.billing_address
                        ?? {}
                }
        : this.newOrder
                .shipping_address = {}

    checkInput = () => (
        null // todo:
    )

    placeOrder = (
        orderItems: any[] = [],
        data: any = {},
        paymentData: any = {}
    ) => (
        this.paymentMethods
            .forEach(
                (element, index) =>
                    element?.method_id
                    ===
                    this.paymentMethod
                    && (paymentData = element)
            ),
        data = {
            payment_details: {
                paid: true,
                ...paymentData
            },
            billing_address:
                this.newOrder
                    .billing_address,
            shipping_address:
                this.newOrder
                    .shipping_address,
            customer_id: this.userInfo
                            ?.id ?? '',
            line_items: orderItems
        },
        paymentData?.method_id
        == 'paypal'
        ? (
            this.paypal
                .init({ // TODO: get config-values from process.env
                    PayPalEnvironmentProduction:
                        'PRODUCTION_CLIENT_ID',
                    PayPalEnvironmentSandbox:
                        'SANDBOX_CLIENT_ID'
                })
                .then(
                    () => (
                        /*
                        Environments: PayPalEnvironmentNoNetwork,
                        PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                        */
                        this.paypal
                            .prepareToRender(
                                'PayPalEnvironmentSandbox',
                                new PayPalConfiguration({
                                    // Only required on an 'Internal Service Error' after PayPal login
                                    // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
                                })
                            )
                            .then(
                                () => (
                                    this.storage
                                        .get('cart')
                                        .then(
                                            (cart: any) => {
                                                let total = 0.00
                                                cart.forEach(
                                                    (
                                                        element: any,
                                                        index: number
                                                    ) => (
                                                        orderItems.push({
                                                            product_id:
                                                                element?.product
                                                                        ?.id || '-',
                                                            quantity:
                                                                element?.quantity ?? 0
                                                        }),
                                                        total += (
                                                            (
                                                                element?.product
                                                                        ?.price ?? 0
                                                            )
                                                            *
                                                            (
                                                                element?.quantity
                                                                        ?? 0
                                                            )
                                                        )
                                                    )
                                                )
                                                const payment = new PayPalPayment(
                                                            total.toString(),
                                                            'USD',
                                                            'Description',
                                                            'sale',
                                                        )
                                                this.paypal
                                                    .renderSinglePaymentUI(payment)
                                                    .then(
                                                        (response: any) => (
                                                            // Successfully paid
                                                            /* Example sandbox response
                                                            {
                                                                "client": {
                                                                    "environment": "sandbox",
                                                                    "product_name": "PayPal iOS SDK",
                                                                    "paypal_sdk_version": "",
                                                                    "platform": "iOS"
                                                                },
                                                                "response_type": "payment",
                                                                "response": {
                                                                    "id": "",
                                                                    "state": "approved",
                                                                    "create_time": "",
                                                                    "intent": "sale"
                                                                }
                                                            }
                                                            */
                                                           alert(
                                                            JSON.stringify(response)
                                                           ),
                                                           data.line_items = orderItems,
                                                           console.log(data),
                                                           this.wc
                                                                .postAsync(
                                                                    'orders',
                                                                    {
                                                                        order: data
                                                                    },
                                                                    (
                                                                        err: any,
                                                                        data: any,
                                                                        res: any
                                                                    ) => (
                                                                        alert('Order placed successfully!'),
                                                                        data = JSON.parse(
                                                                            data?.body || '{}'
                                                                        )?.order ?? {},
                                                                        this.alertCtrl
                                                                            .create({
                                                                                title: 'Order Placed Successfully',
                                                                                message: `
                                                                                    Your order has been placed successfully.\n
                                                                                    Your order number is ${
                                                                                        data?.order_number || '-'
                                                                                    }
                                                                                `,
                                                                                buttons: [{
                                                                                    text: 'OK',
                                                                                    handler: () =>
                                                                                        this.navCtrl
                                                                                            .setRoot(Home)
                                                                                }]
                                                                            }).present()
                                                                    )
                                                                )
                                                        ),
                                                        // error on render dialog closed without being successful
                                                        (err: any) => console.log(err)
                                                    )
                                            }
                                        )
                                    // end of this.paypal.prepareToRender.then(cb)
                                ),
                                // error in configuration
                                (err: any) => console.log(err)
                            )
                    ),
                    // error in initialization (maybe PayPal isn't supported, or sth else)
                    (err: any) => console.log(err)
                )
        )
        : this.storage
                .get('cart')
                .then(
                    (cart: any) => {
                        cart.forEach(
                            (
                                element: any,
                                index: any
                            ) =>
                                orderItems.push({
                                    product_id:
                                        element?.product_id ?? '',
                                    quantity: element?.quantity ?? ''
                                })
                        )
                        data.line_items =
                            orderItems
                        let orderData: any = {
                            order: data
                        }
                        this.wc
                            .postAsync(
                                'orders',
                                orderData
                            )
                            .then(
                                (data: any) => (
                                    data = JSON.parse(
                                        data?.body || '{}'
                                    )?.order ?? {},
                                    console.log(
                                        data
                                    ),
                                    this.alertCtrl
                                        .create({
                                            title: 'Order Placed Successfully',
                                            message: `
                                                Your order has been placed successfully.\n
                                                Your order number is ${
                                                    data?.order_number || '-'
                                                }
                                            `,
                                            buttons: [{
                                                text: 'OK',
                                                handler: () =>
                                                    this.navCtrl
                                                        .setRoot(Home)
                                            }]
                                        }).present()
                                )
                            )
                    }
                )
    )
    
}