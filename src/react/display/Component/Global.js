import React from 'react'

import {PageTitle} from '../util/View/Title'
import FeatureList from '../Feature/List'

const Component = ({name, component}) => <div>
  <PageTitle>{name}</PageTitle>

  <FeatureList component={component} componentName={name} />
</div>

export default (name, component) => class extends React.Component {
  constructor () {
    super()
    document.title = name
  }

  render () {
    return <Component {...this.props} name={name} component={component} />
  }
}
