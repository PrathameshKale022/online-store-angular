import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';
import { AdminProductsListComponent } from '../admin-products-list/admin-products-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [RouterOutlet, FormsModule,AdminProductsListComponent,CommonModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {
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

}
