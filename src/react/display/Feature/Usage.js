import React from 'react'

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
      <h5>Usage:</h5>
      <pre>{getUsageFromFeature(feature)}</pre>
    </div>
    {displayActions && feature.actions
      ? <div>
        <h5>Actions taken:</h5>
        <pre>{feature.actions.toString()}</pre>
      </div>
      : null}
  </div>
}

export default FeatureUsage
