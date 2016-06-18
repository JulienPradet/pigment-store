import React from 'react'
import {compose, withProps} from 'recompose'
import {Link, withRouter} from 'react-router'
import Highlighter from 'react-highlight-words'

import {componentContainsSearch} from './index'
import ComponentNavigation from './ComponentNavigation'
import {Container, Item} from '../util/View/SidebarMenu'
import {suiteNameToPath} from '../router'

const SuiteSubNavigation = ({suite, pathPrefix, search}) => <Container>
  {Object.keys(suite.components)
    .map((key) => suite.components[key])
    .filter(componentContainsSearch(search))
    .map((component) => <ComponentNavigation key={component.name} pathPrefix={pathPrefix} name={component.name} component={component} search={search} />)}
</Container>

export default compose(
  withRouter,
  withProps(({pathPrefix, suite}) => ({
    path: `${pathPrefix}${suiteNameToPath(suite.name)}`
  })),
  withProps(({router, suite, path}) => ({
    isActive: router.isActive(path)
  }))
)(({suite, search, path, isActive}) => {
  return <Item isActive={isActive}>
    <Link to={path}>
      <Highlighter
        searchWords={[search]}
        textToHighlight={suite.name}
      />
    </Link>
    {isActive
      ? <SuiteSubNavigation suite={suite} pathPrefix={path} search={search} />
      : null}
  </Item>
})
