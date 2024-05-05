import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { HttpClient, HttpParams , HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import { Product , CreateProductDTO , UpdateProductDTO} from '../../models/products.model';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  private apiUrl = `${environment.API_URL}/api/v1/products`;

  constructor(
    private http : HttpClient
  ) { }

  getAllProducts(limit?:number , offset? :number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set("limit", limit)
      params = params.set("offset", offset)
    }
   return this.http.get<Product[]>(this.apiUrl , {params})
   .pipe(
    retry(2) //Se usa para hacer varias veces la peticion al servidor por si este falla en la primera request
  );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleErrors(err)
      })
    );
  }

  handleErrors(error: HttpErrorResponse)  {
    if (error.status == HttpStatusCode.Forbidden)
      return throwError(() => new Error ('No tiene permisos para realizar la solicitud.'));
    if (error.status == HttpStatusCode.NotFound)
      return throwError(() => new Error ('El producto no existe.'));
    if (error.status == HttpStatusCode.InternalServerError)
      return throwError(() => new Error ('Error en el servidor.'));
    return throwError(() => new Error ('Un error inesperado ha ocurrido.'));
  }

  createProduct(data: CreateProductDTO){
    // La peticion post la hacemos de tipo Product porque cuando nos devuleva el product queremos que sea de ese tipo, aunque el que le enviamos es el DTO
    return this.http.post<Product>(this.apiUrl , data);
  }

  updateProduct(id: string , data:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}` , data);
  }
  DeleteProduct(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`); //depende de la API asi
    //se hace el delete. En este caso solo devuelve un boolean de si se eliminó o no.
  }
  getAllProductsParams(limit:number , offset :number){
    return this.http.get<Product[]>(this.apiUrl , { params: {limit,  offset} }  )
    .pipe(
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      })))
   }

   // puedo usar el metodo zip que me permite adjuntar y recibir peticiones al mismo tiempo
   fetchReadAndUpdate(id:string , data:UpdateProductDTO){
    return zip(
      this.getProduct(id),
      this.updateProduct(id, data)
    )
   }
}
