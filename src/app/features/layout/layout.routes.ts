import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'dashboard',
      loadComponent: () => import('../dashboard/dashboard.component'),
    },
    {
        path: 'pending-products',
        loadComponent: () => import('../pending-products/pending-products.component'),
      },
      {
        path: 'products',
        loadComponent: () => import('../products/products.component'),
      },
    { path: '**', redirectTo: 'dashboard' },
  ];