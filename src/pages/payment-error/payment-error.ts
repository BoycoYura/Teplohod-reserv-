import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyOrdersPage } from '../my-orders/my-orders';

/**
 * Generated class for the PaymentErrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-error',
  templateUrl: 'payment-error.html',
})
export class PaymentErrorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentErrorPage');
  }

  openPament(){ this.navCtrl.setRoot(MyOrdersPage); }

  openOrders() { this.navCtrl.setRoot(MyOrdersPage); }

}
