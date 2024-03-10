// add-product-form.component.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {
  product: Product = { product_id: 0, title: '', category:'',price: 0 };
  @Output() add = new EventEmitter<Product>();
  constructor(private productService: ProductService, private router: Router) {
    
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    
    // this.productService.addProduct(this.product).subscribe(
    //   product => {
    //     console.log('Product Added Successfully') 
    //     //this.productService.products.push(product)
    //       this.dashboardcomponent.addProduct(product);
    //   });
    console.log(this.product.title);
    this.add.emit(this.product);
    // Navigate back to the product list after adding the product
    //this.router.navigate(['/admin/products']);
  }
}
