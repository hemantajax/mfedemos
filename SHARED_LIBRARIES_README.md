# Shared Libraries Quick Reference

## 🚀 Quick Start

### Import Paths

```typescript
// UI Components
import { HeaderComponent, NotFoundComponent } from '@nxmfe/shared/ui-components';

// Services
import { StorageService, NotificationService } from '@nxmfe/shared/services';

// Core (Guards, Interceptors, Models)
import { authGuard, authInterceptor, User } from '@nxmfe/shared/core';

// Pipes
import { TruncatePipe, TimeAgoPipe } from '@nxmfe/shared/pipes';

// Directives
import { ClickOutsideDirective } from '@nxmfe/shared/directives';

// Constants
import { APP_CONFIG, ROUTES } from '@nxmfe/shared/constants';

// Utils
import { capitalize, formatDate, unique } from '@nxmfe/shared/utils';
```

---

## 📁 Library Structure

```
libs/shared/
├── ui-components/     → Reusable UI components (HeaderComponent, NotFoundComponent)
├── services/         → Shared services (StorageService, NotificationService)
├── core/            → Guards, Interceptors, Models
├── pipes/           → Custom pipes (TruncatePipe, TimeAgoPipe, SafeHtmlPipe)
├── directives/      → Custom directives (ClickOutsideDirective, AutoFocusDirective)
├── constants/       → App constants and configurations
├── utils/           → Utility functions (string, date, array utils)
└── styles/          → Shared SCSS styles and Bootstrap config
```

---

## 💡 Common Use Cases

### 1. Using Header Component

```typescript
import { HeaderComponent } from '@nxmfe/shared/ui-components';

@Component({
  imports: [HeaderComponent],
  template: '<app-header></app-header>'
})
```

### 2. Local Storage

```typescript
import { StorageService } from '@nxmfe/shared/services';

constructor(private storage: StorageService) {}

this.storage.setItem('key', { data: 'value' });
const data = this.storage.getItem('key');
```

### 3. Protecting Routes

```typescript
import { authGuard } from '@nxmfe/shared/core';

const routes = [{ path: 'admin', component: AdminComponent, canActivate: [authGuard] }];
```

### 4. Using Pipes

```typescript
import { TruncatePipe, TimeAgoPipe } from '@nxmfe/shared/pipes';

@Component({
  imports: [TruncatePipe, TimeAgoPipe],
  template: `
    {{ longText | truncate:50 }}
    {{ date | timeAgo }}
  `
})
```

### 5. Using Directives

```typescript
import { ClickOutsideDirective } from '@nxmfe/shared/directives';

@Component({
  imports: [ClickOutsideDirective],
  template: '<div (clickOutside)="close()">Content</div>'
})
```

### 6. Using Utils

```typescript
import { capitalize, formatDate, unique } from '@nxmfe/shared/utils';

const title = capitalize('hello'); // "Hello"
const date = formatDate(new Date()); // "10/16/2025"
const arr = unique([1, 1, 2, 3, 3]); // [1, 2, 3]
```

---

## 📊 Available Utilities

### String Utils

- `capitalize()` - Capitalize first letter
- `toTitleCase()` - Convert to title case
- `truncate()` - Truncate with ellipsis
- `toKebabCase()` - Convert to kebab-case
- `toCamelCase()` - Convert to camelCase
- `stripHtmlTags()` - Remove HTML tags
- `isValidEmail()` - Validate email
- `generateRandomString()` - Generate random string

### Date Utils

- `formatDate()` - Format dates
- `getTimeAgo()` - Get "time ago" string
- `isToday()` - Check if date is today
- `addDays()` - Add days to date
- `daysDifference()` - Get difference in days

### Array Utils

- `unique()` - Remove duplicates
- `groupBy()` - Group by key
- `sortBy()` - Sort by key
- `chunk()` - Split into chunks
- `flatten()` - Flatten nested arrays
- `shuffle()` - Shuffle randomly
- `sum()` - Calculate sum
- `average()` - Calculate average

---

## 🎨 Components

### HeaderComponent

Sticky navigation header with responsive menu.

### NotFoundComponent

404 error page with helpful navigation.

---

## 🔧 Services

### StorageService

- `setItem(key, value)` - Store data
- `getItem(key)` - Retrieve data
- `removeItem(key)` - Remove data
- `clear()` - Clear all data
- `hasItem(key)` - Check if exists

### NotificationService

- `success(message)` - Show success
- `error(message)` - Show error
- `warning(message)` - Show warning
- `info(message)` - Show info
- `notification$` - Observable for notifications

---

## 🛡️ Core Features

### Guards

- `authGuard` - Route protection

### Interceptors

- `authInterceptor` - Add auth token to requests
- `httpErrorInterceptor` - Handle HTTP errors

### Models

- `User`, `UserRole`, `UserProfile` - User models
- `ApiResponse`, `PaginatedResponse` - API response models

---

## 📦 Constants

```typescript
APP_CONFIG.APP_NAME; // "Dashboard App"
ROUTES.DASHBOARD; // "/dashboard"
API_ENDPOINTS.BASE_URL; // "/api/v1"
PAGINATION.DEFAULT_PAGE_SIZE; // 10
VALIDATION.MIN_PASSWORD_LENGTH; // 8
DATE_FORMATS.SHORT_DATE; // "MM/dd/yyyy"
```

---

## 🔄 Pipes

- **TruncatePipe**: `{{ text | truncate:50 }}`
- **TimeAgoPipe**: `{{ date | timeAgo }}`
- **SafeHtmlPipe**: `{{ html | safeHtml }}`

---

## 📍 Directives

- **ClickOutsideDirective**: `(clickOutside)="handler()"`
- **AutoFocusDirective**: `appAutoFocus`
- **DebounceClickDirective**: `(debounceClick)="handler()"`

---

## 📚 Documentation

- **Full Architecture**: `LIBRARIES_ARCHITECTURE.md`
- **Styles Guide**: `libs/shared/styles/INDEX.md`
- **Quick Reference**: This file

---

## ✅ Benefits

1. ✅ **Code Reusability** - Share code across apps
2. ✅ **Type Safety** - Full TypeScript support
3. ✅ **Maintainability** - Single source of truth
4. ✅ **Testability** - Independent testing
5. ✅ **Scalability** - Easy to extend
6. ✅ **Build Optimization** - Nx caching

---

## 🏗️ Project Structure

```
nxmfe/
├── apps/
│   └── mfeui/                    # Main application
│       └── src/app/
│           ├── pages/            # App-specific pages
│           │   ├── dashboard/
│           │   ├── about/
│           │   └── contact/
│           ├── app.ts
│           └── app.routes.ts
├── libs/
│   └── shared/                   # Shared libraries
│       ├── ui-components/        # ← Components moved here
│       ├── services/
│       ├── core/
│       ├── pipes/
│       ├── directives/
│       ├── constants/
│       ├── utils/
│       └── styles/
└── docs/
    ├── LIBRARIES_ARCHITECTURE.md
    └── SHARED_LIBRARIES_README.md
```

---

**For detailed documentation, see `LIBRARIES_ARCHITECTURE.md`**
