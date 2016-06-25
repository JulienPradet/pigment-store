import React from 'react'

import Display from './Display'
import {PageTitle} from '../util/View/Title'
import Usage from './Usage'

const Feature = ({name, feature}) => <div>
  <PageTitle>{name}</PageTitle>

  <Display feature={feature} />
  <Usage feature={feature} />
</div>

export default (suiteName, componentName, featureName, feature) => class extends React.Component {
  constructor () {
    super()
    document.title = `${suiteName} | ${componentName} | ${featureName}`
  }

  render () {
    return <Feature {...this.props} name={featureName} feature={feature} />
  }
}
