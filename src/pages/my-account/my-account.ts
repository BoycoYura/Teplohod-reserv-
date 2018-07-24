// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { Platform, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';
import { CartPage } from '../cart/cart';
import { SearchPage } from '../search/search';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';


@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  myAccountData = {
    name : this.shared.customerData.name,
    surname : this.shared.customerData.surname,
    email : this.shared.customerData.email,
    phone : this.shared.customerData.phone,
    password: '',
    password_confirmation: '',
  };
  profilePicture = '';
  passwordData: { [k: string]: any } = {};

  Userdata;

  constructor(
    public http: Http,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public translate: TranslateService,
    public platform: Platform,
    private camera: Camera,
    public navCtrl: NavController,
    public alert: AlertProvider,
    private httpClient: HttpClient,
    public loading: LoadingProvider) {
  }

  UpdateInfo(){

  var headers = new HttpHeaders().set('X-Auth',this.shared.customerData.X_Auth);
    var options =  {
      headers: headers
  };

  this.httpClient.post('http://dev8.kitweb.pro/v1/change-user-data', this.myAccountData, options).subscribe(
    res => {
      this.loading.hide();
      this.Userdata = res;
      console.log("User info updated:");
      alert("Данные успешно изменены.");
      this.shared.customerData.name = this.Userdata.name;
      this.shared.customerData.surname = this.Userdata.surname;
    },
    err => {
      alert("При вводе данных была совершена ошибка или такой пользователь уже существует");
      var er_status = err.status;
      console.log(err);
      this.loading.hide();
      if(er_status == '500'){
        alert("Ошибка сервера");
      }
    });
  }

  openCart() {
    this.navCtrl.push(CartPage);
  }
  openSearch() {
    this.navCtrl.push(SearchPage);
  }
}
