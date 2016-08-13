import React from 'react'
import Markdown from '../util/View/Markdown'
import getUsage from './definitionToJsx'

const getUsageFromFeature = (feature, component) => {
  const ComponentProps = feature.props || {}

  return getUsage(component.Component, ComponentProps)
}

const FeatureUsage = ({feature, component, displayActions = true}) => {
  return <div>
    <div>
      <h3>Usage:</h3>
      <Markdown>
        ```jsx
        {getUsageFromFeature(feature, component)}
        ```
      </Markdown>
    </div>
    {displayActions && feature.actions
      ? <div>
        <h5>Actions taken:</h5>
        <Markdown>
          ```jsx
          {feature.actions.toString()}
          ```
        </Markdown>
      </div>
      : null}
  </div>
}

export default FeatureUsage
