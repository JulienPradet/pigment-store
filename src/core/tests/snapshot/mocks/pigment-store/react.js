/* global describe it expect */
import React from 'react'
import renderer from 'react-test-renderer'

const runTest = (componentName, featureName, decorators, render, actions) => {
  describe(componentName, () => {
    it(featureName, () => {
      const finalRender = decorators.reduce(
        (finalRender, decorator) => decorator(finalRender),
        render
      )
      const component = renderer.create(finalRender())
      expect(component.toJSON()).toMatchSnapshot()
    })
  })
}

const Component = (componentName, Component) => {
  const decorators = []

  return {
    setDescription () {
      return this
    },
    addDecorator (decorator) {
      decorators.push(decorator)
      return this
    },
    feature (featureName, props, actions) {
      runTest(componentName, featureName, decorators, () => <Component {...props} />, actions)
      return this
    },
    featureJsx (featureName, jsx, actions) {
      runTest(componentName, featureName, decorators, () => jsx, actions)
      return this
    }
  }
}

export default {
  describe: Component
}
