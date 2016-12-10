import React from 'react'
import Markdown from '../../core/display/App/util/View/Markdown'
import getUsage from './definitionToJsx'

const getUsageFromFeature = (feature) => {
  const ComponentProps = feature.props || {}

  return getUsage(feature.Component, ComponentProps)
}

const FeatureUsage = ({feature, component, displayActions = true}) => {
  const importLine = `import ${component.name} from '${component.Component.__PIGMENT_META.file}'\n`

  return <div>
    <div>
      <h3>Usage:</h3>
      <Markdown>
        ```jsx
        {importLine}

        {getUsageFromFeature(feature)}
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
