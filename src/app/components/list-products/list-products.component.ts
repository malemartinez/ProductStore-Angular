import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { switchMap } from 'rxjs';
import { CreateProductDTO, Product , UpdateProductDTO } from 'src/models/products.model';
import { StoreService } from 'src/app/services/store.service';
import { GetProductsService } from 'src/app/services/get-products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  myProductsCard : Product [] = [];
  @Input() products: Product [] = [];
  @Input() set productID(id:string|null){
    if(id){
      this.onShowDetail(id)
    }
  }
  total:number = 0;
  showProductDetail = false;
  @Output() LoadMoreProducts =  new EventEmitter()
  // limit = 10;
  // offset = 0;

  productChosen: Product = {
    id:"0",
    title:'',
    price: 0,
    images: [],
    category: {
      id: '',
      name:'',
      image:''
    },
    description:''
  }
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private getProductsService : GetProductsService
    ) {
    this.myProductsCard = this.storeService.getProductsCart();
   }

  ngOnInit(): void {
  // aqui inicializamos la peticion del servicio ya que es una peticion asincrona y no la podemos poner en el contructor
  // this.getProductsService.getAllProducts().subscribe(data =>
  //   this.products = data)
  // this.getProductsService.getAllProducts(this.limit , this.offset)
    // this.LoadMoreProducts()
  }




  onAddedShoppingCart(product : Product){
    console.log(product)
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id:string){
    //let prod:any = this.products.find(ele =>  ele.id == id);
    //console.log('id: ', prod);
    //this.productChosen = prod
    //this.toggleProductDetail()
    // para traer los detalles en una peticion get
    this.getProductsService.getProduct(id)
    .subscribe({
      next: (d: Product) => this.showDetailOk(d),
      error: (e: any) => this.showDetailError(e),
      complete: () => console.info('complete')
  })

  }
  showDetailOk(data: Product) {
    this.statusDetail = 'success';
    console.log('producto obtenido: ', data);
    this.toggleProductDetail();
    this.productChosen = data;
  }
  showDetailError(e: any) {
    this.statusDetail = 'error';
    this.toggleProductDetail();
    console.error(e)
 }

 //Evitando el callback hell
 readAndUpdate(id: string) {
  // Esto se hace cuando dependo primero que se ejecute un servicio para hacer el otro. En este caso
  // se necesita el id para poder hacer la actualizacion
  // Entonces primero se llama a un GET y despues al UPDATE

  this.getProductsService.getProduct(id)
  .pipe(
    switchMap((product:Product) => this.getProductsService.updateProduct(product.id, {title: 'change'})),
  )
  .subscribe((data: any) => {
    console.log(data);
  });

  // cuando no depende de otra peticion y quiero que se ejecuten en paralelo ambas peticiones
  // puedo usar el metodo zip que me permite adjuntar y recibir peticiones al mismo tiempo

  this.getProductsService.fetchReadAndUpdate(id, {title: 'change'})
  .subscribe((response: any[]) => {
    const read = response[0]
    const update = response[1]
  })

}

  CreateProduct(){
    const newProduct:CreateProductDTO = {
      title:"Nuevo Producto",
      price: 15000,
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Quisque scelerisque porta nisl id euismod. Duis congue ante vehicula eros imperdiet,
              vitae pharetra eros venenatis. Vivamus sollicitudin hendrerit nulla ut volutpat.
              Nullam ut malesuada est. Donec eleifend dignissim nunc, vel cursus mauris.`,
      categoryId: "2"
    }

    this.getProductsService.createProduct(newProduct)
      .subscribe((data: Product) => {
        this.products.unshift(data)
      })
  }

  updateProduct(){
    const ChangeProduct:UpdateProductDTO = {
      title:"Un nuevo titulo",
    }
    const id = this.productChosen.id

    this.getProductsService.updateProduct(id , ChangeProduct)
      .subscribe((data: Product) => {
        console.log(data)
        const prodIndex:any = this.products.findIndex(ele =>  ele.id == id);
        this.products[prodIndex] = data;
        this.productChosen = data;
      })
  }
  deleteProduct(){
    const id = this.productChosen.id
    this.getProductsService.DeleteProduct(id)
      .subscribe((data: any) => {
        console.log(data)
        const prodIndex:any = this.products.findIndex(ele =>  ele.id == id);
        this.products.splice(prodIndex, 1)
        this.showProductDetail = false;
      })
  }
  // MoreProductsButton(){
  //   this.getProductsService.getAllProductsParams(this.limit , this.offset)
  //   .subscribe((data: any) =>
  //     this.products = [...this.products , ...data]
  //     // this.products.push(...data) otra forma de agregar al array de productos
  //     )
  //     this.offset += this.limit
  // }
  MoreProductsButton(){
    this.LoadMoreProducts.emit();
  }


}
