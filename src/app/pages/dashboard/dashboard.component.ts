import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';
import { CommonModule } from '@angular/common';
import { AdminProductsListComponent } from '../admin-products-list/admin-products-list.component';
import { Product } from '../../product';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { addProduct, deleteProduct, editProduct } from '../../reducer/action/product.actions';
import { selectProducts } from '../../selector/product.selectors';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AddProductFormComponent,AdminProductsListComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  showAddProduct: boolean = false;
  editflag: boolean = false;
  products$: Observable<Product[]>;

  constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute,private store: Store<{ products: Product[] }>) {
    this.products$ = store.pipe(select(selectProducts));
   }

  ngOnInit(): void {
    // Initialize dashboard data or fetch user-specific information
    this.editflag = this.route.snapshot.queryParams['editflag'];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleAddProduct(): void {
    this.showAddProduct = !this.showAddProduct;
  }


  addProduct(product: Product): void {
    // Dispatch addProduct action
    this.store.dispatch(addProduct({ product }));
  }

  editProduct(id: number, updatedProduct: Product): void {
    // Dispatch editProduct action
    this.store.dispatch(editProduct({ id, updatedProduct }));
  }

  deleteProduct(id: number): void {
    // Dispatch deleteProduct action
    this.store.dispatch(deleteProduct({ id }));
  }

}
