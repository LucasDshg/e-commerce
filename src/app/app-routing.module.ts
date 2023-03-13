import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@core/guards/auth-guard.service';
import { LayoutComponent } from '@core/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (l) => l.ProductsModule,
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./core/auth/login/login.module').then((l) => l.LoginModule),
    data: { title: 'Login' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
