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
  const plugins = opts.plugins || [[metaPlugin, {
    'rootDir': '.'
  }]]
  const babelOpts = {
    presets: presets,
    plugins: plugins
  }

  return transformFileSync(makeFixtureFilePath(fixtureFile), babelOpts)
}

test('Simple ES6 default import', (t) => {
  t.plan(1)
  const SUT = makeSUT('simpleES6')

  t.true(SUT.code.match(/__PIGMENT_META/))
})

test('Simple ES6 named import', (t) => {
  t.plan(1)
  const SUT = makeSUT('importNamedEs6')

  t.true(SUT.code.match(/__PIGMENT_META/))
})

test('Simple ES6 all named import', (t) => {
  t.plan(1)
  const SUT = makeSUT('importAllNamedEs6')

  t.true(SUT.code.match(/__PIGMENT_META/))
})

test('Simple ES5 import', (t) => {
  t.plan(1)
  const SUT = makeSUT('simpleES5')

  t.true(SUT.code.match(/__PIGMENT_META/))
})

test('Metadata should not be added to modules', (t) => {
  t.plan(1)
  const SUT = makeSUT('requireModule')

  t.false(SUT.code.match(/__PIGMENT_META/))
})

test('Sub dependencies on modules should not be added to metadata', (t) => {
  t.plan(1)
  const SUT = makeSUT('requireDependencyWithModule')

  t.false(/dependencies: \[[^\]]+\]/.test(SUT.code))
})

test('Import with dependency', (t) => {
  t.plan(1)
  const SUT = makeSUT('withDependency')

  t.true(/dependencies: \[[^\]]+\]/.test(SUT.code))
})
