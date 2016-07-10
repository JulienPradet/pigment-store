import React from 'react'
import slug from 'slug'
import AppPage from './AppPage'
import Home from './Home'
import CategoryGlobal from './Category/Global'
import SuiteGlobal from './Suite/Global'
import ComponentGlobal from './Component/Global'
import FeatureDisplay from './Feature/Display'

export const nameToPath = (name) => slug(name, {lower: true})
export const makePath = (prefix, ...names) => {
  return prefix + '/' + names.map(nameToPath).join('/')
}

export const makeFeatureView = (...names) => {
  return makePath('/preview', ...names)
}

const makeSuiteRoute = (prefix) => (suite) => ({
  path: makePath(prefix, suite.name),
  indexRoute: {
    component: SuiteGlobal({
      suite,
      prefix: prefix
    })
  },
  childRoutes: Object.keys(suite.components)
    .map((componentName) => suite.components[componentName])
    .map((component) => ({
      path: makePath(prefix, suite.name, component.name) + '(/:featureName)',
      component: ComponentGlobal({
        component,
        prefix: makePath(prefix, suite.name)
      })
    }))
})

const makeCategoryChildRoutes = (prefix, category) => [
  ...category.categories.map(makeCategoryRoute(prefix)),
  ...category.suites.map(makeSuiteRoute(prefix))
]

const makeCategoryRoute = (prefix) => ({name, category}) => ({
  path: makePath(prefix, name),
  indexRoute: {
    component: CategoryGlobal(name, category)
  },
  childRoutes: makeCategoryChildRoutes(makePath(prefix, name), category)
})

const makePreviewRoutes = (previews) => {
  return previews.map(({path, feature}) => ({
    path: makePath('/preview', ...path),
    component: (props) => <FeatureDisplay feature={feature} />
  }))
}

export const makeRoutesFromDefinition = (category, previews) => {
  return {
    path: '/',
    component: AppPage(category),
    indexRoute: {
      component: Home(category)
    },
    childRoutes: [
      ...makeCategoryChildRoutes('', category),
      ...makePreviewRoutes(previews)
    ]
  }
}
