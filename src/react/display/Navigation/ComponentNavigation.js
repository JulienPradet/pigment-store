import React from 'react'
import {compose, withProps} from 'recompose'
import {Link, withRouter} from 'react-router'

import FeatureNavigation from './FeatureNavigation'
import {Container, Item} from '../util/View/SidebarMenu'
import {componentNameToPath} from '../router'

const ComponentSubNavigation = ({component, pathPrefix}) => <Container>
  {Object.keys(component.features)
    .map((name) => ({name, feature: component.features[name]}))
    .map(({name, feature}) => <FeatureNavigation key={name} pathPrefix={pathPrefix} name={name} feature={feature} />)}
</Container>

export default compose(
  withRouter,
  withProps(({pathPrefix, name}) => ({
    path: `${pathPrefix}/${componentNameToPath(name)}`
  })),
  withProps(({router, path}) => ({
    isActive: router.isActive(path)
  }))
)(({name, component, path, isActive}) => {
  return <Item>
    <Link to={path}>{name}</Link>
    {isActive
      ? <ComponentSubNavigation component={component} pathPrefix={path} />
      : null}
  </Item>
})
