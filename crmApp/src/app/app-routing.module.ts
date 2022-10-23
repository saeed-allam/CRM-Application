import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './core/theme/full-layout/full-layout.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
  },
  {
      path: '',
      component: FullLayoutComponent,
      data: {
          title: 'home',
      },
      children: [
          {
              path: 'dashboard',
              loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
          },
          {
              path: 'customer',
              loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
          },
          {
              path: 'product',
              loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
          },
          {
              path: 'order',
              loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
          },
      ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
