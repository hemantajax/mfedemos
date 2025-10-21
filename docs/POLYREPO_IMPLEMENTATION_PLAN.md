# Polyrepo Implementation Plan - Step by Step

## 🎯 Goal

Create a polyrepo version of your existing monorepo MFE demo at https://github.com/hemantajax/mfedemos

---

## 📊 Overview

You will create **10 new repositories**:

1. **mfe-polyrepo-shared-libs** (npm packages)
2. **mfe-polyrepo-shell** (host application)
3. **mfe-polyrepo-products** (remote)
4. **mfe-polyrepo-cart** (remote)
5. **mfe-polyrepo-profile** (remote)
6. **mfe-polyrepo-orders** (remote)
7. **mfe-polyrepo-admin** (remote)
8. **mfe-polyrepo-analytics** (remote)
9. **mfe-polyrepo-notifications** (remote)
10. **mfe-polyrepo-messages** (remote)

---

## ⏱️ Time Estimate

- **Phase 1** (Shared Libraries): 1 hour
- **Phase 2** (Shell): 30 minutes
- **Phase 3** (Remotes): 2 hours (15 min each × 8)
- **Phase 4** (Testing & Polish): 1 hour

**Total: ~4.5 hours**

---

## 📝 Prerequisites

### Required Tools

```bash
# Node.js 20+
node --version  # Should be v20.x or higher

# Nx CLI
npm install -g @nx/cli

# GitHub CLI (optional but recommended)
brew install gh
gh auth login

# Or manually create repos via GitHub UI
```

### Required Accounts

- GitHub account (you already have: hemantajax)
- GitHub Personal Access Token with `read:packages` and `write:packages` scopes

---

## 🚀 Phase 1: Shared Libraries (1 hour)

### Step 1.1: Create Repository (10 min)

```bash
# Navigate to your projects directory
cd ~/Documents
mkdir polyrepo-mfe && cd polyrepo-mfe

# Create shared libraries repo
mkdir mfe-polyrepo-shared-libs
cd mfe-polyrepo-shared-libs

# Initialize Nx workspace
npx create-nx-workspace@latest . \
  --preset=ts \
  --name=mfe-shared \
  --nxCloud=skip \
  --packageManager=npm
```

### Step 1.2: Generate Libraries (10 min)

```bash
# Install Angular plugin
npm install -D @nx/angular

# Generate all 9 libraries
npx nx g @nx/js:library layout --publishable --importPath=@hemantajax/mfe-layout
npx nx g @nx/js:library ui-components --publishable --importPath=@hemantajax/mfe-ui-components
npx nx g @nx/js:library services --publishable --importPath=@hemantajax/mfe-services
npx nx g @nx/js:library core --publishable --importPath=@hemantajax/mfe-core
npx nx g @nx/js:library utils --publishable --importPath=@hemantajax/mfe-utils
npx nx g @nx/js:library pipes --publishable --importPath=@hemantajax/mfe-pipes
npx nx g @nx/js:library directives --publishable --importPath=@hemantajax/mfe-directives
npx nx g @nx/js:library constants --publishable --importPath=@hemantajax/mfe-constants
npx nx g @nx/js:library styles --publishable --importPath=@hemantajax/mfe-styles
```

### Step 1.3: Copy Code from Monorepo (20 min)

```bash
# Open both projects
# From: ~/Documents/nxmfe/libs/shared/*
# To: ~/Documents/polyrepo-mfe/mfe-polyrepo-shared-libs/libs/*

# Copy the content of each library
cp -r ~/Documents/nxmfe/libs/shared/layout/src/* ./libs/layout/src/
cp -r ~/Documents/nxmfe/libs/shared/ui-components/src/* ./libs/ui-components/src/
cp -r ~/Documents/nxmfe/libs/shared/services/src/* ./libs/services/src/
cp -r ~/Documents/nxmfe/libs/shared/core/src/* ./libs/core/src/
cp -r ~/Documents/nxmfe/libs/shared/utils/src/* ./libs/utils/src/
cp -r ~/Documents/nxmfe/libs/shared/pipes/src/* ./libs/pipes/src/
cp -r ~/Documents/nxmfe/libs/shared/directives/src/* ./libs/directives/src/
cp -r ~/Documents/nxmfe/libs/shared/constants/src/* ./libs/constants/src/
cp -r ~/Documents/nxmfe/libs/shared/styles/src/* ./libs/styles/src/

# Update import paths in copied files
# Change @nxmfe/shared/* to @hemantajax/mfe-*
```

