import { Component, OnInit } from '@angular/core';
import { CartFacade } from './facade/cart.facade';
import { CartState } from './states/cart.state';
import { ICart } from './interface/cart.interface';
import { Observable, skip, skipWhile } from 'rxjs';
import { OffcanvasRef } from '@shared/components/offcanvas/offcanvas-parts/offcanvas-ref.component';
import { OffcanvasService } from '@shared/components/offcanvas/service/offcanvas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent extends OffcanvasRef implements OnInit {
  data: ICart[] = [];
  total!: number;

  constructor(
    private _cartFacade: CartFacade,
    private _router: Router,
    service: OffcanvasService,
  ) {
    super(service);
  }

  ngOnInit(): void {
    this._cartFacade
      .getItems()
      .pipe(skipWhile((res) => !res.length))
      .subscribe((res) => {
        this.data = res;
        this.total = res.map((item) => item.price).reduce((a, b) => a + b);
      });
  }

  seeDetails(id: number) {
    this._router.navigate(['products', 'details', id]);
  }

  remove(id: number) {
    this._cartFacade.removeItem(id).subscribe();
  }

  updateQuant(item: ICart, action: 'add' | 'remove') {
    let quant = item.quant;

    action === 'add' ? quant++ : quant--;

    this._cartFacade.updateItem(item.id!, { quant }).subscribe();
  }
}
