import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProductoComponent } from 'src/app/components/producto/producto.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';

@NgModule({
  declarations: [HomeComponent, ProductoComponent, NotFoundComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
