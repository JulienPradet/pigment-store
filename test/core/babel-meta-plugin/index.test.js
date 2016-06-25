import test from 'tape'
import path from 'path'
import {transformFileSync} from 'babel-core'
import metaPlugin from '../../../src/core/babel-meta-plugin'

function makeFixtureFilePath (filePath) {
  return path.join(__dirname, 'fixtures', filePath + '.js')
}

function makeSUT (fixtureFile, opts) {
  opts = opts || {}
  const presets = opts.presets || ['es2015', 'react']
  const plugins = opts.plugins || [[metaPlugin]]
  const babelOpts = {
    presets: presets,
    plugins: plugins
  }

  return transformFileSync(makeFixtureFilePath(fixtureFile), babelOpts)
}

test('Simple ES6 default import', (t) => {
  const SUT = makeSUT('simpleES6')

  t.true(SUT.code.match(/__PIGMENT_META/))
  t.end()
})

test.only('Simple ES6 named import', (t) => {
  const SUT = makeSUT('importNamedEs6')

  t.true(SUT.code.match(/__PIGMENT_META/))
  t.end()
})

test('Simple ES6 all named import', (t) => {
  const SUT = makeSUT('importAllNamedEs6')

  t.true(SUT.code.match(/__PIGMENT_META/))
  t.end()
})

test('Simple ES5 import', (t) => {
  const SUT = makeSUT('simpleES5')

  t.true(SUT.code.match(/__PIGMENT_META/))
  t.end()
})

test('Metadata should not be added to modules', (t) => {
  const SUT = makeSUT('requireModule')

  t.false(SUT.code.match(/__PIGMENT_META/))
  t.end()
})

test('Sub dependencies on modules should not be added to metadata', (t) => {
  const SUT = makeSUT('requireDependencyWithModule')

  t.false(SUT.code.match(/dependencies: \[([^\]]+)\]/))
  t.end()
})

test('Import with dependency', (t) => {
  const SUT = makeSUT('withDependency')

  t.true(SUT.code.match(/dependencies: \[([^\]]+)\]/))
  t.end()
})
