import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleDateTourPage } from './single-date-tour';

@NgModule({
  declarations: [
    SingleDateTourPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleDateTourPage),
  ],
})
export class SingleDateTourPageModule {}
