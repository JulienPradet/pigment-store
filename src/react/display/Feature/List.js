import React from 'react'

import FeaturePreview from './Preview'

export default ({component, componentName}) => <div>
  {Object.keys(component.features)
    .map((name) => ({name, feature: component.features[name]}))
    .map(({name, feature}) => <FeaturePreview
      key={name}
      componentName={componentName}
      name={name}
      feature={feature}
    />)}
</div>
