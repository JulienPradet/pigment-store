import React from 'react'
import {Link} from 'react-router'
import * as LinkList from '../util/View/LinkList'

export default ({category, pathname}) => {
  return <LinkList.Container>
    <LinkList.Title>Subcategories</LinkList.Title>
    <LinkList.Content>
      <ul>
        {category.categories.map(({name}) => <li key={name}>
          <Link to={`${pathname}/category-${name}`}>{name}</Link>
        </li>)}
      </ul>
    </LinkList.Content>
  </LinkList.Container>
}
