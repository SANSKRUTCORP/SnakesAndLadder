import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { HomePageRoutingModule } from './home-routing.module';
import { AuthserviceService } from '../services/authservices.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { HomeService } from './home.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
  ],
  declarations: [HomePage],
  providers: [AuthserviceService, HomeService]

})
export class HomePageModule {}
