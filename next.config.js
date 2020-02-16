const withPlugins = require('next-compose-plugins')

const withOffline = require('next-offline')
const withOptimizedImages = require('next-optimized-images')
const withBundleAnalyzer = require('@next/bundle-analyzer')

const withPreact = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      if (options.isServer) {
        config.externals = ['react', 'react-dom', ...config.externals]
      }

      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        react: 'preact/compat',
        react$: 'preact/compat',
        'react-dom': 'preact/compat',
        'react-dom$': 'preact/compat',
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}

module.exports = withPlugins(
  [
    [withPreact],
    [
      withOptimizedImages,
      {
        optimizeImagesInDev: true,
        mozjpeg: {
          quality: 50,
        },
        optipng: {
          optimizationLevel: 2,
        },
        webp: {
          preset: 'default',
          quality: 50,
        },
      },
    ],
    [withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })],
    [withOffline],
  ],
  {}
)
