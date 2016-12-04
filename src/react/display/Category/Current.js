import React from 'react'
import {Link} from 'react-router'
import {PageTitle} from '../util/View/Title'
import CategoryList from './List'
import ComponentList from '../Component/List'
import Card from '../util/View/Card'
import Markdown from '../util/View/Markdown'

class CurrentCategory extends React.Component {
  constructor (props) {
    super()
    document.title = props.category.name
  }

  render () {
    const {category, pathname} = this.props

    const title = <PageTitle>
      <Link to={`${pathname}`}>{category.name}</Link>
    </PageTitle>

    return <div>
      <Card title={title}>
        {category.description ? <Markdown>{category.description}</Markdown> : null}
        {category.categories.length > 0 ? <CategoryList category={category} pathname={pathname} /> : null}
      </Card>

      <ComponentList category={category} pathname={pathname} />
    </div>
  }
}

export default CurrentCategory
