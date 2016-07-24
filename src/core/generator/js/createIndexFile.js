import path from 'path'
import {Observable, Subject} from 'rx'
import {readdir, stat} from '../../util/fs'
import Component from './Component'
import Category from './Category'

const renderIndexFile = (category) => {
  return `
    import PigmentStore from 'pigment-store'
    const category = ${category.render()}
    PigmentStore.React.render(category)
  `
}

const readCategory = (testDir, categoryDir) => {
  const itemsInDir$ = Observable.just(categoryDir)
    .flatMap((dirpath) => readdir(dirpath))
    .flatMap((files) => files) // flatten all files
    .flatMap((filepath) => stat(filepath))
    .map(({filepath, stats}) => ({ filepath, stats, isDirectory: stats.isDirectory() }))
    .publish()
  itemsInDir$.connect()

  const subCategories$ = itemsInDir$
    .filter(({isDirectory}) => isDirectory)
    .flatMap(({filepath}) => readCategory(testDir, filepath)
      .map((category) => (parent) => parent.addCategory({
        name: path.relative(categoryDir, filepath),
        category: category
      }))
    )

  const components$ = itemsInDir$
    .filter(({isDirectory}) => !isDirectory)
    .map(({filepath}) => filepath)
    .map((filepath) => (parent) => parent.addComponent({
      name: path.relative(categoryDir, filepath),
      component: new Component(path.relative(testDir, filepath))
    }))

  let categoryToReturn
  const category$ = new Subject()

  Observable
    .merge(subCategories$, components$)
    .scan((category, reducer) => reducer(category), new Category(path.basename(categoryDir)))
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

export default (testDir) => {
  return readCategory(testDir, testDir)
    .map((category) => renderIndexFile(category))
}
