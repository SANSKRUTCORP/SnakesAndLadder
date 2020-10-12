import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MemoryRoomsService } from './memory-rooms.service';
import { MemoryRoomsPageRoutingModule } from './memory-rooms-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/auth.interceptor';
import { MemoryRoomsPage } from './memory-rooms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemoryRoomsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [MemoryRoomsPage],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true
    },
    MemoryRoomsService
  ]
})
export class MemoryRoomsPageModule {}
