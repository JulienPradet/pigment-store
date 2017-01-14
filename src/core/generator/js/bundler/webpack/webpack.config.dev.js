const webpack = require('webpack')
const babelPigmentMetaPlugin = require('../../../../babel-pigment-meta-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({paths}) => ({
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/dev-server',
      paths.appIndexJs
    ],
    iframe: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/dev-server',
      paths.iframeIndexJs
    ]
  },
  output: {
    path: paths.appBuild,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  resolve: {
    alias: {
      'pigment-store': paths.pigmentStoreEntry
    }
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            include: paths.test,
            issuer: {
              include: paths.appIndexJs
            },
            loader: 'babel-loader',
            options: {
              presets: [
                'react-app'
              ],
              plugins: [
                [babelPigmentMetaPlugin, {rootDir: paths.src}]
              ]
            }
          },
          {
            test: /\.js$/,
            exclude: [
              /(node_modules|bower_components)/
            ],
            loader: 'babel-loader',
            options: {
              presets: [
                'react-app'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[folder]_[path]__[name]_[local]__[hash:base64:16]',
              modules: true,
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: paths.appHtml
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: 2
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: paths.src
      }
    })
  ]
})
