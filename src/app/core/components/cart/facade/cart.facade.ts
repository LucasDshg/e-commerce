import { Injectable, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { CartState } from '../states/cart.state';
import { ICart } from '../interface/cart.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  constructor(
    private _cartService: CartService,
    private _cartState: CartState,
  ) {
    if (!this._cartState.items.length) this.initCartState();
  }

  initCartState() {
    return this._cartService
      .getItems()
      .subscribe((res) => (this._cartState.initList = res));
  }

  getItems() {
    return this._cartState.itemsObservable;
  }

  getTotalCart() {
    return this._cartState.totalCartObservable;
  }
  
  addItem(item: ICart) {
    return this._cartService
      .addItem(item)
      .pipe(tap((res) => (this._cartState.addItem = res)));
  }

  updateItem(id: number, item: Partial<ICart>) {
    const product = this._cartState.items.find((item) => item.id === id)!;

    return this._cartService
      .updateItem(id, Object.assign(product, item))
      .pipe(tap((res) => (this._cartState.updateItem = res)));
  }

  removeItem(id: number) {
    return this._cartService
      .removeItem(id)
      .pipe(tap(() => (this._cartState.removeItem = id)));
  }
}
