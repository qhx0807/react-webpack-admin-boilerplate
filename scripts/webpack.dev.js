const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 9000,
    compress: true,
    hot: true,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    compress: true,
    host: '127.0.0.1',
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false,
    }),
  ]
})
