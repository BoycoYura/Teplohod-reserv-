// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { OrderDetailPage } from '../order-detail/order-detail';
import { CartPage } from '../cart/cart';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ViewController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
})
export class MyOrdersPage {
  orders = new Array;
  httpRunning = true;
  AllOrders;
  items = [];
  count_order = 0;
  Count_array;
  Count_status= true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    translate: TranslateService,
    public alert: AlertProvider,
    private httpClient: HttpClient,
    public loading: LoadingProvider
  ) {
  }

  openHome() {
    this.navCtrl.setRoot(HomePage);
  }


  getOrders() {
    var headers = new HttpHeaders().set('X-Auth',this.shared.customerData.X_Auth);

    var options =  {
      headers: headers
    };

    this.loading.show();
    this.httpClient.get('http://dev8.kitweb.pro/v1/getOrders', options).subscribe(
      res => {
        this.loading.hide();
        console.log("All orders:");
        console.log(res);
        this.AllOrders = res;
      },
      err => {
        console.log("Error");
        var er_status = err.status;

        if(er_status == '500'){
          alert("Ошибка сервера");
        }

        if(er_status == '400'){
          alert("Пожалуйста перезайдите в приложении. Возникли проблемы с вашим профилем!");
          this.navCtrl.push(LoginPage);
        }

      });
  };
  
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    var headers = new HttpHeaders().set('X-Auth',this.shared.customerData.X_Auth);

    var options =  {
      headers: headers
    };

    console.log(this.count_order);
    this.httpClient.get('http://dev8.kitweb.pro/v1/getOrders/'+ this.count_order, options).subscribe(
      res => {
        this.loading.hide();
        this.Count_array = res;
        if(this.Count_array.length <=5){
          console.log("Less than 5");
          this.Count_status = false;
        }
        else{
          this.AllOrders = this.AllOrders.concat(res) ;
          console.log(res);
          this.count_order+=15; 
          console.log(this.count_order);
          console.log("All orders length:");
          console.log(this.AllOrders.length);
          infiniteScroll.complete();
        }
      },
      err => {
        console.log("Error");
        var er_status = err.status;

        if(er_status == '500'){
          alert("Ошибка сервера");
        }

        if(er_status == '400'){
          alert("Пожалуйста перезайдите в приложении. Возникли проблемы с вашим профилем!");
          this.navCtrl.push(LoginPage);
        }
      });
  }

  // showOrderDetail(order) {
  //   this.navCtrl.push(OrderDetailPage, { 'data': order });
  // }

  ionViewDidLoad() {
    this.httpRunning = true;
    this.getOrders();
  }

  openCart() {
    this.navCtrl.push(CartPage);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    var headers = new HttpHeaders().set('X-Auth',this.shared.customerData.X_Auth);

    var options =  {
      headers: headers
    };

    this.count_order = 0;
    
    this.httpClient.get('http://dev8.kitweb.pro/v1/getOrders/'+ this.count_order, options).subscribe(
      res => {
        this.AllOrders = res;
        refresher.complete();
      },
      err => {
        console.log("Error");
        var er_status = err.status;

        if(er_status == '500'){
          alert("Ошибка сервера");
        }

        if(er_status == '400'){
          alert("Пожалуйста перезайдите в приложении. Возникли проблемы с вашим профилем!");
          this.navCtrl.push(LoginPage);
        }
      });
  }

  openSearch() {
    this.navCtrl.push(SearchPage);
  }
}
