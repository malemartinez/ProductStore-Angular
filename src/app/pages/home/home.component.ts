import { Component, OnInit } from '@angular/core';
import { GetProductsService } from 'src/app/services/get-products.service';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/models/products.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product [] = []
  limit = 10;
  offset = 0;


  constructor(
    private getProductsService : GetProductsService
    ) {

   }

  ngOnInit(): void {
    this.LoadMoreProducts()
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
