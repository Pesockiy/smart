/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config, options) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      issuer: /\.[jt]sx?$/,
      options: {
        svgo: true,
        svgSprite: true,
        svgoConfig: {
          plugins: [
            'prefixIds',
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            }
          ]
        },
        titleProp: true
      },
      test: /\.svg$/
    })

    return config
  },

  reactStrictMode: false,
  images: {
    domains: ['https://flagsapi.com']
  },
  fileExtensions: ['svg'],
  disableStaticImages: true,
  sassOptions: {
    additionalData: `
    @import "src/styles/_variables.sass" 
    @import "src/styles/_mixins.sass"`,
  },
};

module.exports = nextConfig;
