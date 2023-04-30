// const path = require('path');
// const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  poweredByHeader: false,
    serverRuntimeConfig: { // Will only be available on the server side
        mySecret: 'secret'
    },
    publicRuntimeConfig: { // Will be available on both server and client
        myFolder: '/home'
    },
    // webpack5: true,
    // webpack(config) {
    //     config.resolve.fallback = { fs: false };
    //     config.plugins.push(new WebpackAssetsManifest({
    //         output: '../public/asset-manifest.json',
    //         transform: assets => {
    //             const entrypoints = [];
    //             for (let file in assets) {
    //                 if (assets[file].endsWith('.js') || assets[file].endsWith('.css')) {
    //                     entrypoints.push(assets[file]);
    //                 }
    //             }
    //             return {
    //                 files: assets,
    //                 entrypoints: entrypoints
    //             };
    //         }
    //     }));
    //
    //     return config;
    // },
    // sassOptions: {
    //     includePaths: [path.join(__dirname, 'styles')],
    // }
};
