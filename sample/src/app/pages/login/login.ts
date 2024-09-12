import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class Login {

    username: string;
    password: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public http: Http,
        public storage: Storage
    ) {
        this.username = this.password = '';
    }

    ionViewDidLoad() {

    }

    login = () => (
        this.http // TODO: get from process.env.API_BASE_URL
            .get(`
                APP_URL?username=${
                    this.username
                }&password=${
                    this.password
                }
            `)
            .subscribe(
                (res: any) => {
                    const data = res.json()
                    console.log(data)
                    !!data?.error
                    && (
                        this.toastCtrl
                            .create({
                                message: data?.error ?? '',
                                duration: 5000
                            }).present(),
                        null // return null
                    ),
                    this.storage
                        .set(
                            'userLoginInfo',
                            data
                        )
                        .then(
                            (_: any) => (
                                this.alertCtrl
                                    .create({
                                        title: 'Login Successful',
                                        message: 'You have been logged in successfully.',
                                        buttons: [
                                            {
                                                text: 'OK',
                                                handler: () => (
                                                    !!this.navParams
                                                        .get('next')
                                                    ? this.navCtrl
                                                            .push(
                                                                this.navParams
                                                                    .get('next')
                                                            )
                                                    : this.navCtrl.pop()
                                                )
                                            }
                                        ]
                                    }).present()
                            )
                        )
                }
            )
    )
    
}