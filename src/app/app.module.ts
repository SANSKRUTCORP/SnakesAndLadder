import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JoinRoomComponent } from './rooms/join-room/join-room.component';
import { WinComponent } from './board/win/win.component';
import { environment } from '../environments/environment';
import { AuthserviceService } from './services/authservices.service';
import { AuthGuardService } from './services/auth-gaurd.service';
import { AllComponent } from './board/all/all.component';



@NgModule({
  declarations: [AppComponent, JoinRoomComponent, WinComponent, AllComponent ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireDatabaseModule
   ],

  providers: [
    StatusBar,
    SplashScreen,
    AuthserviceService,
    AuthGuardService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}