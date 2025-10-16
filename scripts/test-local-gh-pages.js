#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Testing GitHub Pages build locally...\n');
console.log('This will simulate the GitHub Pages directory structure.\n');

try {
  // Run the build script
  execSync('npm run build:gh-pages', { stdio: 'inherit' });

  console.log('\n✅ Build successful!\n');
  console.log('📁 Built files are in: dist/gh-pages/\n');
  console.log('To test locally, you can use a simple HTTP server:');
  console.log('  npx http-server dist/gh-pages -p 8080 -c-1\n');
  console.log('Then open: http://localhost:8080/mfedemos/\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
