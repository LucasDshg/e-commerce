import { Injectable, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { CartState } from '../states/cart.state';
import { ICart } from '../interface/cart.interface';
import { tap } from 'rxjs';
import { ToastService } from '@shared/components/toast/service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  constructor(
    private _cartService: CartService,
    private _cartState: CartState,
    private _toastService: ToastService,
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
    const isAdded = this._findProductCart(item.idProduct, 'idProduct');

    if (isAdded) {
      return this.updateItem(isAdded.id!, {
        quant: isAdded.quant + item.quant,
        color: item.color,
        size: item.size,
      });
    }

    return this._cartService.addItem(item).pipe(
      tap((res) => {
        this._cartState.addItem = res;
        this._showToastSuccess('Produto adicionado ao carrinho!');
      }),
    );
  }

  updateItem(id: number, item: Partial<ICart>) {
    const product = this._findProductCart(id);

    return this._cartService.updateItem(id, Object.assign(product, item)).pipe(
      tap((res) => {
        this._cartState.updateItem = res;
        this._showToastSuccess('Produto atualizado no carrinho!');
      }),
    );
  }

  removeItem(id: number) {
    return this._cartService.removeItem(id).pipe(
      tap(() => {
        this._cartState.removeItem = id;
        this._showToastSuccess('Produto removido do carrinho!');
      }),
    );
  }

  private _showToastSuccess(text: string) {
    this._toastService.show({ text, type: 'success' });
  }

  private _findProductCart(id: number, key: string = 'id') {
    return this._cartState.items.find((item) => (item as any)[key] === id)!;
  }
}
