import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/products.model';
import { StoreService } from 'src/app/services/store.service';
import { GetProductsService } from 'src/app/services/get-products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  myProductsCard : product [] = [];
  products: product [] = []
  total:number = 0;
  showProductDetail = false;
  productChosen: product = {
    id:0,
    title:'',
    price: 0,
    images: [],
    category: {
      id: '',
      name:''
    },
    description:''
  } 

  constructor(
    private storeService: StoreService,
    private getProductsService : GetProductsService
    ) {
    this.myProductsCard = this.storeService.getProductsCart();
   }

  ngOnInit(): void {
  // aqui inicializamos la peticion del servicio ya que es una peticion asincrona y no la podemos poner en el contructor
  this.getProductsService.getAllProducts().subscribe(data =>
    this.products = data)
  }




  onAddedShoppingCart(product : product){
    console.log(product)
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id:number){
    let prod:any = this.products.find(ele =>  ele.id == id);
    console.log('id: ', prod);
    this.productChosen = prod
    this.toggleProductDetail()
  }

}
