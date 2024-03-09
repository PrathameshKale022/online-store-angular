import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//   constructor(private authService: AuthService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.authService.getToken();
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }
//     return next.handle(request);
//   }
// }

export function TokenInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
        const authService = inject(AuthService);
        //console.log("authService Token==>"+localStorage.getItem('token'));
        const token = authService.getToken();
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
    // ...interceptor login
    return next(req);
    // .pipe(
    //     catchError((error: HttpErrorResponse) => {
    //      let errorMsg = "";
    //      if (error.error instanceof ErrorEvent) {
    //       console.log("this is client side error");
    //       errorMsg = `Client Error: ${error.error.message}`;
    //      } else {
    //       console.log("this is server side error");
    //       errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
    //      }
      
    //      console.log(errorMsg);
    //      return throwError(() => errorMsg);
    //     }),
    //    );
  }
