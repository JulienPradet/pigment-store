const webpack = require('webpack')
const babelPigmentMetaPlugin = require('../../../../babel-pigment-meta-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({paths}) => ({
  devtool: 'source-map',
  entry: {
    app: paths.appIndexJs,
    iframe: paths.iframeIndexJs
  },
  output: {
    path: paths.appBuild,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
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
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: 2
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
      debug: false,
      options: {
        context: paths.src
      }
    })
  ]
})
