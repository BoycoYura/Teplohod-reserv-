import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { LoginPage } from '../../pages/login/login';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ThankYouPage } from '../../pages/thank-you/thank-you';
import { PaymentErrorPage } from '../../pages/payment-error/payment-error';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the SingleTourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-single-tour',
  templateUrl: 'single-tour.html',
})
export class SingleTourPage {

  tourID;
  SingleTourInfo;
  TourArray = [];
  tourImgPath;
  tourDescription;
  adult_tickets_count = 0;
  pref_tickets_count = 0;
  child_tickets_count = 0;
  date_select;
  time_select;
  kassa_obj;
  locate_url;
  order_id;
  payment_status;

  order_data= {
    "tour_id":this.tourID,
    "standard":this.adult_tickets_count,
    "preferential":this.pref_tickets_count,
    "child":this.child_tickets_count,
  }

  constructor(public loading: LoadingProvider,private iab: InAppBrowser,translate: TranslateService,public navCtrl: NavController, public navParams: NavParams,params: NavParams,private httpClient: HttpClient,public shared: SharedDataProvider) {
    this.tourID = params.get('id_tour');
    this.order_data.tour_id = this.tourID;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleTourPage');
  }

  OrderTour(){
    console.log("Auth:");
    console.log(this.shared.customerData.X_Auth);

    if(this.shared.customerData.X_Auth == undefined || this.shared.customerData.X_Auth == null){
      alert("You are not logined");
      this.navCtrl.push(LoginPage);
    }else if(this.adult_tickets_count != 0 || this.pref_tickets_count != 0 || this.child_tickets_count != 0){
      var headers = new HttpHeaders().set('X-Auth',this.shared.customerData.X_Auth);
      var options =  {
        headers: headers
      };

      this.order_data.standard = this.adult_tickets_count;
      this.order_data.preferential = this.pref_tickets_count;
      this.order_data.child = this.child_tickets_count;
  
      this.httpClient.post('http://dev8.kitweb.pro/v1/orderCreate', this.order_data, options).subscribe(
        res => {
          console.log("Order data:");
          console.log(this.order_data);
          console.log("Kassa info");
          this.kassa_obj = res;
          this.order_id = this.kassa_obj.order_id;
          this.locate_url = this.kassa_obj.url;
          console.log("Locate URL:");
          console.log(this.locate_url);
          console.log("Order ID:");
          console.log(this.order_id);

          const options: InAppBrowserOptions = {
            fullscreen:	'yes'
          }

          const browser = this.iab.create(this.locate_url,'_self',options);
          
          browser.on('exit').subscribe(() => {

            this.httpClient.get('http://dev8.kitweb.pro/v1/orderCheck/'+ this.order_id).subscribe(
              res => {
                this.payment_status = res;
                alert(this.payment_status.status);

                if(this.payment_status.status == true){
                  this.navCtrl.push(ThankYouPage);
                }
                else{
                  this.navCtrl.push(PaymentErrorPage);
                }
              },
              err => {
                var er_status = err.status;
                alert(err);
                if(er_status == '500'){
                  alert("Ошибка сервера");
                }
              });
          }, 
          err => {
            alert(err);
          });

        },
        err => {
          console.log(err);
          alert("Произошла ошибка при заказе билетов");
        });
      
      console.log("Adult tickets counts:");
      console.log(this.adult_tickets_count);

      console.log("Pref tickets counts:");
      console.log(this.pref_tickets_count);

      console.log("Child tickets counts:");
      console.log(this.child_tickets_count);
    }
    
    else{
      alert("Please choose tickets!");
    }
  }


  adult_ticket_decrement(){
    if(this.adult_tickets_count > 0){
      this.adult_tickets_count--;
      console.log(this.adult_tickets_count);
    }
  }

  adult_ticket_increment(){
    this.adult_tickets_count++;
    console.log(this.adult_tickets_count);
  }

  pref_ticket_decrement(){
    if(this.pref_tickets_count > 0){
      this.pref_tickets_count--;
      console.log(this.pref_tickets_count);
    }
  }

  pref_ticket_increment(){
    this.pref_tickets_count++;
    console.log(this.pref_tickets_count);
  }

  child_ticket_decrement(){
    if(this.child_tickets_count > 0){
      this.child_tickets_count--;
      console.log(this.child_tickets_count);
    }
  }

  child_ticket_increment(){
    this.child_tickets_count++;
    console.log(this.child_tickets_count);
  }

  getSingleTour(){
    var headers = new HttpHeaders().set('Content-Language',localStorage.langId);
    var options =  {
      headers: headers
    };

    console.log("Language ID:");
    console.log(localStorage.langId);
    this.loading.show();
    this.httpClient.get('http://dev8.kitweb.pro/v1/getTour/'+ this.tourID, options).subscribe(
      res => {
        this.loading.hide();
        console.log(this.SingleTourInfo = res);
        var i = 0;
      },
      err => {
        var er_status = err.status;
        console.log(err);
        if(er_status == '500'){
          alert("Ошибка сервера");
        }
      });
  }

  ngOnInit() {
    this.getSingleTour();
  }

}
