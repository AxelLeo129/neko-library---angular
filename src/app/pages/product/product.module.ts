import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@NgModule({
  declarations: [ProductComponent, NotFoundComponent, LoaderComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
