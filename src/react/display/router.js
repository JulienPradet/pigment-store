import React from 'react'
import slug from 'slug'
import AppPage from './AppPage'
import Home from './Home'
import CategoryGlobal from './Category/Global'
import ComponentGlobal from './Component/Global'
import FeatureDisplay from './Feature/Display'
import {DisplayOptionsProvider} from './DisplayOptions/ContextProvider'
import DisplayOptions from './DisplayOptions'

export const nameToPath = (name) => slug(name, {lower: true})
export const makePath = (prefix, ...names) => {
  return prefix + '/' + names.map(nameToPath).join('/')
}

export const makeFeatureView = (prefix, ...names) => {
  return makePath('/preview' + prefix, ...names)
}

const makeComponentRoute = (prefix) => (component) => ({
  path: makePath(prefix, component.name),
  indexRoute: {
    component: ComponentGlobal({
      component,
      prefix: prefix
    })
  }
})

const makeCategoryChildRoutes = (prefix, category) => [
  ...category.categories.map(makeCategoryRoute(prefix)),
  ...category.components.map(makeComponentRoute(prefix))
]

const makeCategoryRoute = (prefix) => ({name, category}) => ({
  path: makePath(prefix, name),
  indexRoute: {
    component: CategoryGlobal({category, prefix})
  },
  childRoutes: makeCategoryChildRoutes(makePath(prefix, name), category)
})

const makePreviewRoutes = (previews) => {
  return previews.map(({path, feature}) => ({
    path: makePath('/preview', ...path),
    component: (props) => <DisplayOptionsProvider>
      <div>
        <DisplayOptions />
        <FeatureDisplay feature={feature} />
      </div>
    </DisplayOptionsProvider>
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
