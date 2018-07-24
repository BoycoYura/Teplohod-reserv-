import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentErrorPage } from './payment-error';

@NgModule({
  declarations: [
    PaymentErrorPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentErrorPage),
  ],
})
export class PaymentErrorPageModule {}
