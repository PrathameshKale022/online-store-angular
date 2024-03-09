import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductFormComponent } from './pages/add-product-form/add-product-form.component';
import { SiteComponent } from './pages/site/site.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'site', component: SiteComponent },
    //{ path: 'admin/products', component: AdminProductsListComponent },
    { path: 'admin/products/add', component: AddProductFormComponent },

];