### Step 1.4: Configure GitHub Packages (10 min)

```bash
# Create .npmrc
cat > .npmrc << EOF
@hemantajax:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
EOF

# Update each library's package.json
# See POLYREPO_SCRIPTS.md for the template
```

### Step 1.5: Create GitHub Actions (5 min)

```bash
# Create workflow directory
mkdir -p .github/workflows

# Copy the publish.yml workflow from POLYREPO_SCRIPTS.md
# to .github/workflows/publish.yml
```

### Step 1.6: Push to GitHub (5 min)

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: Shared libraries for polyrepo MFE"

# Create GitHub repository
gh repo create mfe-polyrepo-shared-libs --public --source=. --remote=origin

# Push
git branch -M main
git push -u origin main
```

✅ **Phase 1 Complete!** GitHub Actions will now build and publish your packages.

---

## 🏠 Phase 2: Shell Application (30 min)

### Step 2.1: Create Shell Repository (10 min)

```bash
# Go back to polyrepo-mfe directory
cd ~/Documents/polyrepo-mfe

# Create shell repo
mkdir mfe-polyrepo-shell
cd mfe-polyrepo-shell

# Initialize Nx workspace
npx create-nx-workspace@latest . \
  --preset=apps \
  --name=shell \
  --nxCloud=skip \
  --packageManager=npm

# Add Angular
npm install -D @nx/angular

# Generate host application
npx nx g @nx/angular:host shell \
  --directory=apps/shell \
  --style=scss \
  --routing=true \
  --standaloneConfig=true
```

### Step 2.2: Install Shared Libraries (5 min)

```bash
# Configure npm
cat > .npmrc << EOF
@hemantajax:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
EOF

