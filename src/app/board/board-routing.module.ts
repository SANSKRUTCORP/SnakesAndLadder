import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardPage } from './board.page';
// import { AuthGuardService } from '../services/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    component: BoardPage,
    // canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardPageRoutingModule {}
