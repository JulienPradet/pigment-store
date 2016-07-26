import {copyfile, watchfile} from '../../util/fs'

export default function buildFile (source, dest, {dev}) {
  const copyServer = () => copyfile(source, dest)

  return dev
    ? watchfile(source).startWith({}).flatMap(copyServer)
    : copyServer()
}
