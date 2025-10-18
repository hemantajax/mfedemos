import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

/**
 * For production GitHub Pages deployment, override remotes with GitHub Pages URLs
 * For local development, use the default localhost URLs from module-federation.config
 */
const mfConfig = {
  ...config,
  remotes: [
    [
      'products',
      'https://hemantajax.github.io/mfedemos/products/remoteEntry.mjs',
    ],
    ['cart', 'https://hemantajax.github.io/mfedemos/cart/remoteEntry.mjs'],
  ],
};

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default withModuleFederation(mfConfig, { dts: false });
