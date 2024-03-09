import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './reducer/product.effects';
import { provideState, provideStore } from '@ngrx/store';
import { productReducer } from './reducer/product.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([TokenInterceptor])),
    provideEffects(ProductEffects),
    provideStore(productReducer)
    ]
    
};
