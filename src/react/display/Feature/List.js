import React from 'react'

import FeaturePreview from './Preview'

const FeatureList = ({component, componentName, suiteName}) => <div>
  {Object.keys(component.features)
    .map((name) => ({name, feature: component.features[name]}))
    .map(({name, feature}) => <FeaturePreview
      key={name}
      suiteName={suiteName}
      componentName={componentName}
      name={name}
      feature={feature}
    />)}
</div>

export default FeatureList
