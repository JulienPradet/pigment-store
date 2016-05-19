import path from 'path'
import {buildApp} from './js'
import {buildHtml} from './html'
import {buildServer} from './server'

const testDir = path.join(__dirname, '/../../../example_app/tests')
const styleguideDir = path.join(__dirname, '/../../../example_app/styleguide')
const opts = {
  babelify: {presets: ["es2015", "react"]}
}

buildApp(testDir, path.join(styleguideDir, 'js'), opts)
buildHtml(styleguideDir)
buildServer(styleguideDir)
