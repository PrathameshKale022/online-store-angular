// auth.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  
  

  private apiUrl = 'http://localhost:9092/api/v1/authModule'; // Replace with your API URL http://172.23.80.1:9092/api/v1/authModule

  constructor(private http: HttpClient) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('editflag');
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    this.isLoggedIn = true;
    console.log(headers)
    console.log(credentials);
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Method to simulate login functionality
  login1(username: string, password: string): Observable<boolean> {
    // Add your authentication logic here (e.g., calling an API, checking credentials)
    // For demonstration purposes, we'll use a simple check for username and password
    if (username === 'admin' && password === 'password') {
      this.isLoggedIn = true;
      return of(true); // Return observable of true if login is successful
    } else {
      this.isLoggedIn = false;
      return of(false); // Return observable of false if login fails
    }
  }

  // Method to simulate logout functionality
  logout(): void {
    this.clearToken();
    this.isLoggedIn = false;
  }

  // Method to check if user is logged in
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}


