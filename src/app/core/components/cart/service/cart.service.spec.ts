import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { CartService } from './cart.service';
import {
  ENUM_PRODUCTS_COLORS,
  ENUM_PRODUCTS_SIZES,
} from '@shared/enums/products/products.enum';
import { ICart } from '../interface/cart.interface';

let mock: ICart = {
  idProduct: 19,
  title: "Opna Women's Short Sleeve Moisture",
  price: 7.95,
  image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
  color: {
    name: 'Vermelho',
    value: ENUM_PRODUCTS_COLORS.BLACK,
  },
  size: {
    value: ENUM_PRODUCTS_SIZES.LARGE,
    name: 'Pequeno',
  },
  quant: 1,
  stock: 10,
  id: 22,
};

describe('CartService', () => {
  let service: CartService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CartService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all items in cart', () => {
    service.getItems().subscribe((items) => {
      expect(items).toBeInstanceOf(Array);
      expect(items).toBeGreaterThan(1);
    });

    const req = httpTestingController.expectOne(`${environment.url}/cart`);
    expect(req.request.method).toEqual('GET');
  });

  it('should return item with quant updated to 3', () => {
    mock.quant = 3;
    service.updateItem(mock.id!, mock).subscribe((res) => {
      expect(res.quant).toEqual(3);
    });

    const req = httpTestingController.expectOne(
      `${environment.url}/cart/${mock.id}`,
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(mock);
  });

  it('should return item removed from list', () => {
    service.removeItem(mock.id!).subscribe((res) => {
      expect(res).toBeUndefined();
    });

    const req = httpTestingController.expectOne(
      `${environment.url}/cart/${mock.id}`,
    );
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toBeNull();
  });

  it('should be add item cart', () => {
    service.addItem(mock).subscribe((item) => {
      expect(item.title).toEqual(mock.title);
    });

    const req = httpTestingController.expectOne(`${environment.url}/cart`);
    expect(req.request.method).toEqual('POST');
    req.flush(mock);
  });
});
