import { Component, OnInit } from '@angular/core';
import { Observable, delay, finalize, tap } from 'rxjs';
import { IProducts } from '../interfaces/products.interface';
import { ProductsService } from '../service/products.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DetailsProductSelected } from './model/details-product.model';
import { getValueForm } from '@utils/functions';
import { CartFacade } from '@core/components/cart/facade/cart.facade';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
})
export class DetailsProductComponent implements OnInit {
  data$!: Observable<IProducts | undefined>;
  form!: FormGroup;
  loading: boolean = false;

  constructor(
    private _productsService: ProductsService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _cartFacade: CartFacade,
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group(new DetailsProductSelected());
    this._route.params.subscribe((param) => this._getDataById(param['id']));
  }

  changeSelected = (value: Partial<DetailsProductSelected>) =>
    this.form.patchValue(Object.assign(this.form.value, value));

  getValue(name: string) {
    return getValueForm(name, this.form);
  }
  addCart() {
    this.loading = true;

    this._cartFacade
      .addItem(this.form.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe();
  }

  private _getDataById(id: number) {
    this.data$ = this._productsService
      .getProduct(id)
      .pipe(tap((res) => this.patchForm(res)));
  }

  private patchForm(value: IProducts) {
    this.form.patchValue({
      image: value.images[0],
      title: value.title,
      price: value.price,
      idProduct: value.id,
      color: value.colors[0],
      size: value.sizes[0],
      stock: value.stock,
    });
  }
}
