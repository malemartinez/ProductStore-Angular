import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { GetProductsService } from 'src/app/services/get-products.service';
import { Product } from 'src/models/products.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productID: string | null = "" ;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private getProductService : GetProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productID = params.get("id")
        if(this.productID){
          return this.getProductService.getProduct(this.productID)
        }
        return [null]
      })
    )
    .subscribe(data =>{
          this.product = data
    })

  }

  goToBack(){
    this.router.navigate(['/category' , this.product?.category.id]);
  }

}
