const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConf = require('./webpack.dev.config')
const proConf = require('./webpack.pro.config')

// error
// const config = process.NODE_ENV === 'development' ? devConf : proConf
// module.exports = merge(baseConfig, config);

module.exports = (env, argv) => {
  let config = argv.mode === 'development' ? devConf : proConf
  return merge(baseConfig, config)
};
