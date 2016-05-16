import Rx, {Subject} from 'rx'
import path from 'path'
import {copyfile} from '../../util/fs'

export function buildServer(destPath) {
  console.log("=== STYLEGUIDE :: HTML :: START")
  const savedServer$ = copyfile(path.join(__dirname, 'server.js'), path.join(destPath, 'server.js'))

  savedServer$.subscribe(
    (filepath) => console.log("=== STYLEGUIDE :: SERVER :: DONE :: " + filepath),
    (e) => {
      console.error("=== STYLEGUIDE :: SERVER :: ERROR")
      console.error(e)
    },
    () => {
      console.log("=== STYLEGUIDE :: SERVER :: END")
    }
  )
}
