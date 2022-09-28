import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';


import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = []

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    ) {
      this.productForm = this.fb.group({
        price: ['', Validators.required],
        title: ['', Validators.required],
        desc: ['', Validators.required],
        category: ['', Validators.required]
        
      })
    }

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
  addProduct(): void {
    const newProduct : Product = {
      title: this.productForm.get("title")?.value,
      price: this.productForm.get("price")?.value,
      desc: this.productForm.get("desc")?.value,
      category: this.productForm.get("category")?.value,
    
    }
    this.productService.saveProduct(newProduct)
    .subscribe(product =>{
        this.productForm.reset()
        this.products.push(product)
        
      }
    )
  }
  removeProduct(product: Product): void {
    
    console.log("Remove Product"+product.slug);
  }
  updateProduct(): void {
    console.log("Update Product");
    
  }

}
