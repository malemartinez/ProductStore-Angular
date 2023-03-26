import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product , CreateProductDTO} from '../products.model';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http : HttpClient
  ) { }

  getAllProducts(){
   return this.http.get<product[]>(this.apiUrl)
  }

  getProduct(id: string) {
    return this.http.get<product>(`${this.apiUrl}/${id}`)
  }

  createProduct(data: CreateProductDTO){
    // La peticion post la hacemos de tipo Product porque cuando nos devuleva el product queremos que sea de ese tipo, aunque el que le enviamos es el DTO
    return this.http.post<product>(this.apiUrl , data); 
  }
}
