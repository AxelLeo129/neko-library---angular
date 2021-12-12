import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SliderComponent } from 'src/app/components/slider/slider.component';
import { NgbCarouselModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [HomeComponent, SliderComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbCarouselModule,
    FontAwesomeModule,
    NgbTooltipModule,
    ComponentsModule
  ]
})
export class HomeModule { }
