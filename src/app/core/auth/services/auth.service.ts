import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';
import { AuthStateService } from '../states/auth.states';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { IUser } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _authState: AuthStateService,
  ) {}

  login(user: string, pass: string) {
    return this._http
      .get<IUser[]>(`${environment.url}/users?user=${user}&password=${pass}`)
      .pipe(
        map((res) => {
          if (res.length) {
            const data = res[0];
            delete data.password;
            this._authState.auth = data;
            this._router.navigateByUrl('/');
          }
          throw new Error('Usuário ou senha inválida!');
        }),
      );
  }

  logout() {
    this._authState.auth = undefined;
    this._router.navigateByUrl('/login');
  }
}
