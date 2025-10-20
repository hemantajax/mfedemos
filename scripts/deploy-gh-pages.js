#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

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

// Build all Remote MFEs
const remotes = [
  'products',
  'cart',
  'profile',
  'orders',
  'analytics',
  'notifications',
  'messages',
  'admin',
];

console.log(`\n📦 Building ${remotes.length} remote applications...\n`);

remotes.forEach((remote, index) => {
  console.log(
    `\n[${index + 1}/${remotes.length}] 📦 Building ${remote} remote...`
  );
  execSync(
    `npx nx build ${remote} --configuration=production --skip-nx-cache --baseHref=${BASE_HREF}${remote}/ --deployUrl=${BASE_HREF}${remote}/`,
    { stdio: 'inherit' }
  );
});

// Build Host
console.log(
  `\n[${remotes.length + 1}/${
    remotes.length + 1
  }] 📦 Building Host application (mfeui)...`
);
execSync(
  `npx nx build mfeui --configuration=production --skip-nx-cache --baseHref=${BASE_HREF} --deployUrl=${BASE_HREF}`,
  { stdio: 'inherit' }
);

// Fix module federation manifest to use GitHub Pages URLs
console.log('\n🔧 Fixing module federation manifests...');
execSync('node scripts/fix-mf-manifest.js', { stdio: 'inherit' });

// Copy built files to gh-pages directory
console.log('\n📁 Organizing files for deployment...');

// Copy all remotes
remotes.forEach((remote) => {
  // Check both possible locations (dist/apps/REMOTE and dist/REMOTE)
  const appPath = `dist/apps/${remote}`;
  const rootPath = `dist/${remote}`;

  if (fs.existsSync(appPath)) {
    fs.cpSync(appPath, `dist/gh-pages/${remote}`, { recursive: true });
    console.log(`✅ ${remote} copied to dist/gh-pages/${remote}`);
  } else if (fs.existsSync(rootPath)) {
    fs.cpSync(rootPath, `dist/gh-pages/${remote}`, { recursive: true });
    console.log(`✅ ${remote} copied to dist/gh-pages/${remote}`);
  } else {
    console.warn(
      `⚠️  ${remote} build output not found in ${appPath} or ${rootPath}`
    );
  }
});

// Copy host
if (fs.existsSync('dist/apps/mfeui')) {
  fs.cpSync('dist/apps/mfeui', 'dist/gh-pages', { recursive: true });
  console.log('✅ Host copied to dist/gh-pages');
} else {
  console.error('❌ Host build output not found!');
}

// Create .nojekyll to prevent GitHub Pages from ignoring files starting with underscore
fs.writeFileSync('dist/gh-pages/.nojekyll', '');
console.log('✅ Created .nojekyll file');

// Create remotes configuration file
const remotesConfig = {};
remotes.forEach((remote) => {
  remotesConfig[remote] = `${GITHUB_PAGES_URL}${remote}/remoteEntry.mjs`;
});

const remotesConfigPath = 'dist/gh-pages/remotes.json';
fs.writeFileSync(remotesConfigPath, JSON.stringify(remotesConfig, null, 2));
console.log('✅ Created remotes.json configuration');

console.log('\n✨ Build complete! Files are ready in dist/gh-pages/');
console.log(`\n📍 Deployment structure:`);
console.log(`   - Host: ${GITHUB_PAGES_URL}`);
console.log(`   - Remotes:`);
remotes.forEach((remote) => {
  console.log(`     • ${remote}: ${GITHUB_PAGES_URL}${remote}/`);
});
console.log(`\n💡 To deploy manually, run: npm run deploy:gh-pages:manual`);
