const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ],
  },
  devServer: {
    port: 8080,
    hot: true,
    host: '0.0.0.0',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
};
