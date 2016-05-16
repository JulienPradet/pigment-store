import Rx, {Subject} from 'rx'
import path from 'path'
import {copyfile} from '../../util/fs'


export function buildHtml(destPath) {
  console.log("=== STYLEGUIDE :: HTML :: START")
  const savedHtml$ = copyfile(path.join(__dirname, 'index.html'), path.join(destPath, 'index.html'))

  savedHtml$.subscribe(
    (filepath) => console.log("=== STYLEGUIDE :: HTML :: DONE :: " + filepath),
    (e) => {
      console.error("=== STYLEGUIDE :: HTML :: ERROR")
      console.error(e)
    },
    () => {
      console.log("=== STYLEGUIDE :: HTML :: END")
    }
  )
}
