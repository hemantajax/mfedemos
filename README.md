# 🚀 Nx Monorepo - Micro-Frontend Architecture with Angular 18

A modern, scalable Angular 18 micro-frontend application built with Nx monorepo, Module Federation, Bootstrap 5, and **zoneless change detection** for optimal performance.

## 🚀 Quick Start

```bash
npm start
```

A **prominent banner** will automatically appear when ready:

```
╔═════════════════════════════════════════════════════════════════╗
║  ✅ ALL SERVICES READY!                                         ║
║  Open your browser: 👉  http://localhost:4200  👈              ║
╚═════════════════════════════════════════════════════════════════╝
```

**Then open**: `http://localhost:4200`

> 💡 **Pro Tip**: The smart wrapper script detects when all services are ready and displays a prominent banner with the correct port. No more confusion!

## 🌐 Live Demo

**🔗 [View Live Application](https://hemantajax.github.io/mfedemos/)**

> Deployed automatically to GitHub Pages via GitHub Actions

## 📚 Documentation

- **[QUICK_ACCESS.md](./QUICK_ACCESS.md)** - Quick reference for starting and accessing the app
- **[PORT_GUIDE.md](./PORT_GUIDE.md)** - Port configuration explained
- **[DEVREMOTES_GUIDE.md](./DEVREMOTES_GUIDE.md)** - How to add new remote MFEs
- **[LIBRARIES_ARCHITECTURE.md](./LIBRARIES_ARCHITECTURE.md)** - Shared libraries structure
- **[NPM_SCRIPTS_REFERENCE.md](./NPM_SCRIPTS_REFERENCE.md)** - All npm commands
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Complete documentation index

---

## ✨ Features

### 🎯 Modern Architecture

- ✅ **Angular 18** with standalone components
- ✅ **Micro-Frontend (Module Federation)** for independent deployments
- ✅ **Zoneless Change Detection** for better performance
- ✅ **Nx Monorepo** for scalability
- ✅ **Bootstrap 5** for responsive UI
- ✅ **TypeScript** for type safety
- ✅ **Lazy Loading** for optimized bundles
- ✅ **GitHub Pages** deployment with CI/CD

### 📦 Shared Libraries

- **Layout** - Eager-loaded layout components
- **UI Components** - Lazy-loaded page components
- **Services** - Shared business logic
- **Core** - Guards, interceptors, models
- **Pipes** - Custom transformation pipes
- **Directives** - Custom DOM directives
- **Constants** - Application constants
- **Utils** - Pure utility functions
- **Styles** - Shared SCSS with Bootstrap

### 🎨 Pages

- **Dashboard** - Main dashboard with stats and activities
- **About** - Company information and team
- **Contact** - Contact form and information
- **404** - Beautiful error page

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Development - Start all micro-frontends
npm run serve:all

# Or start individually:
npm run serve:host      # Host app (port 4200)
npm run serve:products  # Products remote (port 4201)
npm run serve:cart      # Cart remote (port 4202)
```

The application will be available at `http://localhost:4200`

### Production Build

```bash
# Build all applications
npm run build:all:prod

# Build for GitHub Pages
npm run build:gh-pages

# Deploy to GitHub Pages
npm run deploy
```

---

## 📚 Project Structure

```
nxmfe/
├── apps/
│   ├── mfeui/                    # Host application (Shell)
│   │   ├── module-federation.config.ts
│   │   └── src/app/
│   │       ├── pages/            # App-specific pages
│   │       │   ├── dashboard/
│   │       │   ├── about/
│   │       │   └── contact/
│   │       ├── app.ts
│   │       └── app.routes.ts
│   │
│   ├── products/                 # Products micro-frontend
│   │   ├── module-federation.config.ts
│   │   └── src/app/
│   │       └── remote-entry/
│   │
│   └── cart/                     # Cart micro-frontend
│       ├── module-federation.config.ts
│       └── src/app/
│           └── remote-entry/
│
├── libs/shared/                  # Shared libraries
│   ├── layout/                   # Eager-loaded layout components
│   ├── ui-components/            # Lazy-loaded UI components
│   ├── services/                 # Shared services
│   ├── core/                     # Guards, interceptors, models
│   ├── pipes/                    # Custom pipes
│   ├── directives/               # Custom directives
│   ├── constants/                # App constants
│   ├── utils/                    # Utility functions
│   └── styles/                   # Shared SCSS styles
│
└── docs/                         # Documentation
    ├── LIBRARIES_ARCHITECTURE.md
    ├── SHARED_LIBRARIES_README.md
    ├── ZONELESS_CONFIGURATION.md
    └── ZONELESS_MIGRATION_COMPLETE.md
```

---

## 📖 Documentation

### 🏗️ Architecture

- **[LIBRARIES_ARCHITECTURE.md](./LIBRARIES_ARCHITECTURE.md)** - Complete library architecture guide
- **[SHARED_LIBRARIES_README.md](./SHARED_LIBRARIES_README.md)** - Quick reference for using libraries
- **[mfe.md](./mfe.md)** - Micro-frontend architecture guide

### ⚡ Zoneless Configuration

- **[ZONELESS_CONFIGURATION.md](./ZONELESS_CONFIGURATION.md)** - Complete guide to zoneless mode
- **[ZONELESS_MIGRATION_COMPLETE.md](./ZONELESS_MIGRATION_COMPLETE.md)** - Migration summary

### 🚀 Deployment

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)** - Step-by-step GitHub Pages setup

