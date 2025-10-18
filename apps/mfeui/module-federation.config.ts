import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfeui',
  /**
   * For local development, Nx automatically resolves remotes to their dev server URLs
   * Based on the ports configured in project.json:
   * - products: http://localhost:4201
   * - cart: http://localhost:4202
   *
   * For production, use module-federation.config.prod.ts
   */
  remotes: ['products', 'cart', 'profile'],
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
