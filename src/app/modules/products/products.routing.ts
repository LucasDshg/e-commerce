import { Routes } from '@angular/router';
import { ProducstComponent } from './products.component';
import { DetailsProductComponent } from './details-product/details-product.component';

export const ProductsRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Produtos',
    },
    children: [
      {
        path: '',
        component: ProducstComponent,
        data: {
          breadcrumb: null,
        },
      },
      {
        path: 'details/:id',
        component: DetailsProductComponent,
        data: {
          breadcrumb: 'Detalhes',
        },
      },
    ]
  },
 
];
