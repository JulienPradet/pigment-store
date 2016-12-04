import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ConfigProvider} from './util/ConfigProvider'

const extractComponentsFromCategory = (path = []) => (category) => {
  return [
    ...category.categories
      .map((category) => extractComponentsFromCategory([...path, category.name])(category))
      .reduce((acc, array) => [...acc, ...array], []),
    ...category.components
      .map((component) => ({
        path: [...path, component.name],
        component
      }))
  ]
}

const resolveComponentDependencies = ({path, component}, components) => {
  const currentFile = component.Component.__PIGMENT_META.file
  const currentDependencies = component.Component.__PIGMENT_META.dependencies

  const reliesOn = currentDependencies
    .map((file) => components.find(({component}) => {
      return component.Component.__PIGMENT_META.file === file
    }))
    .filter((dependency) => dependency)

  const isReliedOnBy = components
    .filter(({component}) => component.Component.__PIGMENT_META.dependencies.some((file) => file === currentFile))

  component.Component.__PIGMENT_META = Object.assign(
    {},
    component.Component.__PIGMENT_META,
    { reliesOn, isReliedOnBy }
  )

  return {
    path,
    component
  }
}

const resolveDependencies = (components) => components.map(
  ({path, component}) => resolveComponentDependencies({path, component}, components)
)

export default (indexCategory, config) => {
  const components = extractComponentsFromCategory()(indexCategory)
  resolveDependencies(components)

  ReactDOM.render(
    <ConfigProvider config={config}>
      <App indexCategory={indexCategory} />
    </ConfigProvider>,
    document.getElementById('tests')
  )
}
