import React from 'react'
import { Link } from 'react-router'
import FeatureDisplay from './Display.js'
import { makePath } from '../router'
import { SectionTitle } from '../util/View/Title'

export default ({componentName, name, feature}) => {
  return <div>
    <SectionTitle>
      <Link to={'.' + makePath(null, componentName, name)}>
        {name}
      </Link>
    </SectionTitle>

    <FeatureDisplay feature={feature} />
  </div>
}
