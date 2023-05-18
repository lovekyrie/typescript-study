const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

module.exports = (env, args) => {
  switch (args.mode) {
    case 'development':
      return merge(baseConfig, devConfig);
    case 'production':
      return merge(baseConfig, proConfig);
    default:
      throw new Error('No matching configuration was found!')
  }
};
