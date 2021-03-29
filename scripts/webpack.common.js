// const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    // new WebpackBar()
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: 'body',
      minify: {
        removeComments: !isDev,
        collapseWhitespace: !isDev
      }
    }),
  ],
  target: isDev ? "web" : "browserslist",
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: 'asset'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(jsx?|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
        ]
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
      },
    ],
  },
  optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    minimize: !isDev,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
      new TerserPlugin({
        parallel: true,
        terserOptions: {}
      })
    ],
    splitChunks: {
      chunks: 'all', // 默认作用于异步chunk
      minSize: 0, // 默认值是30kb,代码块的最小尺寸
      minChunks: 1, // 被多少模块共享,表示被引用次数，默认为1
      maxAsyncRequests: 2, // 限制异步模内部的并行最大请求块数的，默认为5
      maxInitialRequests: 4, // 限制入口的拆分数量 一个入口最大的并行请求数，默认为3
      automaticNameDelimiter: '~', // 默认webpack将会使用入口名和代码块的名称生成命名,比如 'vendors~main.js'
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /node_modules/,
          priority: -10, /// 优先级，
        },
        commons: {
          chunks: 'all',
          minSize: 0, // 最小提取字节数
          minChunks: 2, // 最少被几个chunk引用
          priority: -20,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      moment$: 'moment/moment.js',
      '@': paths.appSrc
    }
  },
};
