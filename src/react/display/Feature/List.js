import React from 'react'
import FeaturePreview from './Preview'

const FeatureList = ({component}) => <div>
  {component.features
    .map((feature) => <FeaturePreview
      key={feature.name}
      feature={feature}
      component={component}
    />)}
</div>

export default FeatureList
