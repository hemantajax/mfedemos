import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'profile',
  exposes: {
    './Routes': 'profile/src/app/remote-entry/entry.routes.ts',
  },
  // Nx automatically shares all npm packages and workspace libraries as singletons by default
  // No need for explicit shared configuration
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
