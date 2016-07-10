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
    component: SuiteGlobal(suite.name, suite)
  },
  childRoutes: Object.keys(suite.components)
    .map((componentName) => suite.components[componentName])
    .map((component) => ({
      path: makePath(prefix, suite.name, component.name) + '(/:featureName)',
      component: ComponentGlobal(suite.name, component.name, component)
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

const makePreviewRoutes = (suites) => [
  {
    path: '/preview/:suiteName/:componentName/:featureName',
    component: (props) => {
      const suiteName = props.params.suiteName
      const componentName = props.params.componentName
      const featureName = props.params.featureName

      const suite = suites.find((suite) => nameToPath(suite.name) === suiteName)
      if(!suite) {
        return null
      }

      const component = Object.keys(suite.components)
        .map((key) => suite.components[key])
        .find((component) => nameToPath(component.name) === componentName)
      if(!component) {
        return null
      }

      const feature = Object.keys(component.features)
        .map((key) => component.features[key])
        .find((feature) => nameToPath(feature.name) === featureName)
      if(!feature) {
        return null
      }

      return <FeatureDisplay {...props} feature={feature} />
    }
  }
]

export const makeRoutesFromDefinition = (category) => {
  return {
    path: '/',
    component: AppPage(category),
    indexRoute: {
      component: Home(category)
    },
    childRoutes: [
      ...makeCategoryChildRoutes('', category),
      ...makePreviewRoutes([])
    ]
  }
}
