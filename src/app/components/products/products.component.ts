import { Component, Input, OnInit } from '@angular/core';
import { product } from 'src/app/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

 @Input() product !: product; //esto lo hacemos para no inicializar ls vsrisble

}
