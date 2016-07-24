import React from 'react'
import ReactDOM from 'react-dom'
import compose from 'lodash/flow'
import App from './App'

const extractComponentsFromCategory = (prefix = []) => (category) => {
  return [
    ...category.categories
      .map(({name, category}) => extractComponentsFromCategory([...prefix, name])(category))
      .reduce((acc, array) => [...acc, ...array], []),
    ...category.components
      .map((component) => ({
        path: [...prefix, component.name],
        component
      }))
  ]
}

const resolveComponentDependencies = ({path, component}, components) => {
  const currentFile = component.Component.__PIGMENT_META.file
  const currentDependencies = component.Component.__PIGMENT_META.dependencies

  const reliesOn = currentDependencies
    .map((file) => components.find(({component}) => component.Component.__PIGMENT_META.file === file))
    .filter((dependency) => dependency)

  const isReliedOnBy = components
    .filter(({component}) => component.Component.__PIGMENT_META.dependencies.some((file) => file === currentFile))

  component.Component.__PIGMENT_META = Object.assign({},
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

const definePreviews = (components) => components
  .map(({path, component}) => {
    return Object.keys(component.features)
      .map((key) => component.features[key])
      .map((feature) => ({
        path: [...path, feature.name],
        feature
      }))
  })
  .reduce((acc, array) => [...acc, ...array], [])

export default (indexCategory) => {
  const previews = compose(
    extractComponentsFromCategory(),
    resolveDependencies,
    definePreviews
  )(indexCategory)

  ReactDOM.render(
    <App indexCategory={indexCategory} previews={previews} />,
    document.getElementById('tests')
  )
}
