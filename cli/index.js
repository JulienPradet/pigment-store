#!/usr/bin/env node

var parseArgs = require('minimist')
var path = require('path')
var generator = require('../dist/core/generator').default
var browserifyBundler = require('../dist/core/generator/js/bundler/browserify').default
var webpackBundler = require('../dist/core/generator/js/bundler/webpack').default

var argsOptions = parseArgs(process.argv.slice(2), {
  boolean: ['dev', 'help'],
  strings: ['source', 'output', 'bundler']
})

var source = argsOptions.source || argsOptions.s
var output = argsOptions.output || argsOptions.o

if (argsOptions.help || !source || !output) {
  console.log('\
    Welcome to PigmentStore!\n\
\n\
    Usage : pigment-store -s=tests -s=styleguide\n\
\n\
    Arguments :\n\
      --source, -s    <string> relative path to your tests directory\n\
      --output, -o    <string> relative path to your styleguide directory\n\
      --dev           [<bool>] watch file changes\n\
      --bundler, -b   <string> choose your bundler (webpack|browserify)\n\
  ')
} else {
  var bundler = argsOptions.bundler || argsOptions.b
  var bundlers = {
    webpack: webpackBundler,
    browserify: browserifyBundler
  }
  var options = Object.assign({
    bundler: bundler && bundlers.hasOwnProperty(bundler)
      ? bundlers[bundler]
      : browserifyBundler,
    dev: argsOptions.dev || false
  })

  var testDir = source
  var styleguideDir = output

  var generator$ = generator(testDir, styleguideDir, options)

  var styleguideRelativeDir = path.relative(process.cwd(), styleguideDir)
  var runStyleguideCmd = 'node ' + path.join(styleguideRelativeDir, 'server.js')

  generator$.subscribe(
    function () {},
    function () {
      console.log('\nAn error occured. Feel free to leave an issue at https://github.com/JulienPradet/pigment-store if you think it\'s a bug.')
      process.exit(1)
    },
    function () { console.log('\nYou can now open your styleguide by running:\n$ ' + runStyleguideCmd) }
  )
}
