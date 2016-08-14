import React from 'react'

import {PageTitle} from '../util/View/Title'
import CategoryList from './List'
import ComponentList from '../Component/List'
import Card from '../util/View/Card'
import Markdown from '../util/View/Markdown'

const Category = ({category, prefix}) => {
  const title = <PageTitle>
    {category.name}
  </PageTitle>

  return <div>
    <Card title={title}>
      {category.description ? <Markdown>{category.description}</Markdown> : null}
      {category.categories.length > 0 ? <CategoryList category={category} prefix={prefix} /> : null}
    </Card>

    <ComponentList category={category} prefix={prefix} />
  </div>
}

export default ({category, prefix}) => {
  const result = class extends React.Component {
    constructor () {
      super()
      document.title = category.name
    }

    render () {
      return <Category {...this.props} category={category} prefix={prefix} />
    }
  }

  result.displayName = 'Category'

  return result
}
