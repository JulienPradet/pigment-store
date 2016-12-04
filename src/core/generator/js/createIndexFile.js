import path from 'path'
import {Observable, Subject} from 'rx'
import {exists, readdir, readfile, stat} from '../../util/fs'
import Component from './Component'
import Category from './Category'
import Config from './Config'

const renderIndexFile = (category, config, testDir) => {
  const pathToPigmentStore = path.relative(testDir, path.join(__dirname, '../../../index.js'))
  category.name = config.name || 'Pigment Store 🎨'
  return `
    /* This is a generated file ! Do not override or your changes will be lost on next compilation */
    import PigmentStore from '${pathToPigmentStore}'
    const category = ${category.render()}
    const config = ${config.render()}
    PigmentStore.React.render(category, config)
  `
}

const readCategory = (testDir, categoryDir, indexDir) => {
  if (/fixtures/.test(categoryDir)) {
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

const readConfig = (testDir, indexDir) => {
  return Observable.just(new Config(path.relative(indexDir, path.join(testDir, '.config.client.js'))))
}

export default (testDir, indexDir) => {
  const indexCategory$ = readCategory(testDir, testDir, indexDir)
  const config$ = readConfig(testDir, indexDir)
  return indexCategory$
    .combineLatest(config$, (category, config) => ({category, config}))
    .map(({category, config}) => renderIndexFile(category, config, testDir))
}
