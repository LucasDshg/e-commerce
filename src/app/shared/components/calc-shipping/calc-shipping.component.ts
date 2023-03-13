import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalcShippingService } from './service/calc-shipping.service';
import { IShipping } from './interface/calc-shipping.interface';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'app-calc-shipping',
  templateUrl: './calc-shipping.component.html',
})
export class CalcShippingComponent implements OnInit {
  control = new FormControl('01010904');
  data$!: Observable<IShipping>;
  loading: boolean = false;
  constructor(private _shippingService: CalcShippingService) {}

  ngOnInit(): void {}

  calc() {
    this.loading = true;
    this.data$ = this._shippingService
      .getShippingByCep(this.control.value)
      .pipe(finalize(() => (this.loading = false)));
  }
}
