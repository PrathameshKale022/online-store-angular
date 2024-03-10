import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { addProduct, addProductFailure, addProductSuccess, deleteProduct, deleteProductFailure, deleteProductSuccess, editProduct, editProductFailure, editProductSuccess, loadProducts, loadProductsFailure, loadProductsSuccess } from './action/product.actions';


@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() => this.productService.getProducts()
      .pipe(
        map(products => loadProductsSuccess({ products })),
        catchError(error => of(loadProductsFailure({ error })))
      )
    )
  ));

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(addProduct),
    mergeMap(({ product }) => this.productService.addProduct(product)
      .pipe(
        map(() => { return {type: 'Add Product Success Action' }}),
        catchError(error => of(addProductFailure({ error })))
      )
    )
  ));

  editProduct$ = createEffect(() => this.actions$.pipe(
    ofType(editProduct),
    mergeMap(({ id, updatedProduct }) => this.productService.editProduct(id, updatedProduct)
      .pipe(
        map(() => editProductSuccess({ id, updatedProduct })),
        catchError(error => of(editProductFailure({ error })))
      )
    )
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProduct),
    mergeMap(({ id }) => this.productService.deleteProduct(id)
      .pipe(
        map((responseMessage: string) => {
            if (responseMessage === 'Product Deleted Successfully') {
              return deleteProductSuccess({id});
            } else {
              // Handle unexpected response message
              return deleteProductFailure({ error: 'Unexpected response message' });
            }
          }),
        catchError(error => of(deleteProductFailure({ error })))
      )
    )
  ));

}
