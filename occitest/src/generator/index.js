import path from 'path'
import Rx from 'rx'
import {buildApp, buildVendor} from './js'
import {buildHtml} from './html'
import {buildServer} from './server'

const testDir = path.join(__dirname, '/../../../example_app/tests')
const styleguideDir = path.join(__dirname, '/../../../example_app/styleguide')
const opts = {
  external: ['react', 'occitest'],
  babelify: {presets: ["es2015", "react"]}
}

buildApp(testDir, path.join(styleguideDir, 'js'), opts)
buildVendor(path.join(styleguideDir, 'js/vendor.js'), ['react', 'occitest'])
buildHtml(styleguideDir)
buildServer(styleguideDir)
