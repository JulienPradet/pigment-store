import React from 'react'
import {compose, withProps} from 'recompose'
import {Link, withRouter} from 'react-router'

import ComponentNavigation from './ComponentNavigation'
import {Container, Item} from '../util/View/SidebarMenu'
import {suiteNameToPath} from '../router'

const SuiteSubNavigation = ({suite, pathPrefix}) => <Container>
  {Object.keys(suite.components)
    .map((name) => ({name, component: suite.components[name]}))
    .map(({name, component}) => <ComponentNavigation key={name} pathPrefix={pathPrefix} name={name} component={component} />)}
</Container>

export default compose(
  withRouter,
  withProps(({pathPrefix, suite}) => ({
    path: `${pathPrefix}${suiteNameToPath(suite.name)}`
  })),
  withProps(({router, suite, path}) => ({
    isActive: router.isActive(path)
  }))
)(({suite, path, isActive}) => {
  return <Item>
    <Link to={path}>{suite.name}</Link>
    {isActive
      ? <SuiteSubNavigation suite={suite} pathPrefix={path} />
      : null}
  </Item>
})
