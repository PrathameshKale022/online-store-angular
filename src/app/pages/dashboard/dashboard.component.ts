import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';
import { CommonModule } from '@angular/common';
import { AdminProductsListComponent } from '../admin-products-list/admin-products-list.component';


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

  constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute) { }

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

}
