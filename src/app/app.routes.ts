import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductFormComponent } from './pages/add-product-form/add-product-form.component';
import { SiteComponent } from './pages/site/site.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
    { path: 'site', component: SiteComponent, canActivate: [AuthGuard]},
    //{ path: 'admin/products', component: AdminProductsListComponent },
    // { path: 'admin/products/add', component: AddProductFormComponent },

];
