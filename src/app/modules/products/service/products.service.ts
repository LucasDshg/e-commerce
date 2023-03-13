import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IProducts } from '../interfaces/products.interface';
import { ENUM_PRODUCTS_ORDERS } from '../enums/products.enum';
import { shareReplay } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private _http: HttpClient) {}

  getProducts(orderBy: ENUM_PRODUCTS_ORDERS = ENUM_PRODUCTS_ORDERS.RATE) {
    return this._http
      .get<IProducts[]>(`${environment.url}/products?_sort=${orderBy}`)
      .pipe(shareReplay(1));
  }

  getProduct(id: number) {
    return this._http.get<IProducts>(`${environment.url}/products/${id}`);
  }
}
