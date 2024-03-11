// product.reducer.ts

import { createReducer, on } from '@ngrx/store';

import { Product } from '../product';
import { addProduct, addProductSuccess, deleteProduct, deleteProductSuccess, editProduct, editProductSuccess, loadProducts, loadProductsFailure, loadProductsSuccess } from './action/product.actions';


export interface ProductState {
  products: Product[];
  loading: boolean;
  error: any;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, state => ({
    ...state,
    loading: true
  })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(addProduct, (state, { product }) => ({
    ...state,
    products: [...state.products, product]
  })),
  on(editProduct, (state, { id, updatedProduct }) => ({
    ...state,
    products: state.products.map(p => p.product_id === id ? updatedProduct : p)
  })),
  on(deleteProduct, (state, { id }) => ({
    ...state,
    products: state.products.filter(p => p.product_id !== id),
    loading: false,
    error: null
  })),
  on(addProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product]
  })),

  on(editProductSuccess, (state, { id, updatedProduct }) => ({
    ...state,
    products: state.products.map(product =>
      product.product_id === id ? { ...product, ...updatedProduct } : product
    )
  })),

  on(deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter(p => p.product_id !== id),
    loading: false
    //products: state.products.filter(product => product.product_id !== id)
  }))
);
