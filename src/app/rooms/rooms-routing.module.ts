import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuardService } from '../services/auth-gaurd.service';

import { RoomsPage } from './rooms.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsPage,
    // canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsPageRoutingModule {}
