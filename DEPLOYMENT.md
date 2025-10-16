# GitHub Pages Deployment Guide

This guide explains how to deploy your Nx Micro-Frontend application to GitHub Pages.

## 🏗️ Architecture Overview

The application consists of:

- **Host Application (mfeui)**: Main shell application at `/mfedemos/`
- **Products Remote**: Micro-frontend at `/mfedemos/products/`
- **Cart Remote**: Micro-frontend at `/mfedemos/cart/`

## 🚀 Deployment Methods

### Method 1: Automatic Deployment (GitHub Actions)

The repository is configured with GitHub Actions to automatically deploy to GitHub Pages on every push to the `main` branch.

**Setup Steps:**

1. **Enable GitHub Pages** in your repository:

   - Go to: `Settings` → `Pages`
   - Under "Source", select: **GitHub Actions**

2. **Push to main branch:**

   ```bash
   git push origin main
   ```

3. **Monitor deployment:**
   - Go to the "Actions" tab in your repository
   - Watch the deployment progress
   - Once complete, your app will be available at:
     **https://hemantajax.github.io/mfedemos/**

### Method 2: Manual Deployment

Deploy manually using npm scripts:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Deploy to GitHub Pages
npm run deploy
```

Or run both steps combined:

```bash
npm run deploy
```

## 🧪 Testing Locally

Before deploying, test the GitHub Pages build locally:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Serve locally
npx http-server dist/gh-pages -p 8080 -c-1
```

Then open: http://localhost:8080/mfedemos/

## 📦 Available npm Scripts

| Script                           | Description                               |
| -------------------------------- | ----------------------------------------- |
| `npm run build:gh-pages`         | Build all apps optimized for GitHub Pages |
| `npm run test:gh-pages`          | Test the GitHub Pages build locally       |
| `npm run deploy`                 | Build and deploy to GitHub Pages          |
| `npm run deploy:gh-pages:manual` | Deploy pre-built files to GitHub Pages    |

## 🔧 Configuration Details

### Base URLs

The deployment uses the following structure:

- **Base URL**: `/mfedemos/`
- **Products Remote**: `/mfedemos/products/remoteEntry.mjs`
- **Cart Remote**: `/mfedemos/cart/remoteEntry.mjs`

### Module Federation

The host application loads remotes dynamically using Module Federation:

```typescript
remotes: ['products', 'cart'];
```

In production (GitHub Pages), the remote URLs are:

```
https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs
https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs
```

## 📁 Deployment Structure

After build, the `dist/gh-pages/` directory contains:

```
dist/gh-pages/
├── index.html              # Host application entry
├── browser/                # Host application files
├── remoteEntry.mjs         # Host module federation entry
├── products/               # Products remote
│   ├── browser/
│   └── remoteEntry.mjs
├── cart/                   # Cart remote
│   ├── browser/
│   └── remoteEntry.mjs
├── remotes.json           # Remote configuration
└── .nojekyll              # Prevents Jekyll processing
```

## 🐛 Troubleshooting

### Issue: 404 errors on refresh

**Solution**: GitHub Pages doesn't support client-side routing out of the box. The application uses hash-based routing to handle this.

### Issue: Module Federation remotes not loading

**Check**:

1. Verify the remote URLs are correct in browser DevTools
2. Check CORS headers
3. Ensure all remotes are deployed to the correct paths

### Issue: Blank page after deployment

**Steps**:

1. Check browser console for errors
2. Verify the base href is correctly set to `/mfedemos/`
3. Ensure all assets are loading with the correct paths

## 🔐 Required Permissions

The GitHub Actions workflow requires the following permissions:

- `contents: read` - Read repository contents
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Required for GitHub Pages deployment

These are already configured in `.github/workflows/deploy.yml`.

## 📊 Monitoring Deployments

### GitHub Actions

1. Navigate to the "Actions" tab
2. View the "Deploy to GitHub Pages" workflow
3. Each deployment shows:
   - Build status
   - Deployment URL
   - Logs and artifacts

### Viewing Live Site

After successful deployment, visit:

- **Main App**: https://hemantajax.github.io/mfedemos/
- **Products**: https://hemantajax.github.io/mfedemos/products/
- **Cart**: https://hemantajax.github.io/mfedemos/cart/

## 🛠️ Customization

### Changing Repository Name

If you rename your repository, update the following:

1. **scripts/deploy-gh-pages.js**:

   ```javascript
   const REPO_NAME = 'your-new-repo-name';
   ```

2. Run the build again:
   ```bash
   npm run build:gh-pages
   ```

### Adding More Remotes

1. Create a new remote app in Nx
2. Add build configuration in `scripts/deploy-gh-pages.js`
3. Update module federation config in the host

## ✨ Features

- ✅ Automatic deployment on push to main
- ✅ Module Federation support
- ✅ Optimized production builds
- ✅ Base href handling for GitHub Pages
- ✅ Multiple micro-frontends
- ✅ Local testing capability
- ✅ Manual deployment option

## 📚 Resources

- [Nx Module Federation](https://nx.dev/recipes/module-federation)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Module Federation Documentation](https://module-federation.github.io/)

---

**Note**: First deployment may take a few minutes to become available. Subsequent deployments are typically faster.
