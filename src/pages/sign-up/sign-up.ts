// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  formData = {
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    surname: '',
    phone: ''
  };
  image;
  errorMessage = '';
  errorEmail;
  errorPassword;
  constructor(
    public http: Http,
    public config: ConfigProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public loading: LoadingProvider,
    public shared: SharedDataProvider,
    public navCtrl: NavController,
    private httpClient: HttpClient,
    public platform: Platform
    // private camera: Camera
  ) {
  }
  // openCamera() {
  //   const options: CameraOptions = {
  //     quality: 80,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     allowEdit: true,
  //     targetWidth: 100,
  //     targetHeight: 100,
  //     saveToPhotoAlbum: false,
  //     correctOrientation: true
  //   }
  //   this.platform.ready().then(() => {

  //     this.camera.getPicture(options).then((imageData) => {
  //       // imageData is either a base64 encoded string or a file URI
  //       // If it's base64:
  //       this.image = 'data:image/jpeg;base64,' + imageData;
  //       // console.log(base64Image);

  //     }, (err) => { });
  //   });
  // }


  signUp() {
    this.loading.show();
    this.errorMessage = '';
    // this.formData.customers_picture = this.image;

    this.httpClient.post('http://dev8.kitweb.pro/v1/register', this.formData).subscribe(
      res => {
        this.loading.hide();
        console.log("User info registration");
        console.log(res);
        this.shared.userInfo(res);
        this.viewCtrl.dismiss();
      },
      err => {
        
        if(err.error.password == undefined){
          this.errorPassword = '';
        }
        else{
          this.errorPassword = err.error.password[0];
        }

        if(err.error.email == undefined){
          this.errorEmail = '';
        }
        else{
          this.errorEmail = err.error.email[0];
        }
        
        var er_status = err.status;
        console.log();
        this.loading.hide();
        if(er_status == '500'){
          alert("Ошибка сервера");
        }
      });
  }

  openPrivacyPolicyPage() {
    let modal = this.modalCtrl.create('PrivacyPolicyPage');
    modal.present();
  }
  openTermServicesPage() {
    let modal = this.modalCtrl.create('TermServicesPage');
    modal.present();
  }
  openRefundPolicyPage() {
    let modal = this.modalCtrl.create('RefundPolicyPage');
    modal.present();
  }
  dismiss() {
    this.viewCtrl.dismiss();
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SignUpPage');
  // }
}
