import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';

import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

import { HighlightDirective } from './directives/highlight.directive';
import { ProductsComponent } from './components/products/products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ImgComponent } from './components/img/img.component';

@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ProductsComponent,
    ListProductsComponent,
    ImgComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule
  ],
  exports:[
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ProductsComponent,
    ListProductsComponent,
    ImgComponent
  ]
})
export class SharedModule { }
