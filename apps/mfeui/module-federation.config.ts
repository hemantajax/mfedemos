import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfeui',
  /**
   * For production GitHub Pages deployment, use full URLs
   * For local development, change to: remotes: ['products', 'cart']
   */
  remotes: [
    [
      'products',
      'https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs',
    ],
    ['cart', 'https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs'],
  ],
  shared: {
    '@angular/core': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/common': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/router': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/platform-browser': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/platform-browser-dynamic': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/forms': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    rxjs: { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    tslib: { singleton: true },
    bootstrap: {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    },
    bootswatch: {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    },
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
