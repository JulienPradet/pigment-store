import React from 'react'
import getUsage from './definitionToJsx'

const getUsageFromFeature = (feature) => {
  const ComponentProps = feature.props || {}

  return getUsage(feature.Component, ComponentProps)
}

const FeatureUsage = ({feature, component, displayActions = true}) => {
  const importLine = `import ${component.name} from '${component.Component.__PIGMENT_META.file}'\n`
  const usage = `${importLine}\n${getUsageFromFeature(feature)}`

  return <div>
    <div>
      <h3>Usage:</h3>
      <pre className='language-jsx'>
        <code>
          {usage}
        </code>
      </pre>
    </div>
    {displayActions && feature.actions
      ? <div>
        <h5>Actions taken:</h5>
        <pre className='language-jsx'>
          <code>
            {feature.actions.toString()}
          </code>
        </pre>
      </div>
      : null}
  </div>
}

export default FeatureUsage
