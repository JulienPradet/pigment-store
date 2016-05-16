import Rx from 'rx'
import fs from 'fs'
import path from 'path'
import mkdirpLib from 'mkdirp'

export function readdir(dirPath) {
  return Rx.Observable.create((observer) => {
    fs.readdir(dirPath, (e, files) => {
			if(e) return observer.onError(e)

      files = files.map((file) => path.join(dirPath, file))
      observer.onNext(files)
      observer.onCompleted()
    })
  })
}

export function readfile(filepath) {
	return Rx.Observable.create((observer) => {
		fs.readFile(filepath, (e, file) => {
			if(e) return observer.onError(e)

      const data = { filepath: filepath, file: file.toString() }
			observer.onNext(data)
			observer.onCompleted()
		})
	})
}

export function writefile(filePath, content, options = {}) {
	return Rx.Observable.create((observer) => {
		fs.writeFile(filePath, content, options, (e) => {
			if(e) return observer.onError(e)

			observer.onNext(filePath)
			observer.onCompleted()
		})
	})
}

export function stat(filePath) {
  return Rx.Observable.create((observer) => {
    fs.stat(filePath, (e, stats) => {
      if(e) return observer.onError(e)

      observer.onNext({filepath: filePath, stats})
      observer.onCompleted()
    })
  })
}

export function mkdirp(path) {
  return Rx.Observable.create((observer) => {
    mkdirpLib(path, (e) => {
      if(e) return observer.onError(e)

      observer.onNext(path)
      observer.onCompleted()
    })
  })
}

export function getRecursiveFiles(inputDir$) {
  const dirs$ = new Rx.Subject()

  const dirsAndSubdirs$ = dirs$.merge(inputDir$)

  const filesAndDirs$ = dirsAndSubdirs$
    .flatMap((dirpath) => readdir(dirpath))
    .flatMap((files) => files) // flatten all files

  const filesAndDirsWithStats$ = filesAndDirs$.flatMap((filepath) => stat(filepath))
    .map(({filepath, stats}) => ({ filepath, stats, isDirectory: stats.isDirectory() }))
    .publish()
  filesAndDirsWithStats$.connect()

  filesAndDirsWithStats$.filter(({isDirectory}) => isDirectory)
    .subscribe(({filepath}) => dirs$.onNext(filepath))

  return filesAndDirsWithStats$.filter(({isDirectory}) => !isDirectory)
    .map(({isDirectory, filepath, stats}) => ({filepath, stats}))
}

export function saveFiles(filesToSave$) {
  return filesToSave$
    .flatMap(({file, filepath}) => mkdirp(path.dirname(filepath))
      .withLatestFrom(
        Rx.Observable.just({file, filepath}),
        (_, value) => value
      )
    )
    .flatMap(({file, filepath}) => writefile(filepath, file))
}

export function copyfile(sourcePath, destPath) {
  const file$ = readfile(sourcePath)
    .map(({file}) => ({file, filepath: destPath}))
  return saveFiles(file$)
}
