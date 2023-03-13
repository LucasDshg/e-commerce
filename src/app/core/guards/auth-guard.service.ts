import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from '@core/auth/states/auth.states';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private _authState: AuthStateService, private _router: Router) {}

  public canActivate(): boolean {
    if (!this._authState.isAuthValue) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
