import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfeui',
  /**
   * For local development, Nx automatically resolves remotes to their dev server URLs
   * Based on the ports configured in project.json:
   * - products: http://localhost:4201
   * - cart: http://localhost:4202
   * - profile: http://localhost:4203
   * - orders: http://localhost:4204
   * - analytics: http://localhost:4205
   * - notifications: http://localhost:4206
   *
   * For production, use module-federation.config.prod.ts
   *
   * Nx automatically shares all npm packages and workspace libraries as singletons by default
   * No need for explicit shared configuration
   */
  remotes: [
    'products',
    'cart',
    'profile',
    'orders',
    'analytics',
    'notifications',
    'messages',
  ],
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
