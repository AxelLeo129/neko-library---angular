import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [ProductComponent, NotFoundComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
