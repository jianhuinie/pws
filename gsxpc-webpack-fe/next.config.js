const path = require('path');
const rupture = require('rupture');
const withStylus = require('@zeit/next-stylus');
const poststylus = require('poststylus');
const autoprefixer = require('autoprefixer');

const dev = process.env.ENV_TYPE === 'local';

module.exports = withStylus({
    cssModules: false,
    stylusLoaderOptions: {
        use: [
            rupture(),
            poststylus([autoprefixer({flexbox: 'no-2009'})])
        ]
    },
    dev,
    distDir: 'ssr',
    assetPrefix: dev ? '' : '/pc',
    poweredByHeader: false,
    serverRuntimeConfig: {},
    publicRuntimeConfig: {},
    webpack(config, {buildId, dev, isServer, defaultLoaders}) {
        config.resolve.alias = {
            ...config.resolve.alias,
            'css': path.resolve('./css'),
            '~': path.resolve('./')
        };
        // Perform customizations to webpack config
        // Important: return the modified config
        return config;
    }
});
