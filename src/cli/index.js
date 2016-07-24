#!/usr/bin/env node

import path from 'path'
import parseArgs from 'minimist'
import generator from '../core/generator'
import browserifyBundler from '../core/generator/js/bundler/browserify'

const argsOptions = parseArgs(process.argv.slice(2), {
  boolean: ['dev', 'help'],
  strings: ['source', 'output']
})

const source = argsOptions.source || argsOptions.s
const output = argsOptions.output || argsOptions.o

if (argsOptions.help || !source || !output) {
  console.log(`
    Welcome to PigmentStore!

    Usage : pigment-store -s=tests -s=styleguide

    Arguments :
      --source, -s   <string> relative path to your tests directory
      --output, -o   <string> relative path to your styleguide directory
      --dev          [<bool>] watch file changes
  `)
} else {
  const options = Object.assign({
    bundler: browserifyBundler,
    dev: argsOptions.dev || false
  })

  const testDir = source
  const styleguideDir = output

  generator(testDir, styleguideDir, options)
}
