import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-gaurd.service';
import { CreateroomPage } from './createroom.page';

const routes: Routes = [
  {
    path: '',
    component: CreateroomPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateroomPageRoutingModule {}
