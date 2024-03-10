// admin-products-list.component.ts
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { selectProducts } from '../../selector/product.selectors';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-admin-products-list',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.css']
})
export class AdminProductsListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<{ id: number, updatedProduct: Product }>();
  @Output() delete = new EventEmitter<{ id: number }>();
  //products: Product[] = [];
  editflag: boolean = false;

  constructor(private productService: ProductService, private router: Router, private store: Store<{ products: Product[] }>) { }


  ngOnInit(): void {
    //this.getProducts();
    //this.products = this.store.pipe(select(selectProducts));
    console.log(localStorage.getItem('editflag'));
    if (localStorage.getItem('editflag') === 'true')
      this.editflag = true;
    else
      this.editflag = false;
  }

  // getProducts(): void {
  //   this.productService.getProducts()
  //     .subscribe(products => this.products = products);
  // }

  // addProduct(): void {
    
  //   this.router.navigate(['/admin/products/add']);
  // }


  editProduct(id: number, updatedProduct: Product): void {
    this.edit.emit({ id, updatedProduct });
    //this.router.navigate(['/admin/products/edit', id]);
  }


  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(message => {
        if (message && message === '') {
          console.log(message);
          //this.productService.getProducts();
          //this.products = this.products.filter(p => p.product_id !== id )
          this.delete.emit({id});
        }
      });
      // Update the products list after deletion
      //this.getProducts();
    }
  }
}
