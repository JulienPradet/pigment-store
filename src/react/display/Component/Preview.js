import React from 'react'
import { Link } from 'react-router'
import FeatureDisplay from '../Feature/Display.js'
import { makePath } from '../router'
import { SectionTitle } from '../util/View/Title'

export default ({suite, name, component}) => {
  let featureToDisplay = component.features.Default
  if (!featureToDisplay) {
    const firstKey = Object.keys(component.features)[0]
    featureToDisplay = component.features[firstKey]
  }

  return <div>
    <SectionTitle>
      <Link to={makePath(suite.name, name)}>
        {name}
      </Link>
    </SectionTitle>

    <FeatureDisplay feature={featureToDisplay} />
  </div>
}
