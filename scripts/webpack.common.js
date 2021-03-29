const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');
const isDev = process.env.NODE_ENV === 'development';

const getCssLoaders = (importLoaders) => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
    },
  },
  'postcss-loader'
]


module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: '[name].[chunkhash:8].js',
    path: paths.appBuild,
  },
  cache: {
    // 使用持久化缓存
    type: 'filesystem', // memory:缓存到内存；filesystem：缓存到node_moudules文件
  },
  plugins: [
    new WebpackBar()
  ],
  target: isDev ? "web" : "browserslist",
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset'
      },
      {
        test: /\.(jsx?|js)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.jsx', '.ts', '.js', '.json'],
    alias: {
      '@': paths.appSrc
    }
  },
};
