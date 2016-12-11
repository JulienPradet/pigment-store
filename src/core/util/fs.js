const Rx = require('rx')
const fs = require('fs')
const path = require('path')
const mkdirpLib = require('mkdirp')
const chokidar = require('chokidar')

function exists (filePath) {
  return Rx.Observable.create((observer) => {
    fs.exists(filePath, (exists) => {
      observer.onNext(exists)
      observer.onCompleted()
    })
  })
}

function watchfile (filePath) {
  return Rx.Observable.create((observer) => {
    chokidar.watch(filePath, {persistent: true})
      .on('change', () => {
        observer.onNext()
      })
  })
}

function readdir (dirPath) {
  return Rx.Observable.create((observer) => {
    fs.readdir(dirPath, (e, files) => {
      if (e) return observer.onError(e)

      files = files.map((file) => path.join(dirPath, file))
      observer.onNext(files)
      observer.onCompleted()
    })
  })
}

function readfile (filepath) {
  return Rx.Observable.create((observer) => {
    fs.readFile(filepath, (e, file) => {
      if (e) return observer.onError(e)

      const data = { filepath: filepath, file: file.toString() }
      observer.onNext(data)
      observer.onCompleted()
    })
  })
}

function writefile (filePath, content, options = {}) {
  return Rx.Observable.create((observer) => {
    fs.writeFile(filePath, content, options, (e) => {
      if (e) return observer.onError(e)

      observer.onNext(filePath)
      observer.onCompleted()
    })
  })
}

function stat (filePath) {
  return Rx.Observable.create((observer) => {
    fs.stat(filePath, (e, stats) => {
      if (e) return observer.onError(e)

      observer.onNext({filepath: filePath, stats})
      observer.onCompleted()
    })
  })
}

function mkdirp (path) {
  return Rx.Observable.create((observer) => {
    mkdirpLib(path, (e) => {
      if (e) return observer.onError(e)

      observer.onNext(path)
      observer.onCompleted()
    })
  })
}

function getRecursiveFiles (inputDir$) {
  return inputDir$
    .flatMap((dirpath) => readdir(dirpath))
    .flatMap((files) => files) // flatten all files
    .flatMap((filepath) => stat(filepath))
    .map(({filepath, stats}) => ({ filepath, stats, isDirectory: stats.isDirectory() }))
    .expand(({filepath, stats, isDirectory}) => isDirectory ? getRecursiveFiles(Rx.Observable.just(filepath)) : Rx.Observable.empty())
    .filter(({isDirectory}) => !isDirectory)
    .map(({isDirectory, filepath, stats}) => ({filepath, stats}))
}

function saveFiles (filesToSave$) {
  return filesToSave$
    .flatMap(({file, filepath}) => mkdirp(path.dirname(filepath))
      .map(() => ({file, filepath}))
    )
    .flatMap(({file, filepath}) => writefile(filepath, file))
}

function copyfile (sourcePath, destPath, recursive = false) {
  let file$
  if (recursive) {
    file$ = getRecursiveFiles(Rx.Observable.just(sourcePath))
      .flatMap(({filepath}) => readfile(filepath))
  } else {
    file$ = readfile(sourcePath)
  }

  return saveFiles(
    file$.map(({file, filepath}) => ({
      file,
      filepath: path.join(destPath, path.relative(sourcePath, filepath))
    }))
  )
}

module.exports = {
  exists,
  watchfile,
  readdir,
  readfile,
  writefile,
  stat,
  mkdirp,
  getRecursiveFiles,
  saveFiles,
  copyfile
}
