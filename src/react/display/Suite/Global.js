import React from 'react'

import {PageTitle} from '../util/View/Title'
import ComponentList from '../Component/List'

const Suite = ({suite}) => <div>
  <PageTitle>{suite.name}</PageTitle>

  <ComponentList suite={suite} />
</div>

export default (suite) => class extends React.Component {
  constructor () {
    super()
    document.title = suite.name
  }

  render () {
    return <Suite {...this.props} suite={suite} />
  }
}
