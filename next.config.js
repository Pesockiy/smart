/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg/,
      use: {
        loader: 'svg-url-loader',
        options: {
          name: '[path][name].[hash].[ext]',
          publicPath: '/_next',
          outputPath: 'static',
          emitFile: !options.isServer,
        },
      },
    });
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: {
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
          publicPath: '/_next/static',
          outputPath: 'static',
          emitFile: !options.isServer,
        },
      },
    });
    return config;
  },
  reactStrictMode: false,
  // images: {
  //   domains: ['https://flagsapi.com']
  // },
  // fileExtensions: ['svg'],
  sassOptions: {
    additionalData: `
    @import "src/styles/_variables.sass" 
    @import "src/styles/_mixins.sass"`,
  },
};

module.exports = withImages(nextConfig);
// "sprite": "svg-sprite -s --svg-namespace-classnames=true --symbol-dest src/assets/icons --symbol-sprite _sprite.svg src/assets/icons/**/*.svg --shape-transform-* svg-sprite-config.json --symbol-render-scss true --symbol-render-scss-dest ../../common/Icon/Icon.scss --symbol-render-scss-template src/styles/_sprite_template.scss && svgo src/assets/icons/_sprite.svg --config svgo.config.js"
