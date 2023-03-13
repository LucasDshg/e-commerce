import { IRating } from '@shared/components/rating/interfaces/rating.interface';
import {
  IProductsColors,
  IProductsSizes,
} from '@shared/interfaces/products/products.interface';

export interface IProductSelected {
  color: IProductsColors | undefined;
  size: IProductsSizes | undefined;
  quant: number | undefined;
  stock: number | undefined;
}

export interface IProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating: IRating;
  colors: IProductsColors[];
  sizes: IProductsSizes[];
  stock: number;
}
