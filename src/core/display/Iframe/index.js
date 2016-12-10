import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {RendererProvider} from '../util/Renderer'

const extractFeaturesFromComponent = (pathname = '', component) => {
  return component.features.map((feature) => ({
    pathname: `${pathname}/feature-${feature.name}`,
    component: component,
    feature: feature
  }))
}

const extractFeaturesFromCategory = (pathname = '', category) => {
  return [
    ...category.categories
      .map((category) => extractFeaturesFromCategory(`${pathname}/category-${category.name}`, category))
      .reduce((acc, array) => [...acc, ...array], []),
    ...category.components
      .map((component) => extractFeaturesFromComponent(`${pathname}/component-${component.name}`, component))
      .reduce((acc, array) => [...acc, ...array], [])
  ]
}

export default (rendererOptions) => (indexCategory) => {
  const features = extractFeaturesFromCategory('', indexCategory)

  ReactDOM.render(
    <RendererProvider {...rendererOptions}>
      <div>
        <App features={features} />
      </div>
    </RendererProvider>,
    document.getElementById('tests'),
    typeof window.renderCallback === 'function' && window.renderCallback()
  )
}
