import slug from 'slug'

import AppPage from './AppPage'
import Home from './Home'
import {Global as SuiteGlobal} from './Suite'
import {Global as ComponentGlobal} from './Component'
import {Global as FeatureGlobal} from './Feature'

export const suiteNameToPath = (name) => slug(name, {lower: true})
export const componentNameToPath = (name) => slug(name, {lower: true})
export const featureNameToPath = (name) => slug(name, {lower: true})
export const makePath = (suiteName, componentName, featureName) => {
  let path = ''
  if (suiteName) {
    path += '/' + suiteNameToPath(suiteName)
  }
  if (componentName) {
    path += '/' + componentNameToPath(componentName)
  }
  if (featureName) {
    path += '/' + featureNameToPath(featureName)
  }
  return path
}

const suiteRoutes = (suites) => suites.map((suite) => ({
  path: suiteNameToPath(suite.name),
  indexRoute: {
    component: SuiteGlobal(suite)
  },
  childRoutes: Object.keys(suite.components)
    .map((componentName) => ({ name: componentName, component: suite.components[componentName] }))
    .map(({name, component}) => ({
      path: componentNameToPath(name),
      indexRoute: {
        component: ComponentGlobal(name, component)
      },
      childRoutes: Object.keys(component.features)
        .map((featureKey) => ({ name: featureKey, feature: component.features[featureKey] }))
        .map(({name, feature}) => ({
          path: featureNameToPath(name),
          component: FeatureGlobal(name, feature)
        }))
    }))
}))

const overviewRoutes = () => []

export const makeRoutesFromDefinition = ({suites, overview}) => {
  const SuiteRoutes = suiteRoutes(suites)
  const OverviewRoutes = overviewRoutes(overview)

  return {
    path: '/',
    component: AppPage(suites, overview),
    indexRoute: {
      component: Home(suites)
    },
    childRoutes: [
      ...OverviewRoutes,
      ...SuiteRoutes
    ]
  }
}
