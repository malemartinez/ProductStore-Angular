import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { product , CreateProductDTO , UpdateProductDTO} from '../products.model';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http : HttpClient
  ) { }

  getAllProducts(limit?:number , offset? :number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set("limit", limit)
      params = params.set("offset", offset)
    }
   return this.http.get<product[]>(this.apiUrl , {params})
  }

  getProduct(id: string) {
    return this.http.get<product>(`${this.apiUrl}/${id}`)
  }

  createProduct(data: CreateProductDTO){
    // La peticion post la hacemos de tipo Product porque cuando nos devuleva el product queremos que sea de ese tipo, aunque el que le enviamos es el DTO
    return this.http.post<product>(this.apiUrl , data); 
  }

  updateProduct(id: string , data:UpdateProductDTO){
    return this.http.put<product>(`${this.apiUrl}/${id}` , data); 
  }
  DeleteProduct(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`); //depende de la API asi 
    //se hace el delete. En este caso solo devuelve un boolean de si se eliminó o no.
  }
  getAllProductsParams(limit:number , offset :number){
    return this.http.get<product[]>(this.apiUrl , { params: {limit,  offset} }  )
   }
}
