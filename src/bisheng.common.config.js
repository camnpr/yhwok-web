/* eslint no-param-reassign: 0 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const websourcePlugin = new CopyWebpackPlugin([
  {
    from: './web.config',
    to: './web.config',
  }
]);

module.exports = {
  webpackConfig(config) {
    config.plugins.push(websourcePlugin);
    config.babel.plugins.push([
      require.resolve('babel-plugin-transform-runtime'),
      {
        polyfill: false,
        regenerator: false,
      },
    ], [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
    ]);
    config.resolve.alias = {
      'react-router': 'react-router/umd/ReactRouter',
    };
    return config;
  },
};
