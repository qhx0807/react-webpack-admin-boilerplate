const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    port: 9000,
    compress: true,
    hot: true,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    host: '0.0.0.0',
    open: false,
    after: function () {
      console.log('running at http://localhost:9000/');
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false,
    }),
  ]
})
