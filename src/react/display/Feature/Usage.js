import React from 'react'
import Markdown from '../util/View/Markdown'

const getUsageFromFeature = (feature) => {
  const ComponentName = feature.Component.name
  const ComponentProps = feature.props || {}

  const propTypes = Object.keys(ComponentProps)
    .filter((key) => key !== 'children')
    .map((key) => `${key}='${ComponentProps[key]}'`)

  if (ComponentProps.hasOwnProperty('children')) {
    return `<${ComponentName} ${propTypes.join(' ')}>${ComponentProps.children}</${ComponentName}>`
  } else {
    return `<${ComponentName} ${propTypes.join(' ')} />`
  }
}

const FeatureUsage = ({feature, displayActions = true}) => {
  return <div>
    <div>
      <h3>Usage:</h3>
      <Markdown>
        ```
        {getUsageFromFeature(feature)}
        ```
      </Markdown>
    </div>
    {displayActions && feature.actions
      ? <div>
        <h5>Actions taken:</h5>
        <Markdown>
          ```
          {feature.actions.toString()}
          ```
        </Markdown>
      </div>
      : null}
  </div>
}

export default FeatureUsage
