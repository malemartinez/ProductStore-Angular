import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from '../products.model';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  constructor(
    private http : HttpClient
  ) { }

  getAllProducts(){
   return this.http.get<product[]>('https://fakestoreapi.com/products')
  }
}
