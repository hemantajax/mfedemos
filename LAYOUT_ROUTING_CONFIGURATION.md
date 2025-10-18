# Layout & Routing Configuration

## Overview

This document describes the layout and routing architecture implemented in the application, supporting both layout-based routes (with header) and full-page routes (without header).

## Architecture

### 1. Layout Structure

The application now uses a hierarchical routing structure with two main layout types:

#### Main Layout (with Header)

- **Component**: `MainLayoutComponent` (`apps/mfeui/src/app/layouts/main-layout/`)
- **Features**:
  - Includes the shared header component from `@nxmfe/shared/layout`
  - Provides a container for the main content area
  - Uses `router-outlet` to render child routes
  - Applies consistent padding and background styling

#### Full-Page Layout (no Header)

- Routes that render directly without any wrapper
- Used for authentication pages (login, register)
- Takes full viewport height for centered content

### 2. Route Configuration

The routes are organized in `apps/mfeui/src/app/app.routes.ts`:

```typescript
export const appRoutes: Route[] = [
  // Routes WITHOUT layout (full page)
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component')
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.component')
  },

  // Routes WITH layout (header + content)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'about', loadComponent: ... },
      { path: 'contact', loadComponent: ... },
      // Remote MFE Routes
      { path: 'cart', loadChildren: () => import('cart/Routes') },
      { path: 'products', loadChildren: () => import('products/Routes') },
      { path: '**', loadComponent: () => import('@nxmfe/shared/ui-components') }
    ]
  }
];
```

### 3. Components Created

#### Main Layout Component

- **Location**: `apps/mfeui/src/app/layouts/main-layout/`
- **Files**:
  - `main-layout.component.ts` - Component logic
  - `main-layout.component.html` - Template with header and router-outlet
  - `main-layout.component.scss` - Layout-specific styles

#### Login Component

- **Location**: `apps/mfeui/src/app/pages/auth/login/`
- **Features**:
  - Full-page centered login form
  - Bootstrap 5 styling with modern gradient background
  - Email and password validation
  - "Remember me" checkbox
  - Link to register page
  - Responsive design

#### Register Component

- **Location**: `apps/mfeui/src/app/pages/auth/register/`
- **Features**:
  - Full-page centered registration form
  - Bootstrap 5 styling with gradient background
  - Fields: Full Name, Email, Password, Confirm Password
  - Terms & Conditions checkbox
  - Link to login page
  - Form validation
  - Responsive design

### 4. Header Navigation

The shared header component (`libs/shared/layout/src/lib/header/`) now includes:

- **Dashboard** - Main dashboard view
- **Products** - Remote MFE (Module Federation)
- **Cart** - Remote MFE (Module Federation)
- **About** - About page
- **Contact** - Contact page

All navigation links include:

- Bootstrap Icons for visual clarity
- Active route highlighting with `routerLinkActive`
- Mobile-responsive menu with toggle functionality

## How It Works

### For Routes with Layout

1. User navigates to `/dashboard`, `/about`, `/cart`, etc.
2. Angular router loads `MainLayoutComponent` as the parent
3. `MainLayoutComponent` renders:
   - Header component at the top
   - Child route content in the main container
4. Child routes (including MFEs) render within the layout

### For Routes without Layout

1. User navigates to `/login` or `/register`
2. Angular router loads the component directly
3. Component renders full-page without header
4. Perfect for authentication flows

## Remote MFE Integration

The remote micro-frontends (Cart and Products) are seamlessly integrated:

- **Path**: `/cart` and `/products`
- **Loading**: Lazy loaded via Module Federation
- **Layout**: Rendered within `MainLayoutComponent` with header
- **Navigation**: Accessible from header menu

## Styling

- **Framework**: Bootstrap 5
- **Icons**: Bootstrap Icons 1.11.3 (CDN)
- **Approach**: Utility-first with Bootstrap classes
- **Custom Styles**: Minimal custom SCSS for gradients and transitions

### Key Bootstrap Classes Used

- `navbar`, `navbar-expand-lg`, `navbar-dark`, `bg-primary` - Header styling
- `container-fluid`, `py-4` - Content container
- `card`, `shadow-lg` - Form containers
- `input-group`, `form-control` - Form elements
- `btn`, `btn-primary` - Buttons
- `d-flex`, `align-items-center`, `justify-content-center` - Flexbox utilities
- `min-vh-100` - Full viewport height

## Benefits

### 1. Separation of Concerns

- Layout logic separate from page content
- Reusable layout components
- Easy to maintain and extend

### 2. Flexible Routing

- Support for both layout and full-page views
- Easy to add new routes to either category
- MFEs integrate seamlessly

### 3. Modern UX

- Consistent navigation across all pages
- Beautiful authentication pages
- Mobile-responsive design
- Smooth transitions and hover effects

### 4. Scalability

- Easy to add new layout types (e.g., admin layout, public layout)
- Can add route guards for authentication
- MFE routes work like regular routes

## Usage Examples

### Adding a New Page with Layout

```typescript
{
  path: '',
  component: MainLayoutComponent,
  children: [
    // Add your new route here
    {
      path: 'profile',
      loadComponent: () => import('./pages/profile/profile.component')
        .then(m => m.ProfileComponent)
    }
  ]
}
```

### Adding a New Full-Page Route

```typescript
// Add at the top level (outside MainLayoutComponent)
{
  path: 'forgot-password',
  loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component')
    .then(m => m.ForgotPasswordComponent)
}
```

### Adding a New MFE

```typescript
{
  path: '',
  component: MainLayoutComponent,
  children: [
    // Add your new MFE route
    {
      path: 'orders',
      loadChildren: () => import('orders/Routes').then(m => m.remoteRoutes)
    }
  ]
}
```

Then update the header to include the link:

```html
<li class="nav-item">
  <a class="nav-link" routerLink="/orders" routerLinkActive="active">
    <i class="bi bi-receipt me-1"></i>
    Orders
  </a>
</li>
```

## Future Enhancements

1. **Authentication Guards**: Add route guards to protect authenticated routes
2. **Multiple Layouts**: Create admin, public, and user layouts
3. **Breadcrumbs**: Add breadcrumb navigation in the layout
4. **Footer**: Add a footer component to the main layout
5. **User Menu**: Add user profile dropdown in header
6. **Theme Switcher**: Add dark/light theme toggle

## Testing

To test the implementation:

1. **Start the application**:

   ```bash
   npm start
   ```

2. **Test Routes with Layout**:

   - Navigate to `/dashboard` - Should show header + dashboard
   - Navigate to `/cart` - Should show header + cart MFE
   - Navigate to `/products` - Should show header + products MFE
   - Navigate to `/about` - Should show header + about page
   - Navigate to `/contact` - Should show header + contact page

3. **Test Routes without Layout**:

   - Navigate to `/login` - Should show full-page login (no header)
   - Navigate to `/register` - Should show full-page register (no header)

4. **Test Navigation**:
   - Click on header links - Should navigate properly
   - Test mobile menu toggle on small screens
   - Verify active route highlighting

## Conclusion

This layout configuration provides a solid foundation for building a scalable, maintainable Angular application with Module Federation. The separation of layout concerns, flexible routing structure, and modern UX patterns make it easy to extend and customize as the application grows.

