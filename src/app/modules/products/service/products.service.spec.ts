import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ProductsService } from './products.service';
import { ENUM_PRODUCTS_ORDERS } from '../enums/products.enum';
import { IProducts } from '../interfaces/products.interface';

const mock = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  images: [
    'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
  ],
  colors: [
    {
      name: 'Vermelho',
      value: '#ff0000',
    },
    {
      name: 'Preto',
      value: '#000000',
    },
    {
      name: 'Branco',
      value: '#ffffff',
    },
  ],
  sizes: [
    {
      value: 'P',
      name: 'Pequeno',
    },
    {
      value: 'M',
      name: 'Médio',
    },
    {
      value: 'G',
      name: 'Grande',
    },
  ],
  stock: 10,
  rating: {
    rate: 3.9,
    count: 120,
  },
};
describe('TodosApi', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of products', () => {
    service.getProducts().subscribe((products) => {
      expect(products).toBeInstanceOf(Array);
      expect(products).toBeGreaterThan(1);
    });

    const req = httpTestingController.expectOne(
      `${environment.url}/products?_sort=${ENUM_PRODUCTS_ORDERS.RATE}`,
    );
    expect(req.request.method).toEqual('GET');
  });

  it('should be return the product with id igual 1', () => {
    service.getProduct(1).subscribe((product) => {
      expect(product.id).toBe(1);
    });

    const req = httpTestingController.expectOne(
      `${environment.url}/products/1`,
    );

    expect(req.request.method).toEqual('GET');
    req.flush(mock);
  });
});
