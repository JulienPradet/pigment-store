import React from 'react'
import getUsage from './definitionToJsx'
import Code from '../../core/display/App/util/View/Code'

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
      <Code lang='jsx'>
        {usage}
      </Code>
    </div>
    {displayActions && feature.actions
      ? <div>
        <h5>Actions taken:</h5>
        <Code lang='jsx'>
          {feature.actions.toString()}
        </Code>
      </div>
      : null}
  </div>
}

export default FeatureUsage
