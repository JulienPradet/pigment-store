import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

export default (...suites) => {
  suites.forEach(({components}) => {
    Object.keys(components)
      .map((key) => components[key])
      .forEach(({Component}) => {
        Component.__PIGMENT_META.resolvedDependencies = Component.__PIGMENT_META.dependencies.map((file) => {
          const suite = suites.find(({components}) => {
            return Object.keys(components)
              .map((key) => components[key])
              .find(({Component}) => Component.__PIGMENT_META.file === file)
          })

          const component = Object.keys(suite.components)
            .map((key) => suite.components[key])
            .find(({Component}) => Component.__PIGMENT_META.file === file)

          return {
            componentName: component.name,
            suiteName: suite.name
          }
        })
      })
  })

  ReactDOM.render(
    <App suites={suites} />,
    document.getElementById('tests')
  )
}
