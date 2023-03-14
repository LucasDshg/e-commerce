import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { ICart } from '../interface/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartState {
  private _cartList$ = new BehaviorSubject<ICart[]>([]);

  private _cartTotal$ = new BehaviorSubject<number>(0);
  set initList(value: ICart[]) {
    this._cartList$.next(value);
    this._updateTotal();
  }

  set addItem(value: ICart) {
    const items = this.items;
    items.push(value);
    this._cartList$.next(items);
    this._updateTotal();
  }

  set updateItem(value: ICart) {
    const index = this.items.findIndex((i) => i.id === value.id);
    this.items[index] = value;
    this._cartList$.next(this.items);
    this._updateTotal();
  }

  set removeItem(id: number) {
    const index = this.items.findIndex((i) => i.id === id);
    this.items.splice(index, 1);
    this._cartList$.next(this.items);
  }

  get itemsObservable() {
    return this._cartList$.asObservable().pipe(distinctUntilChanged());
  }

  get items() {
    return this._cartList$.value;
  }

  get totalCartObservable() {
    return this._cartTotal$.asObservable().pipe(distinctUntilChanged());
  }

  private _updateTotal() {
    this._cartTotal$.next(this._calcTotalCart());
  }
  private _calcTotalCart() {
    return this.items
      .map((item) => item.price * item.quant)
      .reduce((a, b) => a + b);
  }
}
