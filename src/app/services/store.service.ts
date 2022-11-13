import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; //sirve para crerar observables para reactividad
import { product } from '../products.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  private myProductsCard : product [] = [];
  private myCart = new BehaviorSubject<product []>([]);

  myCart$ = this.myCart.asObservable(); //observador
  total:number = 0;


  addProduct(product: product){
    this.myProductsCard.push(product);
    this.myCart.next(this.myProductsCard);
  }

  getTotal(){
    return this.myProductsCard.reduce((sum , item)=> sum + item.price , 0)
  }

  getProductsCart(){
    return this.myProductsCard
  }
}
