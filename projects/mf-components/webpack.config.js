const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "mfComponents",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },
        name: "mfComponents",
        // For remotes (please adjust)
        filename: "mfComponentsRemoteEntry.js",
        exposes: {
            // 'MfComponentButton': './projects/mf-components/src/app/button/button.component.ts',
            './MfFormBuilder': './projects/mf-components/src/app/shared/lib/dynamic-form-builder/dynamic-form-builder.component.ts',
            './MfBuilder': './projects/mf-components/src/app/shared/lib/dynamic-form-builder/shared-dynamic-form-builder/shared-dynamic-form-builder.component.ts'
        },        
        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/material": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "ngx-mask": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          rxjs: {
              singleton: true,
              strictVersion: true,
              requiredVersion: 'auto',
              includeSecondaries: true,
          },
          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
