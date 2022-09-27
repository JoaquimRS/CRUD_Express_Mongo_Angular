import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe((products) => {
        this.products = products
        console.log(products);
         
      });
    
  }

}
