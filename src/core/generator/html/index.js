import path from 'path'
import {copyfile, watchfile} from '../../util/fs'

export function buildHtml (destPath, {dev}) {
  console.log('=== STYLEGUIDE :: HTML :: START')

  const copyHtml = () => copyfile(path.join(__dirname, 'index.html'), path.join(destPath, 'index.html'))
  const savedHtml$ = dev
    ? watchfile(path.join(__dirname, 'index.html')).startWith({}).flatMap(copyHtml)
    : copyHtml()

  savedHtml$.subscribe(
    (filepath) => console.log('=== STYLEGUIDE :: HTML :: DONE :: ' + filepath),
    (e) => {
      console.error('=== STYLEGUIDE :: HTML :: ERROR')
      console.error(e)
    },
    () => {
      console.log('=== STYLEGUIDE :: HTML :: END')
    }
  )
}
