import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { ICart } from '../interface/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartState {
  private _cartList$ = new BehaviorSubject<ICart[]>([]);

  set initList(value: ICart[]) {
    this._cartList$.next(value);
  }

  set addItem(value: ICart) {
    const items = this.items;
    items.push(value);
    this._cartList$.next(items);
  }

  set updateItem(value: ICart) {
    const index = this.items.findIndex((i) => i.id === value.id);
    this.items[index] = value;
    this._cartList$.next(this.items);
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
}
