const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    port: 9000,
    // compress: true,
    hot: true,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    host: '0.0.0.0',
    open: false,
    after: function () {
      console.log('running at http://localhost:9000/');
    }
  },
  plugins: []
})
