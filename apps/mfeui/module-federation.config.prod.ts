import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfeui',
  /**
   * Production configuration for GitHub Pages
   * Remotes are loaded from the deployed GitHub Pages URLs
   *
   * Nx automatically shares all npm packages and workspace libraries as singletons by default
   * No need for explicit shared configuration
   */
  remotes: [
    [
      'products',
      'https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs',
    ],
    ['cart', 'https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs'],
    [
      'profile',
      'https://hemantajax.github.io/mfedemos/profile/remoteEntry.mjs',
    ],
    ['orders', 'https://hemantajax.github.io/mfedemos/orders/remoteEntry.mjs'],
    [
      'analytics',
      'https://hemantajax.github.io/mfedemos/analytics/remoteEntry.mjs',
    ],
    [
      'notifications',
      'https://hemantajax.github.io/mfedemos/notifications/remoteEntry.mjs',
    ],
    [
      'messages',
      'https://hemantajax.github.io/mfedemos/messages/remoteEntry.mjs',
    ],
  ],
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
