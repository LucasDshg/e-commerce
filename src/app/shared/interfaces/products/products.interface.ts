import {
  ENUM_PRODUCTS_COLORS,
  ENUM_PRODUCTS_SIZES,
} from '@shared/enums/products/products.enum';

export interface IProductsColors {
  name: string;
  value: ENUM_PRODUCTS_COLORS;
}

export interface IProductsSizes {
  name: string;
  value: ENUM_PRODUCTS_SIZES;
}
