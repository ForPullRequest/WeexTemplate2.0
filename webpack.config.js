// You can see all the config in `./configs`.
const buildPlugins = require('./configs/plugin');
let webpackConfig;
module.exports = env => {
  switch (env.NODE_ENV) {
    case 'release':
      webpackConfig = require('./configs/webpack.release.conf');
      break;
      case 'dev':
      case 'development':
      default:
        webpackConfig = require('./configs/webpack.common.conf');
  }
  return webpackConfig;
}