import React from 'react'
import Markdown from '../util/View/Markdown'

const getUsageFromFeature = (feature, component) => {
  const ComponentName = component.name
  const ComponentProps = feature.props || {}

  const propTypes = Object.keys(ComponentProps)
    .filter((key) => key !== 'children')
    .map((key) => `${key}="${ComponentProps[key]}"`)

  if (ComponentProps.hasOwnProperty('children')) {
    return `<${ComponentName} ${propTypes.join(' ')}>
  ${ComponentProps.children}
</${ComponentName}>`
  } else {
    return `<${ComponentName} ${propTypes.join(' ')} />`
  }
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
