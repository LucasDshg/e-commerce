import { Component, OnInit } from '@angular/core';
import { ProductsService } from './service/products.service';
import { Observable } from 'rxjs';
import { IProducts } from './interfaces/products.interface';
import { ENUM_PRODUCTS_ORDERS } from './enums/products.enum';
import {
  ORDER_BY_PRODUCTS,
  OrderByProductsDic,
} from './constants/products.constants';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProducstComponent implements OnInit {
  data$!: Observable<IProducts[] | undefined>;
  orderBy: ENUM_PRODUCTS_ORDERS = ENUM_PRODUCTS_ORDERS.RATE;
  orderByList = ORDER_BY_PRODUCTS;
  orderByListDic = OrderByProductsDic;

  get nameOrderBy() {
    return this.orderByListDic.get(this.orderBy);
  }

  constructor(
    private _productsService: ProductsService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._getData();
  }

  sortProducts(value: ENUM_PRODUCTS_ORDERS) {
    this.orderBy = value;
    this._getData();
  }

  seeDetails(id: number) {
    this._router.navigate(['details', id], { relativeTo: this._route });
  }

  private _getData() {
    this.data$ = this._productsService.getProducts(this.orderBy);
  }
}
