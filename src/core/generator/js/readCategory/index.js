const path = require('path')
const Observable = require('rx').Observable
const Subject = require('rx').Subject
const exists = require('../../../util/fs').exists
const readdir = require('../../../util/fs').readdir
const readfile = require('../../../util/fs').readfile
const stat = require('../../../util/fs').stat
const Component = require('./Component')
const Category = require('./Category')

const readCategories = {}

const readCategory = (testDir, categoryDir, indexDir) => {
  if (readCategories[categoryDir]) {
    return readCategories[categoryDir]
  }

  if (/__fixtures__|__mocks__|__decorators__/.test(categoryDir)) {
    return Observable.empty()
  }

  const itemsInDir$ = Observable.just(categoryDir)
    .flatMap((dirpath) => readdir(dirpath))
    .flatMap((files) => files) // flatten all files
    .filter((filepath) => {
      const basename = path.basename(filepath)
      return !basename.startsWith('.')
    })
    .flatMap((filepath) => stat(filepath))
    .map(({filepath, stats}) => ({ filepath, stats, isDirectory: stats.isDirectory() }))
    .publish()
  itemsInDir$.connect()

  const subCategories$ = itemsInDir$
    .filter(({isDirectory}) => isDirectory)
    .flatMap(({filepath}) => readCategory(testDir, filepath, indexDir)
      .map((category) => (parent) => parent.addCategory({
        name: path.relative(categoryDir, filepath),
        category: category
      }))
    )

  const components$ = itemsInDir$
    .filter(({isDirectory}) => !isDirectory)
    .map(({filepath}) => filepath)
    .filter((filepath) => {
      return !filepath.endsWith('.md')
    })
    .map((filepath) => (parent) => parent.addComponent({
      name: path.relative(categoryDir, filepath),
      component: new Component(
        path.relative(indexDir, filepath)
      )
    }))

  const descriptionPath = path.join(categoryDir, 'index.md')
  const description$ = exists(descriptionPath)
    .filter((exists) => exists)
    .flatMap(() => readfile(descriptionPath))
    .map(({file}) => (parent) => parent.setDescription(file))

  let categoryToReturn
  const category$ = new Subject()
  readCategories[categoryDir] = category$

  Observable
    .merge(subCategories$, components$, description$)
    .scan(
      (category, reducer) => reducer(category),
      new Category(path.basename(categoryDir))
    )
    .filter((category) => category.subCategories.length > 0 || category.components.length > 0)
    .subscribe(
      (category) => {
        categoryToReturn = category
      },
      () => {},
      () => {
        category$.onNext(categoryToReturn)
        category$.onCompleted()
      }
    )

  return category$
}

module.exports = readCategory
