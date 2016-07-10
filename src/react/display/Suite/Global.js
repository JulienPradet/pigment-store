import React from 'react'

import {PageTitle} from '../util/View/Title'
import ComponentList from '../Component/List'
import Card from '../util/View/Card'

const Suite = ({suite, prefix}) => {
  const title = <PageTitle>
    {suite.name}
  </PageTitle>

  return <div>
    <Card title={title} />

    <ComponentList suite={suite} prefix={prefix} />
  </div>
}

export default ({suite, prefix}) => class extends React.Component {
  constructor () {
    super()
    document.title = suite.name
  }

  render () {
    return <Suite {...this.props} suite={suite} prefix={prefix} />
  }
}