### 🎨 Styles

- **[libs/shared/styles/INDEX.md](./libs/shared/styles/INDEX.md)** - Styles library documentation

---

## 🔧 Available Libraries

| Library           | Import Path                   | Purpose                      |
| ----------------- | ----------------------------- | ---------------------------- |
| **layout**        | `@nxmfe/shared/layout`        | Layout components (Header)   |
| **ui-components** | `@nxmfe/shared/ui-components` | Page components (NotFound)   |
| **services**      | `@nxmfe/shared/services`      | Shared services              |
| **core**          | `@nxmfe/shared/core`          | Guards, interceptors, models |
| **pipes**         | `@nxmfe/shared/pipes`         | Custom pipes                 |
| **directives**    | `@nxmfe/shared/directives`    | Custom directives            |
| **constants**     | `@nxmfe/shared/constants`     | App constants                |
| **utils**         | `@nxmfe/shared/utils`         | Utility functions            |
| **styles**        | `@nxmfe/shared/styles`        | SCSS styles                  |

---

## 💡 Usage Examples

### Import Components

```typescript
import { HeaderComponent } from '@nxmfe/shared/layout';
import { NotFoundComponent } from '@nxmfe/shared/ui-components';
```

### Use Services

```typescript
import { StorageService, NotificationService } from '@nxmfe/shared/services';

constructor(private storage: StorageService) {}

this.storage.setItem('user', userData);
```

### Use Utilities

```typescript
import { capitalize, formatDate, unique } from '@nxmfe/shared/utils';

const title = capitalize('hello world');
const formatted = formatDate(new Date());
```

### Use Pipes

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

---

## 🧪 Testing

```bash
# Run all tests
npx nx test mfeui

# Run tests for specific library
npx nx test services

# Run e2e tests
npx nx e2e mfeui-e2e
```

---

## 📦 Building

```bash
# Build application
npx nx build mfeui

# Build specific library
npx nx build ui-components

# Build all libraries
npx nx run-many --target=build --all
```

---

## 🎯 Key Technologies

- **Angular 18** - Modern web framework
- **Module Federation** - Micro-frontend architecture
- **Nx** - Monorepo build system
- **Bootstrap 5** - CSS framework
- **TypeScript** - Type-safe JavaScript
- **SCSS** - CSS preprocessor
- **Jest** - Unit testing
- **Playwright** - E2E testing
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Static site hosting

