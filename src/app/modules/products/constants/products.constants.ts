import { ENUM_PRODUCTS_ORDERS } from '../enums/products.enum';

export const ORDER_BY_PRODUCTS = [
  { id: ENUM_PRODUCTS_ORDERS.LOWEST_PRICE, name: 'Menores Preços' },
  { id: ENUM_PRODUCTS_ORDERS.HIGHEST_PRICE, name: 'Maiores Preços' },
  { id: ENUM_PRODUCTS_ORDERS.RATE, name: 'Mais Avalidos' },
];

export const OrderByProductsDic = new Map();
ORDER_BY_PRODUCTS.forEach((item) => OrderByProductsDic.set(item.id, item.name));
