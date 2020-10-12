import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { MemoryCreateroomService } from './memory-createroom.service';
import { MemoryCreateroomPageRoutingModule } from './memory-createroom-routing.module';
import { TokenInterceptor } from '../services/auth.interceptor';
import { MemoryCreateroomPage } from './memory-createroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClipboardModule,
    HttpClientModule,
    IonicModule,
    MemoryCreateroomPageRoutingModule
  ],
  declarations: [MemoryCreateroomPage],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true
    },
    MemoryCreateroomService
  ]
})
export class MemoryCreateroomPageModule {}
