import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderComponent } from './loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { ScrollUpComponent } from './scroll-up/scroll-up.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LoaderComponent, NotFoundComponent, SkeletonComponent, ScrollUpComponent],
  exports: [LoaderComponent, NotFoundComponent, SkeletonComponent, ScrollUpComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule,
    FontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
