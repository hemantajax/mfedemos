import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  {
    path: 'cart',
    loadChildren: () => import('cart/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'products',
    loadChildren: () => import('products/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent, // Eager loaded
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent), // Lazy loaded
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ), // Lazy loaded
  },
  {
    path: '**',
    loadComponent: () =>
      import('@nxmfe/shared/ui-components').then((m) => m.NotFoundComponent), // Lazy loaded
  },
];
