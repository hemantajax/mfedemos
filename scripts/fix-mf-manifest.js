#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const GITHUB_PAGES_URL = 'https://hemantajax.github.io/mfedemos/';

/**
 * Fix mf-manifest.json to use GitHub Pages URLs for production deployment
 */
function fixManifest(manifestPath) {
  if (!fs.existsSync(manifestPath)) {
    console.log(`⚠️  Manifest not found: ${manifestPath}`);
    return;
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  if (manifest.remotes) {
    manifest.remotes = manifest.remotes.map((remote) => {
      const originalUrl = remote.federationContainerName;

      // Replace localhost URLs with GitHub Pages URLs
      if (originalUrl.includes('localhost:4201')) {
        remote.federationContainerName = `${GITHUB_PAGES_URL}products/remoteEntry.mjs`;
        console.log(
          `✅ Fixed products remote: ${originalUrl} -> ${remote.federationContainerName}`
        );
      } else if (originalUrl.includes('localhost:4202')) {
        remote.federationContainerName = `${GITHUB_PAGES_URL}cart/remoteEntry.mjs`;
        console.log(
          `✅ Fixed cart remote: ${originalUrl} -> ${remote.federationContainerName}`
        );
      } else if (originalUrl.includes('localhost:4203')) {
        remote.federationContainerName = `${GITHUB_PAGES_URL}profile/remoteEntry.mjs`;
        console.log(
          `✅ Fixed profile remote: ${originalUrl} -> ${remote.federationContainerName}`
        );
      }

      return remote;
    });

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`✅ Updated manifest: ${manifestPath}`);
  }
}

// Fix manifests in both locations
fixManifest(path.join(__dirname, '../dist/apps/mfeui/mf-manifest.json'));
fixManifest(path.join(__dirname, '../dist/gh-pages/mf-manifest.json'));

console.log('✅ Module Federation manifests fixed for GitHub Pages deployment');
