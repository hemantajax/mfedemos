# Micro Frontend (MFE) Documentation

This directory contains comprehensive guides for setting up and working with Micro Frontend architecture using Angular, Nx, and Module Federation in a **polyrepo/standalone** setup.

## 📚 Core Guides

### 🏠 Host/Shell Application

**[HOST_SHELL_MFE_SETUP.md](./HOST_SHELL_MFE_SETUP.md)** - Complete guide for setting up a standalone shell/host application

- Initial setup and dependencies
- Project structure and configuration
- Module Federation setup (dev & production)
- Development workflow
- Production deployment options
- Best practices and troubleshooting

### 📦 Remote MFE Application

**[REMOTE_MFE_SETUP.md](./REMOTE_MFE_SETUP.md)** - Complete guide for creating a standalone remote micro-frontend

- Initial setup with Nx
- Module Federation configuration
- Remote entry routes
- Integration with UIKit
- Development and deployment
- Best practices and troubleshooting

### 🎨 Shared UIKit Package

**[POLYREPO_UIKIT_APPROACH.md](./POLYREPO_UIKIT_APPROACH.md)** - Recommended approach for sharing UI components

- Single package strategy
- Publishing to npm/GitHub Packages
- Version management
- Consuming in remote MFEs

## 📖 Additional Resources

### ⚡ Quick Reference

**[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference card with common commands and patterns

- Quick start commands
- Configuration templates
- Component patterns
- Troubleshooting quick fixes

### 📚 Nx Library Types

**[NX_LIBRARY_TYPES.md](./NX_LIBRARY_TYPES.md)** - Understanding Nx library types

- Publishable vs non-publishable libraries
- Buildable libraries
- When to use each type
- UIKit meta-package approach

## 🚀 Getting Started

### Recommended Setup Order

1. **Create Shell/Host Application** (30-60 minutes)

   - Follow [HOST_SHELL_MFE_SETUP.md](./HOST_SHELL_MFE_SETUP.md)
   - Set up standalone GitHub repository
   - Configure Module Federation
   - Deploy to hosting platform

2. **Create Shared UIKit Package** (1-2 hours)

   - Follow [POLYREPO_UIKIT_APPROACH.md](./POLYREPO_UIKIT_APPROACH.md)
   - Publish to npm or GitHub Packages
   - Version and manage dependencies

3. **Create Remote MFEs** (30-60 minutes each)
   - Follow [REMOTE_MFE_SETUP.md](./REMOTE_MFE_SETUP.md)
   - Each MFE in its own repository
   - Consume shared UIKit package
   - Deploy independently

### Quick Start (5 minutes)

```bash
# 1. Create workspace
mkdir mfe-host && cd mfe-host
npx create-nx-workspace@latest .

# When prompted, choose:
# - Preset: angular-monorepo
# - Application name: shell
# - Bundler: webpack

# 2. Add Module Federation
nx g @nx/angular:setup-mf shell --mfType=host --port=4200

# 3. Start development
nx serve shell
```

## 📂 Repository Structure Examples

### Shell/Host Repository

```
my-company-shell/
├── apps/
│   └── shell/
├── node_modules/
├── package.json
├── nx.json
└── README.md
```

### Shared UIKit Repository

```
my-company-uikit/
├── libs/
│   ├── ui-components/
│   ├── layout/
│   ├── services/
│   └── utils/
├── package.json
└── README.md
```

### Remote MFE Repository

```
my-company-products/
├── apps/
│   └── products/
├── node_modules/
├── package.json
├── nx.json
└── README.md
```

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────┐
│       Shell/Host Application            │
│     (Standalone Repository)             │
│                                         │
│  - Routing orchestration                │
│  - Layout/Header/Footer                 │
│  - Authentication                       │
│  - Loads remote MFEs                    │
└─────────────────────────────────────────┘
                  │
                  │ Module Federation
                  │
    ┌─────────────┼─────────────┬─────────────┐
    │             │             │             │
┌───▼────┐  ┌────▼───┐  ┌──────▼──┐  ┌──────▼──┐
│Products│  │  Cart  │  │ Profile │  │ Orders  │
│  MFE   │  │  MFE   │  │   MFE   │  │   MFE   │
└────┬───┘  └───┬────┘  └────┬────┘  └────┬────┘
     │          │            │            │
     └──────────┴────────────┴────────────┘
                  │
            ┌─────▼─────┐
            │  Shared   │
            │   UIKit   │
            │ (npm pkg) │
            └───────────┘
```

## 🔑 Key Concepts

### Module Federation

- Runtime sharing of code between applications
- Dynamic loading of remote MFEs
- Shared dependencies for optimal bundle size
- Version management and compatibility

### Shell/Host Application

- Container application that loads remote MFEs
- Manages routing and navigation
- Provides shared layout components
- Handles authentication and authorization

### Remote MFE

- Independent micro frontend application
- Exposes routes and components
- Can be developed and deployed independently
- Consumes shared UIKit for consistency

### Shared UIKit

- Common UI components and utilities
- Published as npm package
- Ensures consistency across MFEs
- Versioned and managed independently

## 🛠️ Technology Stack

- **Angular**: v20.3+ (with signals and zoneless)
- **Nx**: v21.6+ (workspace management)
- **Module Federation**: Enhanced v0.18+
- **TypeScript**: v5.9+
- **Bootstrap**: v5.3+ (UI framework)
- **RxJS**: v7.8+ (reactive programming)

## 📝 Additional Topics

For more advanced topics, see:

- **Shared Services**: [../SHARED_SERVICES_GUIDE.md](../SHARED_SERVICES_GUIDE.md) - Cross-MFE communication
- **Deployment**: See deployment sections in HOST and REMOTE guides
- **Testing**: E2E testing strategies (covered in individual guides)
- **Security**: Authentication and guards (covered in HOST guide)

## 🔗 Related Documentation

- [Main Documentation Index](../../DOCUMENTATION_INDEX.md)
- [Polyrepo Quick Start](../POLYREPO_QUICK_START.md)
- [Monorepo vs Polyrepo Comparison](../MONOREPO_VS_POLYREPO.md)
- [Shared Services Guide](../SHARED_SERVICES_GUIDE.md)

## 💡 Key Principles

1. **Standalone Repositories**: Each MFE has its own Git repository
2. **Independent Deployment**: Deploy MFEs separately without affecting others
3. **Shared UIKit**: Use a single npm package for common components
4. **Version Control**: Use semantic versioning for the UIKit package
5. **Module Federation**: Runtime integration without monorepo coupling

## 🆘 Need Help?

- **Troubleshooting**: Check the troubleshooting sections in each guide
- **Module Federation**: [module-federation.io](https://module-federation.io/)
- **Nx Documentation**: [nx.dev/recipes/module-federation](https://nx.dev/recipes/module-federation)
- **Angular**: [angular.dev](https://angular.dev/)

---

**Last Updated**: October 21, 2025  
**Version**: 1.0.0
