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
    component: SuiteGlobal(suite.name, suite)
  },
  childRoutes: Object.keys(suite.components)
    .map((componentName) => suite.components[componentName])
    .map((component) => ({
      path: makePath(suite.name, component.name) + '(/:featureName)',
      component: ComponentGlobal(suite.name, component.name, component)
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
