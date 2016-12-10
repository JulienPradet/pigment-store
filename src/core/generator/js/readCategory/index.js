import path from 'path'
import {Observable, Subject} from 'rx'
import {readdir, stat, exists, readfile} from '../../../util/fs'
import Component from './Component'
import Category from './Category'

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

export default readCategory
