import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config.prod';

/**
 * Production webpack configuration for GitHub Pages deployment
 * Uses full GitHub Pages URLs for remotes (defined in module-federation.config.prod.ts)
 * For local development, see webpack.config.ts
 *
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default withModuleFederation(config, { dts: false });
