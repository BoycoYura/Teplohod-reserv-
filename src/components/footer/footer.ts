// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
//import { ProductsPage } from '../../pages/products/products';
import { NewsPage } from '../../pages/news/news';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
///import { share } from 'rxjs/operator/share';
//import { AboutUsPage } from '../../pages/about-us/about-us';
import { SettingsPage } from '../../pages/settings/settings';
import { ProductsPage } from '../../pages/products/products';
import { ConfigProvider } from '../../providers/config/config';



@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {
  segments: any = 'HomePage';
  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
  ) {
    // console.log(shared.selectedFooterPage);
    this.segments = shared.selectedFooterPage;
  }
  openPage(page) {
    this.shared.selectedFooterPage = page;

    if (page == "HomePage") { this.openHomePage(); }
    else if (page == "ProductsPage") { this.navCtrl.push(ProductsPage); }
    else if (page == "NewsPage") { this.navCtrl.setRoot(NewsPage); }
    else if (page == "SettingsPage") { this.navCtrl.setRoot(SettingsPage); }
  }
  openHomePage() {
    if (this.config.homePage == 1) { this.navCtrl.setRoot(HomePage); }
  }
  openCategoryPage() {
  }
}

// events.subscribe('footerPageChange', (value) => {
//   console.log(value);
//   this.segments = value;
// });
// this.events.publish('footerPageChange',page);
