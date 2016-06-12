import Rx from 'rx'
import path from 'path'
import {copyfile, watchfile} from '../../util/fs'

export function buildServer (destPath, {dev}) {
  console.log('=== STYLEGUIDE :: SERVER :: START')

  const copyServer = () => copyfile(path.join(__dirname, 'server.js'), path.join(destPath, 'server.js'))
  const savedServer$ = dev
    ? watchfile(path.join(__dirname, 'server.js')).startWith({}).flatMap(copyServer)
    : copyServer()

  savedServer$.subscribe(
    (filepath) => console.log('=== STYLEGUIDE :: SERVER :: DONE :: ' + filepath),
    (e) => {
      console.error('=== STYLEGUIDE :: SERVER :: ERROR')
      console.error(e)
    },
    () => {
      console.log('=== STYLEGUIDE :: SERVER :: END')
    }
  )
}
