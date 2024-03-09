// login.component.ts

import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { AuthCredentials } from '../../authcredentials';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  credentials: AuthCredentials = { username: '', password: '' };
  errorMessage: string = '';
  showerrorMsg: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit(): void {
    // Add logic to authenticate user (dummy logic for demonstration)
    //const isAuthenticated = this.authenticateUser(this.username, this.password);
    this.showerrorMsg = false;
    if (this.credentials.username && this.credentials.password) {
      // Call AuthService to perform login
      console.log(this.username);
      this.authService.login(this.credentials)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.showerrorMsg = true;
            this.errorMessage = 'Invalid username or password';
            console.error('Authentication failed. Invalid username or password.' + error);
            if (error.error instanceof ErrorEvent) {
              console.log("this is client side error");
             // errorMsg = `Client Error: ${error.error.message}`;
            } else {
              console.log("this is server side error");
             // errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
            }

            return throwError(() => this.errorMessage);
          }),
        )
        .subscribe({
          next: (res) => {
            if (res) {
              // Redirect to the dashboard or the desired page upon successful login
              // Example: this.router.navigate(['/dashboard']);
              this.authService.setToken(res.token);
              //console.log(`Login Successful: ${res.roles}`);
              if (res.roles.includes('ROLE_ADMIN')){
                localStorage.setItem('editflag','true');
                this.router.navigate(['/dashboard'], { queryParams: { editflag: true } });
              }
              else{
                localStorage.setItem('editflag','false');
                this.router.navigate(['/site'], { queryParams: { editflag: false } });
              }
              // Example redirect to dashboard page
            } else {
              // Display error message or handle unsuccessful login
              this.errorMessage = 'Invalid username or password';
              console.error('Authentication failed. Invalid username or password.');
            }
          },
          error: (error) => {
            // Handle error cases
            this.errorMessage = 'Invalid username or password';
            console.error('Authentication failed. Invalid username or password.' + error);
          },
        });
    } else {
      this.errorMessage = 'Please Enter Credentials to Login';
      this.showerrorMsg = true;
    }


    // if (isAuthenticated) {
    //   // Redirect to appropriate page after successful login
    //   this.router.navigate(['/dashboard']); // Example redirect to dashboard page
    // } else {
    //   // Optionally, display error message or handle unsuccessful login
    //   console.error('Authentication failed. Invalid username or password.');
    // }
  }

  private authenticateUser(username: string, password: string): boolean {
    // Perform authentication logic (dummy logic for demonstration)
    // Replace this with actual authentication logic (e.g., calling an authentication service)
    // For demonstration purposes, we'll consider the user authenticated if username and password are not empty
    return !!username && !!password;
  }
}
