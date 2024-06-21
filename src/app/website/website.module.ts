import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

import { WebsiteRoutingModule } from './website-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';

import { MycartComponent } from './pages/mycart/mycart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    MycartComponent,
    HeaderComponent,
    ProductDetailComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule
  ]
})
export class WebsiteModule { }
