// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component, ViewChild, Input } from '@angular/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import 'rxjs/add/operator/map';
import { LoadingProvider } from '../../providers/loading/loading';
import { InfiniteScroll } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ModalController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SingleTourPage } from '../../pages/single-tour/single-tour';
import {SingleDateTourPage} from '../../pages/single-date-tour/single-date-tour';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sliding-tabs',
  templateUrl: 'sliding-tabs.html'
})
export class SlidingTabsComponent {
  @ViewChild(InfiniteScroll) infinite: InfiniteScroll;

  @Input('type') type;//product data
  products = new Array;
  selected = '';
  page = 0;
  Alltours;
  AllDatatours;
  tourEmpty = false;
  dataTourEmpty = false;

  constructor(
    public shared: SharedDataProvider,
    public http: Http,
    public config: ConfigProvider,
    private httpClient: HttpClient,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public translateService: TranslateService,
    public loading: LoadingProvider,
  ) {
  }
  getProducts(infiniteScroll) {

    if (this.page == 0) { this.loading.autoHide(700); }
    var data: { [k: string]: any } = {};
    data.customers_id = null;
    data.categories_id = this.selected;
    data.page_number = this.page;

    // if (d.type != undefined)
    //   data.type = d.type;
    data.language_id = this.config.langId;

    var headers = new HttpHeaders().set('Content-Language',localStorage.langId);
    var options =  {
      headers: headers
    };

    console.log("Language ID:");
    console.log(localStorage.langId);

    this.httpClient.get('http://dev8.kitweb.pro/v1/getTours', options).subscribe(
      res => {
        console.log("Tours info:");
        console.log(res);
        this.Alltours = res;
        if(this.Alltours.length == 0){
          this.tourEmpty = true;
          console.log("TOur list empty");
        }
      },
      err => {
        var er_status = err.status;
        console.log(err);
        this.loading.hide();
        if(er_status == '500'){
          alert("Ошибка сервера");
        }
      });

      this.httpClient.get('http://dev8.kitweb.pro/v1/getDateTours', options).subscribe(
        res => {
          console.log("Date tours info:");
          console.log(res);
          this.AllDatatours = res;
          if(this.AllDatatours.length == 0){
            this.dataTourEmpty = true;
            console.log("TOur Data list empty");
          }
        },
        err => {
          var er_status = err.status;
          console.log(err);
          this.loading.hide();
          if(er_status == '500'){
            alert("Ошибка сервера");
          }
        });
  }

  tourDetails(tour_id){
    this.navCtrl.push(SingleTourPage, { id_tour: tour_id });
  }

  tourDataDetails(tour_id){
    this.navCtrl.push(SingleDateTourPage, { id_tour: tour_id });
  }

  //changing tab
  changeTab(c) {
    this.infinite.enable(true);
    this.page = 0;
    if (c == '') this.selected = c
    else this.selected = c.id;
    this.getProducts(null);
  }


  @ViewChild(Slides) slides: Slides;

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  ngOnInit() {
    this.getProducts(null);
  }

  segments: string = "newest";

}
