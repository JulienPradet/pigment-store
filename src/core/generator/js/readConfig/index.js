import path from 'path'
import {Observable} from 'rx'
import Config from './Config'

const readConfig = (testDir, indexDir) => {
  return Observable.just(new Config(path.relative(indexDir, path.join(testDir, '.config.client.js'))))
}

export default readConfig
