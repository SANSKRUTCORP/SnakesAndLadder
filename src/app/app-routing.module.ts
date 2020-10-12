import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-gaurd.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'rooms',
    loadChildren: () => import('./rooms/rooms.module').then( m => m.RoomsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'createroom',
    loadChildren: () => import('./createroom/createroom.module').then( m => m.CreateroomPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'board',
    loadChildren: () => import('./board/board.module').then( m => m.BoardPageModule),
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'memory-board',
  //   loadChildren: () => import('./memory-board/memory-board.module').then( m => m.MemoryBoardPageModule),

  // },
  // {
  //   path: 'memory-card',
  //   loadChildren: () => import('./memory-card/memory-card.module').then( m => m.MemoryCardPageModule)
  // },
  {
    path: 'memory-board',
    loadChildren: () => import('./memory-board/memory-board.module').then( m => m.MemoryBoardPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'game-option',
    loadChildren: () => import('./game-option/game-option.module').then( m => m.GameOptionPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'memory-rooms',
    loadChildren: () => import('./memory-rooms/memory-rooms.module').then( m => m.MemoryRoomsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'memory-createroom',
    loadChildren: () => import('./memory-createroom/memory-createroom.module').then( m => m.MemoryCreateroomPageModule),
    canActivate: [AuthGuardService]
  },



 



];


 





@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
