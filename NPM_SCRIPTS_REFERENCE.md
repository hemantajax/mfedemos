# 📋 npm Scripts Quick Reference

Complete reference for all available npm scripts in the project.

## 🚀 Development

### Start Applications

| Command                  | Description               | Port      |
| ------------------------ | ------------------------- | --------- |
| `npm start`              | Start host application    | 4200      |
| `npm run serve:host`     | Start host (mfeui)        | 4200      |
| `npm run serve:products` | Start products remote     | 4201      |
| `npm run serve:cart`     | Start cart remote         | 4202      |
| `npm run serve:all`      | Start all apps (parallel) | 4200-4202 |

**Most Common**: `npm run serve:all` - Starts everything you need!

## 📦 Building

### Development Builds

| Command                  | Description               |
| ------------------------ | ------------------------- |
| `npm run build`          | Build host app (dev)      |
| `npm run build:host`     | Build host app            |
| `npm run build:products` | Build products remote     |
| `npm run build:cart`     | Build cart remote         |
| `npm run build:all`      | Build all apps (parallel) |

### Production Builds

| Command                  | Description                 |
| ------------------------ | --------------------------- |
| `npm run build:prod`     | Build host (production)     |
| `npm run build:all:prod` | Build all apps (production) |
| `npm run build:gh-pages` | Build for GitHub Pages      |

**For Production**: Always use `npm run build:all:prod`

## 🌐 Deployment

### GitHub Pages

| Command                          | Description            | When to Use          |
| -------------------------------- | ---------------------- | -------------------- |
| `npm run build:gh-pages`         | Build for GitHub Pages | Before manual deploy |
| `npm run test:gh-pages`          | Test build locally     | Before deploying     |
| `npm run deploy`                 | Build + Deploy         | Manual deployment    |
| `npm run deploy:gh-pages:manual` | Deploy only            | If already built     |

**Recommended Flow**:

```bash
npm run test:gh-pages    # Test locally first
npm run deploy           # Deploy to GitHub Pages
```

## 🧪 Testing

### Unit Tests

| Command                 | Description          |
| ----------------------- | -------------------- |
| `npm test`              | Run all tests        |
| `npm run test:mfeui`    | Test host app        |
| `npm run test:products` | Test products remote |
| `npm run test:cart`     | Test cart remote     |
| `npm run test:all`      | Test all apps        |
| `npm run test:watch`    | Test with watch mode |
| `npm run test:coverage` | Test with coverage   |

### E2E Tests

| Command          | Description     |
| ---------------- | --------------- |
| `npm run e2e`    | Run E2E tests   |
| `npm run e2e:ui` | Run E2E with UI |

### Nx Affected Tests

| Command                  | Description                  |
| ------------------------ | ---------------------------- |
| `npm run affected:test`  | Test only affected projects  |
| `npm run affected:build` | Build only affected projects |
| `npm run affected:lint`  | Lint only affected projects  |

## 🔍 Code Quality

### Linting

| Command                 | Description            |
| ----------------------- | ---------------------- |
| `npm run lint`          | Lint all projects      |
| `npm run lint:mfeui`    | Lint host app          |
| `npm run lint:products` | Lint products remote   |
| `npm run lint:cart`     | Lint cart remote       |
| `npm run lint:fix`      | Lint + auto-fix issues |

### Formatting

| Command                | Description      |
| ---------------------- | ---------------- |
| `npm run format`       | Format all files |
| `npm run format:check` | Check formatting |

**Best Practice**: Run `npm run lint:fix` before committing

## 📊 Nx Tools

### Visualization & Analysis

| Command            | Description           |
| ------------------ | --------------------- |
| `npm run graph`    | View dependency graph |
| `npm run affected` | See affected projects |
| `npm run reset`    | Clear Nx cache        |

## 🎯 Common Workflows

### 1. Start Development

```bash
npm install           # First time only
npm run serve:all     # Start all apps
```

**Access**: http://localhost:4200

### 2. Deploy to GitHub Pages

```bash
npm run build:gh-pages    # Build for production
npm run test:gh-pages     # Optional: test locally
npm run deploy            # Deploy
```

**Or simply**: `npm run deploy` (runs build automatically)

### 3. Run Tests Before Commit

```bash
npm run test:all      # Run all tests
npm run lint:fix      # Fix linting issues
npm run format        # Format code
```

### 4. Build for Production

```bash
npm run build:all:prod    # Build everything
```

**Output**: `dist/apps/mfeui`, `dist/apps/products`, `dist/apps/cart`

### 5. Test Locally After Build

```bash
npm run build:gh-pages    # Build
npx http-server dist/gh-pages -p 8080 -c-1
```

**Open**: http://localhost:8080/mfedemos/

### 6. Check What Changed

```bash
npm run affected          # See what's affected
npm run affected:test     # Test only affected
npm run affected:build    # Build only affected
```

## 🔄 CI/CD Workflows

### GitHub Actions (Automatic)

These run automatically on GitHub:

1. **On Push to Main**:

   - Runs: `.github/workflows/deploy.yml`
   - Actions: Build → Test → Deploy to GitHub Pages

2. **On Pull Request**:
   - Runs: `.github/workflows/preview.yml`
   - Actions: Build → Test → Lint → Comment on PR

## 💡 Pro Tips

### Speed Up Development

```bash
# Only start what you're working on
npm run serve:host        # If only working on host
npm run serve:products    # If only working on products

# Use affected commands
npm run affected:test     # Only test what changed
npm run affected:build    # Only build what changed
```

### Before Committing

```bash
npm run lint:fix && npm run format && npm run test:all
```

### Clear Cache If Issues

```bash
npm run reset             # Clear Nx cache
rm -rf node_modules dist  # Nuclear option
npm install               # Reinstall
```

### View Project Graph

```bash
npm run graph             # Opens interactive graph
```

## 📱 Quick Command Cheatsheet

```bash
# Development
npm start                 # Quick start
npm run serve:all         # Start everything

# Building
npm run build:all:prod    # Production build
npm run build:gh-pages    # GitHub Pages build

# Deployment
npm run deploy            # Deploy to GitHub Pages

# Testing
npm test                  # Run tests
npm run e2e               # E2E tests

# Quality
npm run lint:fix          # Fix linting
npm run format            # Format code

# Nx Tools
npm run graph             # View graph
npm run affected          # See affected
```

## 🔑 Most Used Commands

### Daily Development

1. `npm run serve:all` - Start developing
2. `npm run test:all` - Run tests
3. `npm run lint:fix` - Fix issues

### Before Commit

1. `npm run lint:fix`
2. `npm run format`
3. `npm run test:all`

### Deployment

1. `npm run deploy` - Deploy everything

### Troubleshooting

1. `npm run reset` - Clear cache
2. `npm run graph` - Check dependencies
3. `npm run affected` - Check what changed

---

## 📚 Additional Resources

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) - Setup instructions
- [README.md](./README.md) - Project overview

---

**Tip**: Bookmark this file for quick reference! 🔖



