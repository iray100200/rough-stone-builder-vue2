#!/usr/bin/env node

const { Command } = require('commander')
const build = require('../build/build')
const program = new Command()

program
  .option('-e, --entry [value]', 'webpack entry path')
  .option('-o, --outputPath <value>', 'webpack output path')
  .action(function (options) {
    build(options.entry, options.outputPath)
  })

program.parse()