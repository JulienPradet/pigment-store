import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const resolveComponentDependencies = (Component, suites) => {
  const reliesOn = Component.__PIGMENT_META.dependencies
    .map((file) => {
      const suite = suites.find(({components}) => {
        return Object.keys(components)
          .map((key) => components[key])
          .find(({Component}) => Component.__PIGMENT_META.file === file)
      })

      if (suite) {
        const component = Object.keys(suite.components)
          .map((key) => suite.components[key])
          .find(({Component}) => Component.__PIGMENT_META.file === file)

        return {
          componentName: component.name,
          suiteName: suite.name
        }
      }
    })
    .filter((dependency) => dependency)

  const isReliedOnBy = suites.map((suite) => {
    return Object.keys(suite.components)
      .map((key) => suite.components[key])
      .filter((component) => component.Component.__PIGMENT_META.dependencies.some((file) => file === Component.__PIGMENT_META.file))
      .map(({name}) => ({suiteName: suite.name, componentName: name}))
  }).reduce((acc, reliances) => [...acc, ...reliances], [])

  Component.__PIGMENT_META = Object.assign({},
    Component.__PIGMENT_META,
    { reliesOn, isReliedOnBy }
  )

  return Component
}

const resolveSuiteComponentsDependencies = (components, suites) => {
  return Object.keys(components)
    .map((key) => components[key])
    .map((component) => Object.assign({},
      component,
      { Component: resolveComponentDependencies(component.Component, suites) }
    ))
    .reduce((obj, component) => Object.assign({},
      obj,
      { [component.name]: component }
    ), {})
}

export default (...suites) => {
  suites = suites.map((suite) => Object.assign({},
    suite,
    { components: resolveSuiteComponentsDependencies(suite.components, suites) }
  ))

  ReactDOM.render(
    <App suites={suites} />,
    document.getElementById('tests')
  )
}
