import React from 'react'
import {Link} from 'react-router'

import {makePath} from '../router'
import * as LinkList from '../util/View/LinkList'

export default ({category, prefix}) => {
  return <LinkList.Container>
    <LinkList.Title>Subcategories</LinkList.Title>
    <LinkList.Content>
      <ul>
        {category.categories.map(({name}) => <li key={name}>
          <Link to={makePath(prefix, category.name, name)}>{name}</Link>
        </li>)}
      </ul>
    </LinkList.Content>
  </LinkList.Container>
}
