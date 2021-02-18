'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
  return path.join(process.cwd(), process.env.BASE_DIR || '', dir)
}

module.exports = (entry, outputPath) => {
  if (!entry) throw 'no entry error'
  return {
    context: path.resolve(__dirname, '..'),
    entry: {
      app: resolve(entry)
    },
    output: {
      path: outputPath ? resolve(outputPath) : config.build.assetsRoot,
      filename: '[name].[hash].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.vue', '.json'],
      alias: {
        vue: 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new VueLoaderPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: [process.cwd()],
          options: vueLoaderConfig
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node\_modules/,
          include: [process.cwd()],
          options: {
            rootMode: 'upward',
            root: path.resolve(__dirname, '..')
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    }
  }
}
