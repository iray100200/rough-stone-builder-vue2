const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev.conf')
const portfinder = require('portfinder')

const PORT = process.env.PORT && Number(process.env.PORT) || 8080

module.exports = entry => {
  const webpackConfig = config(entry)
  const compiler = webpack(webpackConfig)
  const server = new webpackDevServer(compiler, webpackConfig.devServer)

  portfinder.basePort = PORT
  portfinder.getPort((err, p) => {
    if (err) {
      reject(err)
    } else {
      port = p
      server.listen(p)
    }
  })
}