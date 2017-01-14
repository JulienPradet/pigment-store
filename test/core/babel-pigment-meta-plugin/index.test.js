import {readFile} from 'fs'
import test from 'tape'
import path from 'path'
import {transformFileSync} from 'babel-core'
import metaPlugin from '../../../src/core/babel-pigment-meta-plugin'

function makeFixtureFilePath (filePath) {
  return path.join(__dirname, 'fixtures', filePath + '.js')
}

function runTest (fixtureFile, callback) {
  const babelOpts = {
    presets: ['react-app'],
    plugins: [
      [metaPlugin, {
        'rootDir': path.resolve(__dirname)
      }]
    ]
  }

  const expectedPath = makeFixtureFilePath(path.join(fixtureFile, 'expected'))
  const actualPath = makeFixtureFilePath(path.join(fixtureFile, 'actual'))

  const actual = transformFileSync(
    actualPath,
    babelOpts
  ).code

  readFile(expectedPath, function (err, expected) {
    if (err) { throw new Error(err.message) }

    callback(
      actual.replace(/( |\t)+/, ' ').trim('\n'),
      expected.toString().replace(/( |\t)+/, ' ').trim('\n')
    )
  })
}

test('ES2015 import default', (t) => {
  t.plan(1)
  runTest(
    'es2015/import-default',
    (actual, expected) => t.equals(actual, expected)
  )
})

test('ES2015 named import', (t) => {
  t.plan(1)
  runTest(
    'es2015/named-import',
    (actual, expected) => t.equals(actual, expected)
  )
})

test('ES2015 mixed import', (t) => {
  t.plan(1)
  runTest(
    'es2015/mixed-import',
    (actual, expected) => t.equals(actual, expected)
  )
})

test('ES2015 module import', (t) => {
  t.plan(1)
  runTest(
    'es2015/module-import',
    (actual, expected) => t.equals(actual, expected)
  )
})

test('ES2015 with dependencies', (t) => {
  t.plan(1)
  runTest(
    'es2015/with-dependencies',
    (actual, expected) => t.equals(actual, expected)
  )
})
