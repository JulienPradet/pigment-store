import path from 'path'
import { Observable } from 'rx'
import {getRecursiveFiles} from '../../util/fs'

class Suites {
  constructor () {
    this.imports = []
    this.varsToRender = []
  }

  addSuite ({file, name}) {
    this.imports.push(`import ${name} from './${file}'`)
    this.varsToRender.push(name)
  }

  render () {
    return `
      import PigmentStore from 'pigment-store'
      ${this.imports.join('\n')}

      PigmentStore.React.render(${this.varsToRender.join(', ')})
    `
  }
}

export default (testDir) => {
  return Observable.create((observer) => {
    const suites = new Suites()

    getRecursiveFiles(Observable.just(testDir))
    .map(({filepath}) => path.relative(testDir, filepath))
    .map((filepath) => ({
      file: filepath,
      name: filepath.replace(/\./g, '_').replace(/\//g, '_')
    }))
    .subscribe(
      (suite) => suites.addSuite(suite),
      () => {},
      () => {
        observer.onNext(suites.render())
        observer.onCompleted()
      }
    )
  })
}
