import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';


@NgModule({
  declarations: [ProductComponent, NotFoundComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
