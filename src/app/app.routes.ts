import { Routes } from '@angular/router';

// export const routes: Routes = [
//   {
//     path: '',
//     // loadComponent: () => import('./features/layout/layout.routes'),
//     loadChildren: () => import('./features/layout/layout.routes').then((m) => m.routes),
//   },
// ];

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component'),
  },
  {
    path: 'pending-products',
    loadComponent: () =>
      import('./features/pending-products/pending-products.component'),
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component'),
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', redirectTo: 'dashboard' },
];
