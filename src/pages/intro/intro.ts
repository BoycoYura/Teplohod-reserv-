// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../providers/config/config';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  public slides = [

    { image: "assets/intro/slide-one.png", title: "ChooseTour", icon: "home", description: "" },
    { image: "assets/intro/slide-two.png", title: "Buy Tickets", icon: "cart", description: "" },
    { image: "assets/intro/slide-three.png", title: "Pleasant Rest", icon: "share", description: "" }
  ];

  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,) {
    this.slides
  }

  
  openHomePage() {
    this.navCtrl.setRoot(HomePage);    
  }
}
