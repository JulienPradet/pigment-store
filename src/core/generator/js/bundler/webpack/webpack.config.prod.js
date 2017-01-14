const webpack = require('webpack')
const babelPigmentMetaPlugin = require('../../../../babel-pigment-meta-plugin')

module.exports = ({paths}) => ({
  devtool: 'source-map',
  entry: {
    app: paths.appIndexJs,
    iframe: paths.iframeIndexJs
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: paths.src
      }
    })
  ]
})
