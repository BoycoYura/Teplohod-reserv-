import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleTourPage } from './single-tour';

@NgModule({
  declarations: [
    SingleTourPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleTourPage),
  ],
})
export class SingleTourPageModule {}
