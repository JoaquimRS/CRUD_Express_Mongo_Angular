import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of , Subscription} from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = []
  subscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private modal : MatDialog

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
    this.productService.deleteProduct(product)
    .subscribe(res =>{
      console.log(res);
      let sProducts: Product[] = this.products.filter(p => p.slug != product.slug)
      this.products = sProducts    
      console.log("Remove Product"+product.slug);
    })
  }
  updateProduct(product: Product): void {     
    this.productService.setCurrentProduct(product)
    const modalRef = this.modal.open(ModalComponent)

    modalRef.afterClosed()
    .subscribe(() =>{
      this.productService.updateProduct(product)
      .subscribe(res =>{
        console.log(res);
        
      })
      
      
    })
    
  }

}
