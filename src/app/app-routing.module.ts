import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { 
    path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: ':categoria', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: ':categoria/:subcategoria', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