# Wait for shared libraries to be published (check GitHub Actions)
# Then install them
npm install @hemantajax/mfe-layout@latest
npm install @hemantajax/mfe-ui-components@latest
npm install @hemantajax/mfe-services@latest
npm install @hemantajax/mfe-core@latest
npm install @hemantajax/mfe-utils@latest
```

### Step 2.3: Copy Shell Code (10 min)

```bash
# Copy code from monorepo shell
cp -r ~/Documents/nxmfe/apps/mfeui/src/* ./apps/shell/src/

# Update imports from @nxmfe/shared/* to @hemantajax/mfe-*
```

### Step 2.4: Configure Module Federation (3 min)

```bash
# Copy module-federation.config.prod.ts from POLYREPO_SCRIPTS.md
# to apps/shell/module-federation.config.ts
```

### Step 2.5: Setup GitHub Actions & Push (2 min)

```bash
# Create workflow
mkdir -p .github/workflows

# Copy deploy.yml for shell from POLYREPO_SCRIPTS.md
# to .github/workflows/deploy.yml

# Push to GitHub
git init
git add .
git commit -m "Initial commit: Shell application"
gh repo create mfe-polyrepo-shell --public --source=. --remote=origin
git branch -M main
git push -u origin main
```

✅ **Phase 2 Complete!** Shell will deploy to GitHub Pages.

---

## 🔌 Phase 3: Remote Applications (2 hours)

### For Each Remote (15 min each)

Repeat these steps for:

- products
- cart
- profile
- orders
- admin
- analytics
- notifications
- messages

### Step 3.1: Create Remote Repository

```bash
# Example for products
cd ~/Documents/polyrepo-mfe
mkdir mfe-polyrepo-products
cd mfe-polyrepo-products

npx create-nx-workspace@latest . \
  --preset=apps \
  --name=products \
  --nxCloud=skip \
  --packageManager=npm

npm install -D @nx/angular

npx nx g @nx/angular:remote products \
  --directory=apps/products \
  --style=scss \
  --routing=true \
  --standaloneConfig=true
```

### Step 3.2: Install Shared Libraries

```bash
cat > .npmrc << EOF
@hemantajax:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
EOF

npm install @hemantajax/mfe-layout@latest
npm install @hemantajax/mfe-services@latest
npm install @hemantajax/mfe-core@latest
```

### Step 3.3: Copy Remote Code

```bash
# Copy from monorepo
cp -r ~/Documents/nxmfe/apps/products/src/* ./apps/products/src/

# Update imports
```

### Step 3.4: Configure Module Federation

```bash
# Update apps/products/module-federation.config.ts
# See POLYREPO_SCRIPTS.md for template
```

### Step 3.5: Setup GitHub Actions & Push

```bash
mkdir -p .github/workflows
# Copy deploy.yml for remotes from POLYREPO_SCRIPTS.md

git init
git add .
git commit -m "Initial commit: Products remote"
gh repo create mfe-polyrepo-products --public --source=. --remote=origin
git branch -M main
git push -u origin main
```

### Repeat for All Remotes

```bash
# Cart
cd ~/Documents/polyrepo-mfe
# Repeat steps 3.1-3.5 with "cart" instead of "products"

# Profile
# Repeat steps 3.1-3.5 with "profile"

# Orders
# Repeat steps 3.1-3.5 with "orders"

# Admin
# Repeat steps 3.1-3.5 with "admin"

# Analytics
# Repeat steps 3.1-3.5 with "analytics"

# Notifications
# Repeat steps 3.1-3.5 with "notifications"

# Messages
# Repeat steps 3.1-3.5 with "messages"
```

✅ **Phase 3 Complete!** All remotes will deploy to GitHub Pages.

---

## 🧪 Phase 4: Testing & Verification (1 hour)

### Step 4.1: Enable GitHub Pages

For each repository:

```bash
# Using GitHub CLI
gh repo edit hemantajax/mfe-polyrepo-shell --enable-pages --pages-source="gh-pages"
gh repo edit hemantajax/mfe-polyrepo-products --enable-pages --pages-source="gh-pages"
# ... etc for all repos

# OR manually via GitHub UI:
# Repo → Settings → Pages → Source: GitHub Actions
```

### Step 4.2: Wait for Deployments

```bash
# Check GitHub Actions status for all repos
gh run list --repo hemantajax/mfe-polyrepo-shell
gh run list --repo hemantajax/mfe-polyrepo-products
# etc.
```

### Step 4.3: Test the Application

```bash
# Visit the shell URL
open https://hemantajax.github.io/mfe-polyrepo-shell/

# Test navigation to each remote
# - Click Products → Should load from mfe-polyrepo-products repo
# - Click Cart → Should load from mfe-polyrepo-cart repo
# - etc.
```

### Step 4.4: Verify Cross-Origin Loading

```bash
# Open browser DevTools → Network tab
# Verify remoteEntry.js files are loaded from different origins:
# https://hemantajax.github.io/mfe-polyrepo-products/remoteEntry.js
# https://hemantajax.github.io/mfe-polyrepo-cart/remoteEntry.js
# etc.
```

✅ **Phase 4 Complete!** Your polyrepo MFE is live!

---

## 📊 Progress Checklist

### Shared Libraries

- [ ] Repository created
- [ ] Libraries generated
- [ ] Code copied from monorepo
- [ ] GitHub Packages configured
- [ ] GitHub Actions created
- [ ] Pushed to GitHub
- [ ] Packages published successfully

### Shell Application

- [ ] Repository created
- [ ] Host application generated
- [ ] Shared libraries installed
- [ ] Code copied from monorepo
- [ ] Module Federation configured
- [ ] GitHub Actions created
- [ ] Pushed to GitHub
- [ ] Deployed to GitHub Pages
- [ ] Accessible via URL

### Remote: Products

- [ ] Repository created
- [ ] Remote application generated
- [ ] Shared libraries installed
- [ ] Code copied
- [ ] Module Federation configured
- [ ] Pushed & deployed
- [ ] Accessible via URL
- [ ] Loads in shell

### Remote: Cart

- [ ] All steps completed
- [ ] Loads in shell

### Remote: Profile

- [ ] All steps completed
- [ ] Loads in shell

### Remote: Orders

- [ ] All steps completed
- [ ] Loads in shell

### Remote: Admin

- [ ] All steps completed
- [ ] Loads in shell

### Remote: Analytics

- [ ] All steps completed
- [ ] Loads in shell

### Remote: Notifications

- [ ] All steps completed
- [ ] Loads in shell

### Remote: Messages

- [ ] All steps completed
- [ ] Loads in shell

### Final Verification

- [ ] Shell loads successfully
- [ ] All remotes accessible independently
- [ ] All remotes load in shell
- [ ] Navigation works
- [ ] Shared services work
- [ ] UI looks correct
- [ ] No console errors

---

## 🚨 Common Issues & Solutions

### Issue 1: npm packages not found

```bash
# Solution: Wait for GitHub Actions to complete publishing
# Check: https://github.com/hemantajax/mfe-polyrepo-shared-libs/actions

# If published, ensure .npmrc is correct:
cat .npmrc
# Should show: @hemantajax:registry=https://npm.pkg.github.com

# Set GITHUB_TOKEN in your environment
export GITHUB_TOKEN=your_token_here
```

### Issue 2: Module Federation remotes not loading

```bash
# Solution: Check that remoteEntry.js is accessible
curl -I https://hemantajax.github.io/mfe-polyrepo-products/remoteEntry.js

# Should return 200 OK
# If 404, check GitHub Pages deployment status
```

### Issue 3: Import path errors

```bash
# Solution: Update all imports from @nxmfe/shared/* to @hemantajax/mfe-*
# Use find/replace:
find ./src -type f -name "*.ts" -exec sed -i '' 's/@nxmfe\/shared\/layout/@hemantajax\/mfe-layout/g' {} +
find ./src -type f -name "*.ts" -exec sed -i '' 's/@nxmfe\/shared\/services/@hemantajax\/mfe-services/g' {} +
# etc.
```

### Issue 4: CORS errors

```bash
# Solution: GitHub Pages handles CORS automatically
# If you see CORS errors, ensure:
# 1. remoteEntry.js is publicly accessible
# 2. GitHub Pages is enabled for all repos
# 3. Deployments completed successfully
```

---

## 📚 Reference Documents

- **Complete Guide**: [POLYREPO_MFE_GUIDE.md](./POLYREPO_MFE_GUIDE.md)
- **Quick Start**: [POLYREPO_QUICK_START.md](./POLYREPO_QUICK_START.md)
- **Scripts & Configs**: [POLYREPO_SCRIPTS.md](./POLYREPO_SCRIPTS.md)
- **Comparison**: [MONOREPO_VS_POLYREPO.md](./MONOREPO_VS_POLYREPO.md)

---

## 🎯 Success Criteria

Your polyrepo MFE is successful when:

✅ Shell loads at `https://hemantajax.github.io/mfe-polyrepo-shell/`  
✅ Each remote accessible independently  
✅ All remotes load within shell via Module Federation  
✅ Navigation works between all pages  
✅ Shared libraries work correctly  
✅ No console errors  
✅ UI matches monorepo version

---

## 🎉 Next Steps After Completion

1. **Update Portfolio**

   - Add polyrepo demo links to resume
   - Create comparison blog post
   - Share on LinkedIn

2. **Documentation**

   - Create README for each repo
   - Document architecture decisions
   - Create diagrams

3. **Enhancements**

   - Add CI/CD badges
   - Add tests
   - Add monitoring
   - Add performance metrics

4. **Blog/Article Ideas**
   - "Monorepo vs Polyrepo for Micro-Frontends"
   - "Building Enterprise MFE with Nx and Module Federation"
   - "Independent Deployments with Polyrepo MFE"

---

## 💡 Tips

1. **Work incrementally**: Don't try to create all repos at once
2. **Test after each step**: Verify each repo works before moving to next
3. **Use scripts**: Automate repetitive tasks
4. **Document issues**: Keep notes on problems and solutions
5. **Take screenshots**: Capture progress for portfolio/blog

---

**Good luck! 🚀**

Start with Phase 1 (Shared Libraries) and work through each phase systematically.
