import React from 'react'
import {compose, withProps} from 'recompose'
import {Link} from 'react-router'
import Highlighter from 'react-highlight-words'

import {isMatching, suiteContainsSearch, categoryContainsSearch} from './index'
import SuiteNavigation from './SuiteNavigation'
import {Container, Item} from '../util/View/SidebarMenu'
import {makePath} from '../router'

export const CategorySubNavigation = ({category, pathPrefix, search, displayAll, isActive}) => <Container>
  {category.categories
    .filter((category) => displayAll || categoryContainsSearch(search)(category))
    .map(({name, category}) => <CategoryNavigation
      key={name}
      pathPrefix={pathPrefix}
      name={name}
      category={category}
      search={search}
      isActive={isActive}
      displayAll={displayAll}
    />)}
  {category.suites
    .filter((suite) => displayAll || suiteContainsSearch(search)(suite))
    .map((suite) => <SuiteNavigation
      key={suite.name}
      pathPrefix={pathPrefix}
      suite={suite}
      search={search}
      isActive={isActive}
      displayAll={displayAll}
    />)}
</Container>

const CategoryNavigation = compose(
  withProps(({pathPrefix, name}) => ({
    path: makePath(pathPrefix, name)
  })),
  withProps(({isActive, path}) => ({
    active: isActive(path)
  }))
)(({category, name, search, path, active, isActive}) => {
  return <Item isActive={active}>
    <Link to={path}>
      <Highlighter
        searchWords={[search]}
        textToHighlight={name}
      />
    </Link>
    {active
      ? <CategorySubNavigation
        category={category}
        pathPrefix={path}
        search={search}
        displayAll={isMatching(search, name)}
        isActive={isActive}
      />
      : null}
  </Item>
})
