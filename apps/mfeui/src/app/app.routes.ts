import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const appRoutes: Route[] = [
  // Routes WITHOUT layout (full page)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  // Routes WITH layout (header + content)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
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
      // Remote MFE Routes
      {
        path: 'cart',
        loadChildren: () => import('cart/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('products/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('profile/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'orders',
        loadChildren: () => import('orders/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'analytics',
        loadChildren: () =>
          import('analytics/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('notifications/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: '**',
        loadComponent: () =>
          import('@nxmfe/shared/ui-components').then(
            (m) => m.NotFoundComponent
          ), // Lazy loaded
      },
    ],
  },
];
