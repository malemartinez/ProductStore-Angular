import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductsService } from 'src/app/services/get-products.service';
import { Product } from 'src/models/products.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product [] = [];
  productID : string | null = null;
  limit = 10;
  offset = 0;


  constructor(
    private getProductsService : GetProductsService,
    private route:ActivatedRoute
    ) {

   }

  ngOnInit(): void {
    this.getProductsService.getAllProductsParams(this.limit , this.offset)
    .subscribe((data) =>
        this.products = [...this.products , ...data]
    )
    this.offset += this.limit;
    this.route.queryParamMap.subscribe(params => {
      this.productID = params.get('product');
    })
  }

  LoadMoreProducts(){
    this.getProductsService.getAllProductsParams(this.limit , this.offset)
    .subscribe((data) =>
      //  this.products = [...this.products , ...data]
       this.products.push(...data) //otra forma de agregar al array de productos
      )
      this.offset += this.limit
  }

}
