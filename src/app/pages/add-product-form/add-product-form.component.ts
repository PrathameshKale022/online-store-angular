// add-product-form.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {
  product: Product = { product_id: 0, title: '', category:'',price: 0 };
  
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.product.title);
    this.productService.addProduct(this.product).subscribe(
      product => {
        console.log('Product Added Successfully') 
        this.productService.getProducts();
      });
    // Navigate back to the product list after adding the product
    //this.router.navigate(['/admin/products']);
  }
}