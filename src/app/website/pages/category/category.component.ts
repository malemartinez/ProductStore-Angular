import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { GetProductsService } from 'src/app/services/get-products.service';
import { Product } from 'src/models/products.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: string | null = "" ;
  products: Product [] = []
  limit = 10;
  offset = 0;
  constructor(
    private route: ActivatedRoute,
    private getProductService : GetProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.category = params.get("id")
        if(this.category){
          return this.getProductService.getCategoryProducts(this.category , this.limit , this.offset)
        }
        return []
      })
    )
    .subscribe(data =>{
          this.products = data
    })

  }


}
