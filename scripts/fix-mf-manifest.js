#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const GITHUB_PAGES_URL = 'https://hemantajax.github.io/mfedemos/';

/**
 * Port to remote name mapping
 */
const PORT_MAPPING = {
  4201: 'products',
  4202: 'cart',
  4203: 'profile',
  4204: 'orders',
  4205: 'analytics',
  4206: 'notifications',
  4207: 'messages',
  4208: 'admin',
};

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
      for (const [port, remoteName] of Object.entries(PORT_MAPPING)) {
        if (originalUrl.includes(`localhost:${port}`)) {
          remote.federationContainerName = `${GITHUB_PAGES_URL}${remoteName}/remoteEntry.mjs`;
          console.log(
            `✅ Fixed ${remoteName} remote (port ${port}): ${originalUrl} -> ${remote.federationContainerName}`
          );
          break;
        }
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
