import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IShipping } from '../interface/calc-shipping.interface';
import { environment } from '@env/environment';
import { delay, map, shareReplay } from 'rxjs';

@Injectable()
export class CalcShippingService {
  constructor(private _http: HttpClient) {}

  getShippingByCep(cep: number) {
    return this._http
      .get<IShipping[]>(`${environment.url}/shipping?cep=${cep}`)
      .pipe(
        map((res) => res[0]),
        delay(1000),
        shareReplay(1),
      );
  }
}
