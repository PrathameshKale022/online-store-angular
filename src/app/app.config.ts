import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './reducer/product.effects';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { productReducer } from './reducer/product.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      StoreModule.forRoot({ products: productReducer }),
      StoreModule.forFeature('products', productReducer)
    ),
    provideHttpClient(withInterceptors([TokenInterceptor])),
    provideEffects(ProductEffects),
    provideStore(productReducer)
    ]
    
};
