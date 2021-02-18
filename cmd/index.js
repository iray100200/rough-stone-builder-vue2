#!/usr/bin/env node

const { Command } = require('commander')
const build = require('../build/build')
const dev = require('../build/dev')
const program = new Command()

program
  .option('-e, --entry [value]', 'webpack entry path')
  .option('-o, --outputPath <value>', 'webpack output path')
  .option('-d, --debug', "development mode, a new webpack dev server will serve the app")
  .action(function (options) {
    if (options.debug) {
      console.log('\r\n  development mode\r\n')
      dev(options.entry)
    } else {
      console.log('\r\n  production mode\r\n')
      build(options.entry, options.outputPath)
    }
  })

program.parse()