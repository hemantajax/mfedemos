import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfeui',
  /**
   * Production configuration for GitHub Pages
   * Remotes are loaded from the deployed GitHub Pages URLs
   */
  remotes: [
    [
      'products',
      'https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs',
    ],
    ['cart', 'https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs'],
  ],
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
