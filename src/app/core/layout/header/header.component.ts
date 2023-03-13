import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/auth/interfaces/auth.interface';
import { AuthService } from '@core/auth/services/auth.service';
import { AuthStateService } from '@core/auth/states/auth.states';
import { CartComponent } from '@core/components/cart/cart.component';
import { ICart } from '@core/components/cart/interface/cart.interface';
import { CartState } from '@core/components/cart/states/cart.state';
import { OffcanvasService } from '@shared/components/offcanvas/service/offcanvas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: IUser | undefined;
  cartItems$!: Observable<ICart[]>;

  constructor(
    private _authService: AuthService,
    private _authStates: AuthStateService,
    private _offCanvasservice: OffcanvasService,
    private _cartState: CartState,
  ) {}

  ngOnInit(): void {
    this.user = this._authStates.isAuthValue;
    this.cartItems$ = this._cartState.itemsObservable;
  }

  openCart() {
    this._offCanvasservice.open(CartComponent);
  }
  logout(): void {
    this._authService.logout();
  }
}
