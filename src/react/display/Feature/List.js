import React from 'react'

import FeaturePreview from './Preview'
import {makePath} from '../router'

const FeatureList = ({component, prefix}) => <div>
  {Object.keys(component.features)
    .map((name) => ({name, feature: component.features[name]}))
    .map(({name, feature}) => <FeaturePreview
      key={name}
      prefix={makePath(prefix, component.name)}
      name={name}
      feature={feature}
    />)}
</div>

export default FeatureList
