// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';


@NgModule({
  declarations: [
   // LoginComponent
    // Other components and directives
  ],
  imports: [
    BrowserModule,
    HttpClientModule
    // Other modules
  ],
  providers: [
    AuthService
    // Other services and dependencies
  ],

})
export class AppModule { }
