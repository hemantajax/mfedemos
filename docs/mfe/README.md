# Micro Frontend (MFE) Documentation

This directory contains comprehensive guides for setting up and working with Micro Frontend architecture using Angular, Nx, and Module Federation.

## 📚 Available Guides

### ⚡ Quick Reference

- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference card with commands, patterns, and snippets
  - Common commands
  - Configuration templates
  - Component patterns
  - Troubleshooting quick fixes

### 🏠 Host/Shell Application

- **[HOST_SHELL_MFE_SETUP.md](./HOST_SHELL_MFE_SETUP.md)** - Complete guide for setting up a standalone shell/host application
  - Initial setup and dependencies
  - Project structure
  - Module Federation configuration
  - Development workflow
  - Production deployment
  - Best practices and troubleshooting

### 🎨 Polyrepo UIKit Approach

- **[POLYREPO_UIKIT_APPROACH.md](./POLYREPO_UIKIT_APPROACH.md)** - Recommended approach for sharing UI components
  - Single package strategy
  - Publishing to npm
  - Version management
  - Dependency management

### 📖 General MFE Documentation

- **[mfe.md](./mfe.md)** - Module Federation architecture overview and concepts

### 📚 Library Types

- **[NX_LIBRARY_TYPES.md](./NX_LIBRARY_TYPES.md)** - Understanding Nx library types
  - Publishable libraries
  - Non-publishable libraries
  - When to use each type

## 🚀 Getting Started Workflow

### For Standalone Repositories

1. **Create Shell/Host Application** (5 minutes)

   ```bash
   # Create workspace
   mkdir mfe-host && cd mfe-host
   npx create-nx-workspace@latest .    # Interactive: choose angular-monorepo

   # Add Module Federation
   nx g @nx/angular:setup-mf shell --mfType=host
   ```

   - Follow [HOST_SHELL_MFE_SETUP.md](./HOST_SHELL_MFE_SETUP.md) for complete guide
   - Set up in its own GitHub repository
   - Deploy to your hosting platform

2. **Create Shared UIKit Package** _(Coming Soon)_

   - Will document remote MFE setup
   - Follow the UIKit approach from [POLYREPO_UIKIT_APPROACH.md](./POLYREPO_UIKIT_APPROACH.md)
   - Publish to npm or private registry
   - Version and distribute

3. **Create Remote MFEs** _(Documentation Coming Soon)_
   - Each MFE in its own repository
   - Consume shared UIKit package
   - Configure Module Federation
   - Deploy independently

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

## 📝 Coming Soon

- **Remote MFE Setup Guide** - Complete guide for creating remote micro frontends
- **Shared Services Guide** - Communication between MFEs
- **Deployment Strategies** - CI/CD pipelines for MFE architecture
- **Testing Strategies** - E2E and integration testing for MFEs
- **Performance Optimization** - Bundle size, lazy loading, caching
- **Security Best Practices** - Authentication, authorization, CORS

## 🔗 Related Documentation

- [Main Documentation Index](../../DOCUMENTATION_INDEX.md)
- [Polyrepo Quick Start](../POLYREPO_QUICK_START.md)
- [Monorepo vs Polyrepo Comparison](../MONOREPO_VS_POLYREPO.md)
- [Shared Services Guide](../SHARED_SERVICES_GUIDE.md)

## 💡 Tips

1. **Start with the Shell**: Always set up your shell/host application first
2. **Plan Your UIKit**: Design your shared component library early
3. **Independent Deployments**: Each MFE should be deployable independently
4. **Version Carefully**: Use semantic versioning for your UIKit package
5. **Document Everything**: Keep your team informed about architecture decisions

## 🆘 Getting Help

If you encounter issues:

1. Check the troubleshooting section in each guide
2. Review the [Module Federation documentation](https://module-federation.io/)
3. Consult the [Nx documentation](https://nx.dev/recipes/module-federation)
4. Check GitHub issues in the respective repositories

---

**Last Updated**: October 21, 2025  
**Maintained By**: MFE Team
