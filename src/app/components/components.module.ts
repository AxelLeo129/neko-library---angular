import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderComponent } from './loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { ScrollUpComponent } from './scroll-up/scroll-up.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BannerComponent } from './banner/banner.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoaderComponent, NotFoundComponent, SkeletonComponent, ScrollUpComponent, BannerComponent, FeaturedProductsComponent],
  exports: [LoaderComponent, NotFoundComponent, SkeletonComponent, ScrollUpComponent, BannerComponent, FeaturedProductsComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule,
    FontAwesomeModule,
    RouterModule,
    MatSelectModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
