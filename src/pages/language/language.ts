// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Http } from '@angular/http';

import { ConfigProvider } from '../../providers/config/config';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../providers/loading/loading';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {
  private languages: any;
  selectedLanguage;
  translate;
  prviousLanguageId;

  languagesList;
  isToggled: boolean = true;

  public check_state: boolean;

  constructor(
    public viewCtrl: ViewController,
    public http: Http,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
    public translateService: TranslateService,
    public loading: LoadingProvider
  ) {

      this.prviousLanguageId = localStorage.langId;
    //getting all languages
    this.loading.show();
    this.http.get('http://dev8.kitweb.pro/v1/getLanguages').map(res => res.json()).subscribe(data => {
      this.loading.hide();
      console.log("All langauges");
      this.languagesList = data.languages;
      console.log(data.languages);
    });
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  changeLanguage(langauge) {
    this.loading.show();
    this.translateService.use(langauge);
    localStorage.langId=langauge;
    console.log('Current language:' + langauge);
    this.shared.emptyCart();
    this.shared.emptyRecentViewed();
    console.log("Lang Cur Before:");
    console.log(localStorage.langId);
    setTimeout(() => {
      window.location.reload();
    }, 400);
  }
}
