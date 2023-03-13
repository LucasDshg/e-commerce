import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from '../interface/cart.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _http: HttpClient) {}

  getItems() {
    return this._http.get<ICart[]>(`${environment.url}/cart`);
  }

  addItem(data: ICart) {
    return this._http.post<ICart>(`${environment.url}/cart`, data);
  }

  updateItem(id: number, item: Partial<ICart>) {
    return this._http.put<ICart>(`${environment.url}/cart/${id}`, item);
  }
  removeItem(id: number) {
    return this._http.delete<void>(`${environment.url}/cart/${id}`);
  }
}
