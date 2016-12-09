import React from 'react'
import {Match, Miss, Link} from 'react-router'
import {Container, Item} from '../../util/View/HorizontalList'
import ComponentNavigation from './ComponentNavigation'
import ChildrenLinks from './ChildrenLinks'

const extractCategoryChildren = (prefix, category) => [
  ...category.categories.map((category) => ({
    pattern: `${prefix}/category-${category.name}`,
    name: category.name,
    render: ({pathname}) => <CategoryNavigation prefix={pathname} parentPathname={prefix} category={category} />
  })),
  ...category.components.map((component) => ({
    pattern: `${prefix}/component-${component.name}`,
    name: component.name,
    render: ({pathname}) => <ComponentNavigation prefix={pathname} parentPathname={prefix} component={component} />
  }))
]

const CategoryNavigation = ({category, prefix, parentPathname}) => (
  <Container>
    <Item>
      <Link to={parentPathname}>{category.name}</Link>
    </Item>
    {extractCategoryChildren(prefix, category).map(({pattern, render}) => (
      <Match key={pattern} pattern={pattern} render={(...args) => <Item>{render(...args)}</Item>} />
    ))}
    <Miss render={() => (
      <Item>
        <ChildrenLinks children={extractCategoryChildren(prefix, category)} />
      </Item>
    )} />
  </Container>
)

export default CategoryNavigation
