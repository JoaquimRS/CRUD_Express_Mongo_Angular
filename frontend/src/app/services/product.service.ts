import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private state = new BehaviorSubject({} as Product)
  state$ = this.state.asObservable();

  get currentProduct(): Product {
    return this.state.getValue()
  }

  setCurrentProduct(product: Product) {
    this.state.next(product)
  }

  private productsUrl = 'http://ximo.com:8080/products'
  constructor(private http:HttpClient) { }


  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
  }

  saveProduct(newProduct: Product):Observable<any> {
    return this.http.post(this.productsUrl, newProduct)
  }

  deleteProduct(product: Product):Observable<any> {
    return this.http.delete(this.productsUrl+"/"+product.slug);
  }
  updateProduct(product: Product):Observable<any> {
    return this.http.put(this.productsUrl+"/"+product.slug, product)
  }
}
