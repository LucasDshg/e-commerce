import { IProductSelected } from '@modules/products/interfaces/products.interface';
import {
  IProductsColors,
  IProductsSizes,
} from '@shared/interfaces/products/products.interface';

export class DetailsProductSelected implements IProductSelected {
  constructor(init?: Partial<IProductSelected>) {
    if (init) Object.assign(this, init);
  }

  idProduct: number | undefined = undefined;
  title: string | undefined = undefined;
  price: number | undefined = undefined;
  image: string | undefined = undefined;
  color: IProductsColors | undefined = undefined;
  size: IProductsSizes | undefined = undefined;
  quant: number = 1;
  stock: number | undefined = undefined;
}
