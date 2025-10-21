# Nx Library Types: Publishable vs Non-Publishable

## 🎯 Overview

Nx supports different types of libraries depending on how you intend to use them. Understanding the difference between **publishable** and **non-publishable** libraries is crucial for organizing your code effectively.

---

## 📦 Non-Publishable Libraries (Default)

### What Are They?

Libraries designed for **internal use within your Nx workspace only**. They help organize code but are not meant to be distributed outside the monorepo.

### How to Create

```bash
# Default library (non-publishable)
npx nx g @nx/js:library my-lib

# Or explicitly specify
npx nx g @nx/js:library my-lib \
  --importPath=@myorg/my-lib
```

### Structure

```
libs/my-lib/
├── src/
│   ├── index.ts
│   └── lib/
│       └── my-lib.ts
├── project.json
├── tsconfig.json
├── tsconfig.lib.json
└── README.md
```

**Note**: No `package.json` or minimal one without publishing config.

### How They Work

**1. TypeScript Path Mappings** (in `tsconfig.base.json`):

```json
{
  "compilerOptions": {
    "paths": {
      "@myorg/my-lib": ["libs/my-lib/src/index.ts"]
    }
  }
}
```

**2. Direct Imports**:

```typescript
// Import directly via path mapping
import { MyFunction } from '@myorg/my-lib';
```

**3. No Build Required** (for development):

```bash
# Just run your app
npx nx serve my-app
# TypeScript resolves imports directly from source
```

### Characteristics

| Feature               | Details                             |
| --------------------- | ----------------------------------- |
| **Purpose**           | Code organization within monorepo   |
| **Distribution**      | ❌ Not publishable to npm           |
| **Import method**     | TypeScript path mappings            |
| **Build output**      | Optional (for optimization)         |
| **package.json**      | Minimal or none                     |
| **External use**      | ❌ Cannot be used outside workspace |
| **Development speed** | ⚡ Fast (no build step)             |

### Use Cases

✅ **Feature libraries**: Organize features within an app  
✅ **Utility libraries**: Share utils across apps in monorepo  
✅ **Domain libraries**: Business logic for specific domains  
✅ **UI component libraries**: Reusable components within workspace  
✅ **Data access libraries**: API clients and state management

### Example

```typescript
// libs/utils/src/index.ts
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// apps/my-app/src/app/app.component.ts
import { capitalize } from '@myorg/utils';

console.log(capitalize('hello')); // 'Hello'
```

---

## 🚀 Publishable Libraries

### What Are They?

Libraries designed to be **published to npm registry** and consumed by projects outside your workspace.

### How to Create

```bash
# Create publishable library
npx nx g @nx/js:library my-package \
  --publishable \
  --importPath=@myorg/my-package
```

### Structure

```
libs/my-package/
├── src/
│   ├── index.ts
│   └── lib/
│       └── my-package.ts
├── package.json          ← Full package.json with version, deps
├── project.json          ← Has build target with bundling
├── tsconfig.json
├── tsconfig.lib.json
└── README.md
```

### Key Files

**package.json**:

```json
{
  "name": "@myorg/my-package",
  "version": "1.0.0",
  "type": "commonjs",
  "main": "./src/index.js",
  "types": "./src/index.d.ts",
  "publishConfig": {
    "access": "public"
  },
  "peerDependencies": {
    "@angular/core": "^18.0.0"
  }
}
```

**project.json** (build target):

```json
{
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/libs/my-package",
        "main": "libs/my-package/src/index.ts",
        "tsConfig": "libs/my-package/tsconfig.lib.json",
        "assets": ["libs/my-package/*.md"]
      }
    }
  }
}
```

### Build Output

```bash
# Build the library
npx nx build my-package

# Creates dist/ folder
dist/libs/my-package/
├── index.js              ← Compiled JavaScript
├── index.d.ts            ← TypeScript definitions
├── lib/
│   └── my-package.js
├── package.json          ← Ready for npm publish
└── README.md
```

### Publishing

```bash
# Build first
npx nx build my-package

# Navigate to dist
cd dist/libs/my-package

# Publish to npm
npm publish

# Or to GitHub Packages
npm publish --registry=https://npm.pkg.github.com
```

### External Usage

```bash
# In another project (outside the workspace)
npm install @myorg/my-package

# Use it
import { MyFunction } from '@myorg/my-package';
```

### Characteristics

| Feature               | Details                  |
| --------------------- | ------------------------ |
| **Purpose**           | External distribution    |
| **Distribution**      | ✅ Published to npm      |
| **Import method**     | npm package              |
| **Build output**      | Required (bundled code)  |
| **package.json**      | ✅ Full package manifest |
| **External use**      | ✅ Can be used anywhere  |
| **Development speed** | Slower (needs build)     |

### Use Cases

