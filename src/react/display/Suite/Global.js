import React from 'react'

import {PageTitle} from '../util/View/Title'
import ComponentList from '../Component/List'
import Card from '../util/View/Card'

const Suite = ({suite}) => {
  const title = <PageTitle>
    {suite.name}
  </PageTitle>

  return <div>
    <Card title={title} />

    <ComponentList suite={suite} />
  </div>
}

export default (suiteName, suite) => class extends React.Component {
  constructor () {
    super()
    document.title = suiteName
  }

  render () {
    return <Suite {...this.props} suite={suite} />
  }
}
