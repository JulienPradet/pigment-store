#!/usr/bin/env node

import path from 'path'
import parseArgs from 'minimist'
import generator from '../core/generator'
import browserifyBundler from '../core/generator/js/bundler/browserify'

const argsOptions = parseArgs(process.argv.slice(2), {
  boolean: ['dev']
})

const options = Object.assign({
  bundler: browserifyBundler
}, argsOptions)

const testDir = path.join(__dirname, '../../examples/basic/tests')
const styleguideDir = path.join(__dirname, '../../examples/basic/styleguide')

generator(testDir, styleguideDir, options)
