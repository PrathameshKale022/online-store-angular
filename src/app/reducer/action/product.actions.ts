// product.actions.ts

import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Product] Load Products Failure', props<{ error: any }>());
// Define action types
export const addProduct = createAction(
    '[Product] Add Product',
    props<{ product: Product }>()
  );
  
  export const addProductSuccess = createAction(
    '[Product] Add Product Success',
    props<{ product: Product }>()
  );
  
  export const addProductFailure = createAction(
    '[Product] Add Product Failure',
    props<{ error: any }>()
  );
  
  export const editProduct = createAction(
    '[Product] Edit Product',
    props<{ id: number; updatedProduct: Product }>()
  );
  
  export const editProductSuccess = createAction(
    '[Product] Edit Product Success',
    props<{ id: number; updatedProduct: Product }>()
  );
  
  export const editProductFailure = createAction(
    '[Product] Edit Product Failure',
    props<{ error: any }>()
  );
  
  export const deleteProduct = createAction(
    '[Product] Delete Product',
    props<{ id: number }>()
  );
  
  export const deleteProductSuccess = createAction(
    '[Product] Delete Product Success',
    props<{ id: number  }>()
  );
  
  export const deleteProductFailure = createAction(
    '[Product] Delete Product Failure',
    props<{ error: any }>()
  );
