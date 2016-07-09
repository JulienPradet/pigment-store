import slug from 'slug'
import React from 'react'

import AppPage from './AppPage'
import Home from './Home'
import {Global as SuiteGlobal} from './Suite'
import {Global as ComponentGlobal} from './Component'
import FeatureDisplay from './Feature/Display'

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

export const makeFeatureView = (suiteName, componentName, featureName) => {
  return `/preview${makePath(suiteName, componentName, featureName)}`
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

const previewRoute = (suites) => [
  {
    path: '/preview/:suiteName/:componentName/:featureName',
    component: (props) => {
      const suiteName = props.params.suiteName
      const componentName = props.params.componentName
      const featureName = props.params.featureName

      const suite = suites.find((suite) => suiteNameToPath(suite.name) === suiteName)

      const component = Object.keys(suite.components)
        .map((key) => suite.components[key])
        .find((component) => componentNameToPath(component.name) === componentName)

      const feature = Object.keys(component.features)
        .map((key) => component.features[key])
        .find((feature) => featureNameToPath(feature.name) === featureName)

      return <FeatureDisplay {...props} feature={feature} />
    }
  }
]

export const makeRoutesFromDefinition = ({suites, overview}) => {
  const SuiteRoutes = suiteRoutes(suites)
  const PreviewRoute = previewRoute(suites)
  const OverviewRoutes = overviewRoutes(overview)

  return {
    path: '/',
    component: AppPage(suites, overview),
    indexRoute: {
      component: Home(suites)
    },
    childRoutes: [
      ...OverviewRoutes,
      ...PreviewRoute,
      ...SuiteRoutes
    ]
  }
}
