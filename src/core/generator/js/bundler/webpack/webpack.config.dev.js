const webpack = require('webpack')
const babelPigmentMetaPlugin = require('../../../../babel-pigment-meta-plugin')

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
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      'pigment-store': paths.pigmentStoreEntry
    }
  },
  performance: {
    hints: false
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
