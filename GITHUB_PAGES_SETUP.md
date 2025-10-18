# 🚀 GitHub Pages Setup Instructions

Follow these steps to enable GitHub Pages deployment for your Nx Micro-Frontend application.

## Prerequisites

✅ Repository is pushed to GitHub: `https://github.com/hemantajax/mfedemos.git`
✅ npm scripts are configured
✅ GitHub Actions workflow is in place

## Step-by-Step Setup

### 1. Enable GitHub Pages

1. **Go to your repository** on GitHub:

   - Navigate to: https://github.com/hemantajax/mfedemos

2. **Open Repository Settings**:

   - Click on the `⚙️ Settings` tab

3. **Navigate to Pages**:

   - In the left sidebar, click on `Pages`

4. **Configure Source**:

   - Under "Build and deployment"
   - Under "Source", select: **GitHub Actions**

   ![GitHub Pages Settings](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/select-source.webp)

### 2. Trigger First Deployment

**Option A: Push to main branch**

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

**Option B: Manually trigger workflow**

1. Go to the "Actions" tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the `main` branch
5. Click "Run workflow"

### 3. Monitor Deployment

1. **Go to Actions tab**:

   - Navigate to: https://github.com/hemantajax/mfedemos/actions

2. **Watch the deployment**:

   - You'll see a running workflow called "Deploy to GitHub Pages"
   - Click on it to see the progress
   - Typical deployment takes 2-5 minutes

3. **Check deployment status**:
   - ✅ Green checkmark = Successful deployment
   - ❌ Red X = Failed deployment (check logs)

### 4. Access Your Application

Once deployed, your application will be available at:

🌐 **https://hemantajax.github.io/mfedemos/**

Individual remotes are also accessible:

- **Products**: https://hemantajax.github.io/mfedemos/products/
- **Cart**: https://hemantajax.github.io/mfedemos/cart/

## Verification Checklist

After deployment, verify:

- [ ] Main application loads without errors
- [ ] Products remote loads correctly
- [ ] Cart remote loads correctly
- [ ] Navigation between sections works
- [ ] No console errors in browser DevTools
- [ ] All assets (images, styles) load correctly

## Expected Results

### Successful Deployment

When successful, you should see:

1. **In GitHub Actions**:

   ```
   ✅ Build all applications for production
   ✅ Setup Pages
   ✅ Upload artifact
   ✅ Deploy to GitHub Pages
   ```

2. **In Browser**:
   - Application loads at the GitHub Pages URL
   - No 404 errors
   - All micro-frontends load correctly

### Common Issues and Solutions

#### Issue 1: 404 Page Not Found

**Symptoms**: Opening the URL shows GitHub's 404 page

**Solutions**:

1. Wait 2-3 minutes (GitHub Pages can take time to propagate)
2. Clear browser cache
3. Check if GitHub Pages is enabled in Settings → Pages
4. Verify the deployment completed successfully in Actions tab

#### Issue 2: Blank White Page

**Symptoms**: Page loads but shows blank screen

**Solutions**:

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Look for module loading errors
4. Verify base href is correct: `/mfedemos/`

#### Issue 3: Remotes Not Loading

**Symptoms**: Main app loads but micro-frontends don't work

**Solutions**:

1. Check browser Console for network errors
2. Verify remote URLs are correct:
   - https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs
   - https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs
3. Check Network tab in DevTools for failed requests

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# 1. Build for GitHub Pages
npm run build:gh-pages

# 2. Deploy
npm run deploy
```

This will:

- Build all applications
- Create deployment structure
- Push to `gh-pages` branch
- Deploy to GitHub Pages

## Updating the Deployment

Every push to the `main` branch will automatically trigger a new deployment:

```bash
# Make changes to your code
git add .
git commit -m "Your changes"
git push origin main

# Deployment happens automatically via GitHub Actions
```

## Testing Before Deployment

Always test locally before pushing:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Test locally
npx http-server dist/gh-pages -p 8080 -c-1

# Open http://localhost:8080/mfedemos/
```

## Deployment Frequency

- **Automatic**: Every push to `main` branch
- **Manual**: Run `npm run deploy` anytime
- **Pull Requests**: Preview builds run automatically (no deployment)

## Security & Permissions

The deployment requires these GitHub permissions:

- ✅ `contents: read` - Already configured
- ✅ `pages: write` - Already configured
- ✅ `id-token: write` - Already configured

These are set in `.github/workflows/deploy.yml`.

## Next Steps

After successful deployment:

1. ✅ Share your application URL with team
2. ✅ Add URL to repository description
3. ✅ Update README.md with live demo link
4. ✅ Set up custom domain (optional)
5. ✅ Configure branch protection rules
6. ✅ Set up pull request previews

## Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file**:

   ```bash
   echo "your-domain.com" > dist/gh-pages/CNAME
   ```

2. **Update DNS records** at your domain registrar

3. **Configure in GitHub**:
   - Settings → Pages → Custom domain
   - Enter your domain
   - Save

## Support

For issues:

1. Check the deployment logs in GitHub Actions
2. Review the DEPLOYMENT.md file
3. Check browser console for errors
4. Verify all npm scripts run locally

## Quick Reference

| Command                  | Purpose                |
| ------------------------ | ---------------------- |
| `npm run build:gh-pages` | Build for GitHub Pages |
| `npm run test:gh-pages`  | Test build locally     |
| `npm run deploy`         | Manual deployment      |
| `npm run serve:all`      | Local development      |

---

**Status**: ✅ Ready for deployment

**URL**: https://hemantajax.github.io/mfedemos/

**Last Updated**: October 16, 2025