---

## ⚡ Performance Features

### Zoneless Change Detection

- No Zone.js dependency (~47KB reduction)
- More efficient change detection
- Better runtime performance

### Lazy Loading

- Route-based code splitting
- Smaller initial bundle size
- Faster first load

### Nx Caching

- Smart build caching
- Only rebuild what changed
- Faster CI/CD pipelines

---

## 🎨 UI Features

- **Responsive Design** - Mobile, tablet, desktop
- **Bootstrap 5** - Modern, clean UI
- **Bootstrap Icons** - 1,800+ icons
- **Sticky Header** - Always accessible navigation
- **Smooth Animations** - Professional transitions
- **Form Validation** - Real-time feedback

---

## 📝 Available Scripts

### Development

```bash
npm run start              # Start host application
npm run serve:all          # Start all micro-frontends
npm run serve:host         # Start host only
npm run serve:products     # Start products remote
npm run serve:cart         # Start cart remote
```

### Building

```bash
npm run build:all          # Build all applications
npm run build:all:prod     # Build all for production
npm run build:gh-pages     # Build for GitHub Pages
npm run build:host         # Build host only
npm run build:products     # Build products remote
npm run build:cart         # Build cart remote
```

### Deployment

```bash
npm run deploy             # Build and deploy to GitHub Pages
npm run test:gh-pages      # Test GitHub Pages build locally
```

### Testing

```bash
npm run test               # Run all tests
npm run test:mfeui         # Test host app
npm run test:products      # Test products remote
npm run test:cart          # Test cart remote
npm run test:all           # Test all apps
npm run e2e                # Run e2e tests
```

### Code Quality

```bash
npm run lint               # Lint all projects
npm run lint:fix           # Lint and fix issues
npm run format             # Format code
npm run format:check       # Check formatting
```

### Nx Commands

```bash
npx nx graph               # View dependency graph
npx nx affected:test       # Test affected projects
npx nx affected:build      # Build affected projects
```

---

## 🌟 Highlights

### ✅ Best Practices

- Standalone components
- Signals-based reactivity
- OnPush change detection ready
- Lazy loading for performance
- Clear library separation
- TypeScript strict mode

### ✅ Developer Experience

- Type-safe imports
- Auto-completion in IDE
- Clear documentation
- Consistent code style
- Fast builds with Nx

### ✅ Production Ready

- Optimized bundles
- Tree-shakeable libraries
- Performance monitoring
- Error handling
- SEO friendly

---

## 🚧 Roadmap

### Potential Future Additions

- [ ] Authentication & Authorization
- [ ] State Management (Signals/NgRx)
- [ ] Data Visualization (Charts)
- [ ] Real-time Updates (WebSockets)
- [ ] Internationalization (i18n)
- [ ] Theme Switcher (Dark/Light mode)
- [ ] Progressive Web App (PWA)
- [ ] Backend Integration (API)

---

## 📚 Learn More

- [Angular Documentation](https://angular.dev)
- [Nx Documentation](https://nx.dev)
- [Bootstrap Documentation](https://getbootstrap.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

---

## 🤝 Contributing

Contributions are welcome! Please read the architecture documentation before making changes.

1. Follow the library structure
2. Use TypeScript strict mode
3. Write unit tests
4. Update documentation
5. Follow code style

---

## 📄 License

This project is for demonstration purposes.

---

## 🎉 Summary

A modern, performant, and scalable Angular 18 dashboard application with:

- ⚡ **Zoneless change detection** for better performance
- 📦 **9 shared libraries** for code reuse
- 🎨 **Bootstrap 5** for beautiful UI
- 🔧 **Nx monorepo** for scalability
- ✅ **Production-ready** architecture

---

**Built with ❤️ using Angular 18, Nx, and Bootstrap 5**
