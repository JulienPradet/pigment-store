import React from 'react'

import {PageTitle} from '../util/View/Title'
import ComponentList from '../Component/List'

const Suite = ({suite}) => <div>
  <PageTitle>{suite.name}</PageTitle>

  <ComponentList suite={suite} />
</div>

export default (suiteName, suite) => class extends React.Component {
  constructor () {
    super()
    document.title = suiteName
  }

  render () {
    return <Suite {...this.props} suite={suite} />
  }
}
