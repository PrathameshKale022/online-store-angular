import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:9092/api/v1/productModule'; 

  products: Product[] = [
    { product_id: 1, title: 'Product 1', category: 'Category A', price: 10 },
    { product_id: 2, title: 'Product 2', category: 'Category B', price: 20 },
    { product_id: 3, title: 'Product 3', category: 'Category A', price: 30 }
    // Add more products as needed
  ];

  constructor(private http: HttpClient) { }

 getProducts(): Observable<Product[]> {
    //return of(this.products);
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  addProduct1(product: Product): void {
    // Generate a unique ID for the new product
    const newProductId = this.generateUniqueId();
    // Assign the generated ID to the new product
    product.product_id = newProductId;
    // Push the new product to the array of products
    //this.http.post<Product[]>(`${this.apiUrl}/products`);
    //this.products.push(product);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/admin/products`, product);
  }
  getProduct(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.product_id === id);
    return of(product);
  }
  editProduct(id: number, updatedProduct: Product): Observable<Product> {
    // Find the index of the product with the given ID
    
    const index = this.products.findIndex(product => product.product_id === id);
    // If the product is found, update it
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
    return this.http.post<Product>(`${this.apiUrl}/admin/products/${id}`, updatedProduct);
  }

  deleteProduct(id: number): Observable<string> {
    // Filter out the product with the given ID
   return this.http.delete<string>(`${this.apiUrl}/admin/products/${id}`);
    //this.products = this.products.filter(product => product.product_id !== id);
  }

  getCategories(): string[] {
    // Extract categories from products
    const categories = this.products.map(product => product.category);
    // Remove duplicates
    return [...new Set(categories)];
  }

  private generateUniqueId(): number {
    // Generate a unique ID based on the current timestamp
    return Date.now();
  }
}
