import React from 'react'
import {compose, withProps} from 'recompose'
import {Link} from 'react-router'
import Highlighter from 'react-highlight-words'

import {isMatching, componentContainsSearch} from './index'
import ComponentNavigation from './ComponentNavigation'
import {Container, Item} from '../util/View/SidebarMenu'
import {makePath} from '../router'

const SuiteSubNavigation = ({suite, pathPrefix, search, displayAll, isActive}) => <Container>
  {Object.keys(suite.components)
    .map((key) => suite.components[key])
    .filter((component) => displayAll || componentContainsSearch(search)(component))
    .map((component) => <ComponentNavigation
      key={component.name}
      pathPrefix={pathPrefix}
      name={component.name}
      component={component}
      search={search}
      displayAll={displayAll}
      isActive={isActive}
    />)}
</Container>

export default compose(
  withProps(({pathPrefix, suite}) => ({
    path: makePath(pathPrefix, suite.name)
  })),
  withProps(({isActive, path}) => ({
    active: isActive(path)
  }))
)(({suite, search, path, active, isActive, displayAll}) => {
  return <Item isActive={active}>
    <Link to={path}>
      <Highlighter
        searchWords={[search]}
        textToHighlight={suite.name}
      />
    </Link>
    {active
      ? <SuiteSubNavigation
        suite={suite}
        pathPrefix={path}
        search={search}
        displayAll={displayAll || isMatching(search, suite.name)}
        isActive={isActive}
      />
      : null}
  </Item>
})