✅ **Shared component libraries**: UI kits for multiple projects  
✅ **Utility libraries**: Reusable utilities across organizations  
✅ **SDK/API clients**: Client libraries for services  
✅ **Design systems**: Company-wide design system  
✅ **Tools and plugins**: Developer tools and frameworks

---

## 🔀 Buildable Libraries (Middle Ground)

### What Are They?

Non-publishable libraries with a **build step** for optimization without npm publishing capability.

### How to Create

```bash
npx nx g @nx/js:library my-lib \
  --buildable
```

### Characteristics

- ❌ Not publishable to npm
- ✅ Has build target for optimization
- ✅ Can be built independently
- ✅ Improves Nx caching and affected commands
- ✅ Faster CI/CD (builds in parallel)

### When to Use

- Large monorepo with many apps
- Want faster CI/CD pipelines
- Need independent library builds
- Don't need npm publishing

---

## 📊 Comparison Matrix

| Feature                | Non-Publishable       | Buildable               | Publishable           |
| ---------------------- | --------------------- | ----------------------- | --------------------- |
| **npm publish**        | ❌                    | ❌                      | ✅                    |
| **Build target**       | Optional              | ✅                      | ✅                    |
| **package.json**       | Minimal               | Minimal                 | Full                  |
| **External use**       | ❌                    | ❌                      | ✅                    |
| **Build output**       | None/optional         | dist/                   | dist/ (bundled)       |
| **Development speed**  | ⚡⚡⚡ Fast           | ⚡⚡ Medium             | ⚡ Slower             |
| **CI/CD optimization** | ✅                    | ✅✅                    | ✅✅                  |
| **Use case**           | Internal organization | Internal + optimization | External distribution |

---

## 🎯 Decision Guide

### Choose Non-Publishable When:

- ✅ Code stays within your workspace
- ✅ Want fastest development experience
- ✅ Organizing features/domains
- ✅ No need for external distribution

### Choose Buildable When:

- ✅ Large monorepo (10+ apps)
- ✅ Need faster CI/CD
- ✅ Want independent library builds
- ✅ Still internal only

### Choose Publishable When:

- ✅ Need to distribute to npm
- ✅ Sharing across multiple projects/repos
- ✅ Creating public packages
- ✅ Building reusable libraries

---

## 💡 Real-World Example: UIKit Approach

### Scenario

Build a shared UI kit for micro-frontend architecture where:

- Clean internal organization
- Single package for external consumption
- Published to npm for shell/remotes

### Solution

**Internal libraries** (non-publishable):

```bash
npx nx g @nx/js:library layout
npx nx g @nx/js:library services
npx nx g @nx/js:library utils
# ... etc (8 libraries)
```

**Meta-package** (publishable):

```bash
npx nx g @nx/js:library uikit \
  --publishable \
  --importPath=@myorg/uikit
```

**UIKit re-exports everything**:

```typescript
// libs/uikit/src/index.ts
export * from '@myorg/layout';
export * from '@myorg/services';
export * from '@myorg/utils';
// ... etc
```

### Benefits

✅ Clean internal organization (9 separate libraries)  
✅ Single package to publish (1 publishable library)  
✅ Simple for consumers (install one package)  
✅ Maintainable (change internal structure without breaking consumers)

---

## 🔄 Converting Between Types

### Non-Publishable → Publishable

1. Add `package.json` to library
2. Update `project.json` with proper build target
3. Configure `publishConfig` in package.json
4. Build and test

### Publishable → Non-Publishable

1. Remove publishing config from `package.json`
2. Simplify build target in `project.json`
3. Update consumers to use path mappings

---

## 🧪 Testing Locally

### Testing Publishable Libraries

```bash
# Build the library
npx nx build my-package

# Link locally
cd dist/libs/my-package
npm link

# In consuming project
npm link @myorg/my-package

# Test it works
import { Something } from '@myorg/my-package';
```

### Testing Non-Publishable Libraries

```bash
# Just import and use
import { Something } from '@myorg/my-lib';

# Nx resolves via tsconfig.base.json paths
```

---

## 📚 Further Reading

- [Nx Library Types Documentation](https://nx.dev/concepts/more-concepts/library-types)
- [Publishing Nx Libraries](https://nx.dev/recipes/angular/publish-angular-libraries)
- [UIKit Approach Guide](./POLYREPO_UIKIT_APPROACH.md)

---

## 🎉 Summary

| Library Type        | Purpose                 | External Use | Build    | Best For              |
| ------------------- | ----------------------- | ------------ | -------- | --------------------- |
| **Non-Publishable** | Internal organization   | ❌           | Optional | Monorepo code sharing |
| **Buildable**       | Internal + optimization | ❌           | ✅       | Large monorepos       |
| **Publishable**     | External distribution   | ✅           | ✅       | npm packages          |

Choose the right type based on your needs! For polyrepo MFE, use a combination:

- Internal libraries: **Non-publishable** (clean organization)
- Meta-package: **Publishable** (single npm package)

---

**Last Updated**: October 21, 2025
