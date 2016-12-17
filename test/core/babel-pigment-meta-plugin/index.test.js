import {readFile} from 'fs'
import test from 'tape'
import path from 'path'
import {transformFileSync} from 'babel-core'
import metaPlugin from '../../../src/core/babel-pigment-meta-plugin'

function makeFixtureFilePath (filePath) {
  return path.join(__dirname, 'fixtures', filePath + '.js')
}

function runTest (fixtureFile, callback) {
  const plugins = [[metaPlugin, {
    'rootDir': '.'
  }]]
  const babelOpts = {
    presets: ['es2015', 'react'],
    plugins: plugins
  }

  const expectedPath = makeFixtureFilePath(path.join(fixtureFile, 'expected'))
  const actualPath = makeFixtureFilePath(path.join(fixtureFile, 'actual'))

  const actual = transformFileSync(
    actualPath,
    babelOpts
  ).code

  readFile(expectedPath, function (err, expected) {
    if (err) { throw new Error(err.message) }
    callback(actual.trim('\n'), expected.toString().trim('\n'))
  })
}

test('ES2015 export default', (t) => {
  t.plan(1)
  runTest(
    'es2015/export-default',
    (actual, expected) => t.equals(actual, expected)
  )
})

test('ES2015 named export', (t) => {
  t.plan(1)
  runTest(
    'es2015/simple-named-export',
    (actual, expected) => t.equals(actual, expected)
  )
})

test('ES2015 multiple named export', (t) => {
  t.plan(1)
  runTest(
    'es2015/multiple-named-export',
    (actual, expected) => t.equals(actual, expected)
  )
})

test('ES2015 export with dependencies', (t) => {
  t.plan(1)
  runTest(
    'es2015/with-dependencies',
    (actual, expected) => t.equals(actual, expected)
  )
})
