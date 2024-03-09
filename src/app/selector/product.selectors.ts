// product.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../reducer/product.reducer';


export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);
