import React from 'react'
import FeaturePreview from './Preview'

const FeatureList = ({component, pathname}) => <div>
  {component.features
    .map((feature) => <FeaturePreview
      key={feature.name}
      feature={feature}
      component={component}
      pathname={pathname}
    />)}
</div>

export default FeatureList
