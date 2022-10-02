import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  subscription!: Subscription
  uProduct!: Product

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.state$.subscribe(product => this.uProduct = product)
  }


}
