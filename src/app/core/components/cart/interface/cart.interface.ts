import {
  IProductsColors,
  IProductsSizes,
} from '@shared/interfaces/products/products.interface';

export interface ICart {
  id?: number;
  idProduct: number;
  title: string;
  price: number;
  image: string;
  color: IProductsColors;
  size: IProductsSizes;
  quant: number;
  stock: number;
  cep?: string;
}
