#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_NAME = 'mfedemos';
const BASE_HREF = `/${REPO_NAME}/`;
const GITHUB_PAGES_URL = `https://hemantajax.github.io${BASE_HREF}`;

console.log('🚀 Building applications for GitHub Pages...\n');

// Clean previous build
console.log('📦 Cleaning previous build...');
if (fs.existsSync('dist/gh-pages')) {
  fs.rmSync('dist/gh-pages', { recursive: true, force: true });
}
fs.mkdirSync('dist/gh-pages', { recursive: true });

// Build Products Remote
console.log('\n📦 Building Products remote...');
execSync(
  `npx nx build products --configuration=production --skip-nx-cache --baseHref=${BASE_HREF}products/ --deployUrl=${BASE_HREF}products/`,
  { stdio: 'inherit' }
);

// Build Cart Remote
console.log('\n📦 Building Cart remote...');
execSync(
  `npx nx build cart --configuration=production --skip-nx-cache --baseHref=${BASE_HREF}cart/ --deployUrl=${BASE_HREF}cart/`,
  { stdio: 'inherit' }
);

// Build Profile Remote
console.log('\n📦 Building Profile remote...');
execSync(
  `npx nx build profile --configuration=production --skip-nx-cache --baseHref=${BASE_HREF}profile/ --deployUrl=${BASE_HREF}profile/`,
  { stdio: 'inherit' }
);

// Build Host
console.log('\n📦 Building Host application...');
execSync(
  `npx nx build mfeui --configuration=production --skip-nx-cache --baseHref=${BASE_HREF} --deployUrl=${BASE_HREF}`,
  { stdio: 'inherit' }
);

// Fix module federation manifest to use GitHub Pages URLs
console.log('\n🔧 Fixing module federation manifests...');
execSync('node scripts/fix-mf-manifest.js', { stdio: 'inherit' });

// Copy built files to gh-pages directory
console.log('\n📁 Organizing files for deployment...');

// Copy remotes
if (fs.existsSync('dist/apps/products')) {
  fs.cpSync('dist/apps/products', 'dist/gh-pages/products', {
    recursive: true,
  });
  console.log('✅ Products copied to dist/gh-pages/products');
}

if (fs.existsSync('dist/apps/cart')) {
  fs.cpSync('dist/apps/cart', 'dist/gh-pages/cart', { recursive: true });
  console.log('✅ Cart copied to dist/gh-pages/cart');
}

if (fs.existsSync('dist/profile')) {
  fs.cpSync('dist/profile', 'dist/gh-pages/profile', { recursive: true });
  console.log('✅ Profile copied to dist/gh-pages/profile');
}

// Copy host
if (fs.existsSync('dist/apps/mfeui')) {
  fs.cpSync('dist/apps/mfeui', 'dist/gh-pages', { recursive: true });
  console.log('✅ Host copied to dist/gh-pages');
}

// Create a simple index redirect for better UX
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MFE Demo - Redirecting...</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .container {
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
    }
  </style>
  <script>
    // Redirect to the main application
    window.location.href = '${BASE_HREF}';
  </script>
</head>
<body>
  <div class="container">
    <h1>🚀 MFE Demo</h1>
    <p>Redirecting to application...</p>
  </div>
</body>
</html>
`;

// Create .nojekyll to prevent GitHub Pages from ignoring files starting with underscore
fs.writeFileSync('dist/gh-pages/.nojekyll', '');
console.log('✅ Created .nojekyll file');

// Create remotes configuration file
const remotesConfig = {
  products: `${GITHUB_PAGES_URL}products/remoteEntry.mjs`,
  cart: `${GITHUB_PAGES_URL}cart/remoteEntry.mjs`,
  profile: `${GITHUB_PAGES_URL}profile/remoteEntry.mjs`,
};

const remotesConfigPath = 'dist/gh-pages/remotes.json';
fs.writeFileSync(remotesConfigPath, JSON.stringify(remotesConfig, null, 2));
console.log('✅ Created remotes.json configuration');

console.log('\n✨ Build complete! Files are ready in dist/gh-pages/');
console.log(`\n📍 Deployment structure:`);
console.log(`   - Host:     ${GITHUB_PAGES_URL}`);
console.log(`   - Products: ${GITHUB_PAGES_URL}products/`);
console.log(`   - Cart:     ${GITHUB_PAGES_URL}cart/`);
console.log(`   - Profile:  ${GITHUB_PAGES_URL}profile/`);
console.log(`\n💡 To deploy manually, run: npm run deploy:gh-pages:manual`);
