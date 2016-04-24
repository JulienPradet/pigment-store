import Rx, {Subject} from 'rx'
import path from 'path'
import {getRecursiveFiles, mkdirp, writefile} from '../../util/fs'
import {renderApp, renderVendor} from './renderBundle'

function renderFiles(filesToRender$, testDir, styleguideDir, opts) {
  return filesToRender$
    .map(({filepath}) => filepath)
    .map((filepath) => {
      const destPath = path.join(styleguideDir, filepath.substr(testDir.length))
      const sourcePath = filepath
      return {sourcePath, destPath}
    })
    .flatMap((paths) => renderApp(paths, opts))
}

function saveFiles(filesToSave$) {
  return filesToSave$
    .flatMap(({file, filepath}) => mkdirp(path.dirname(filepath))
      .withLatestFrom(
        Rx.Observable.just({file, filepath}),
        (_, value) => value
      )
    )
    .flatMap(({file, filepath}) => writefile(filepath, file))
}

export function buildApp(testDir, styleguideDir, opts) {
  console.log("=== STYLEGUIDE :: JS :: APP :: START")
  const inputDir$ = new Rx.Subject()

  const filesToRender$ = getRecursiveFiles(inputDir$)
  const filesToSave$ = renderFiles(filesToRender$, testDir, styleguideDir, opts)
  const savedFiles$ = saveFiles(filesToSave$)

  savedFiles$.subscribe(
    (filepath) => console.log("=== STYLEGUIDE :: JS :: APP :: DONE :: " + filepath),
    (e) => {
      console.error("=== STYLEGUIDE :: JS :: APP :: ERROR")
      console.error(e)
    },
    () => {
      console.log("=== STYLEGUIDE :: JS :: APP :: END")
    }
  )

  inputDir$.onNext(testDir)
  inputDir$.onCompleted()
}

export function buildVendor(destPath, modules) {
  console.log("=== STYLEGUIDE :: JS :: VENDOR :: START")
  const vendor$ = renderVendor(destPath, modules)
  const savedVendor$ = saveFiles(vendor$)

  savedVendor$.subscribe(
    (filepath) => console.log("=== STYLEGUIDE :: JS :: VENDOR :: DONE :: " + filepath),
    (e) => {
      console.error("=== STYLEGUIDE :: JS :: VENDOR :: ERROR")
      console.error(e)
    },
    () => {
      console.log("=== STYLEGUIDE :: JS :: VENDOR :: END")
    }
  )
}
