const { merge } = require('webpack-merge');
const chalk = require('chalk');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  stats: 'normal',
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarPlugin({
      format: `${chalk.green.bold('build[:bar]')} ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
      width: 60,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].chunk.css',
      ignoreOrder: true,
    }),
  ],
})
