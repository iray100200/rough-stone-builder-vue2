'use strict'

const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devWebpackConfig = {
  mode: 'development',
  devServer: {
    hot: true,
    inline: true,
    liveReload: true,
    historyApiFallback: true,
    contentBase: [resolve('dist'), resolve('public')],
    compress: true
  }
}

function resolve (dir) {
  return path.join(process.cwd(), process.env.BASE_DIR || '', dir)
}

Object.assign(devWebpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'index.html'),
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve('public'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = (entry) => {
  const base = baseWebpackConfig(entry)
  return merge(base, devWebpackConfig)
}