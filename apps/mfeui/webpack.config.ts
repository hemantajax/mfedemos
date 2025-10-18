import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

/**
 * Development webpack configuration
 * Uses localhost URLs for remotes (defined in module-federation.config.ts)
 * For production, see webpack.prod.config.ts
 */
export default withModuleFederation(config, { dts: false });
