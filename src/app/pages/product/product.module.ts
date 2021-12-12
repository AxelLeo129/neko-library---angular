import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";
import { ComponentsModule } from "src/app/components/components.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ComponentsModule,
    FontAwesomeModule
  ],
})
export class ProductModule {}
