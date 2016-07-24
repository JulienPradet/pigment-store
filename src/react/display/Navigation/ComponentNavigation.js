import React from 'react'
import Highlighter from 'react-highlight-words'
import {compose, withProps} from 'recompose'
import {Link} from 'react-router'

import {isMatching, featureContainsSearch} from './index'
import FeatureNavigation from './FeatureNavigation'
import {Container, Item} from '../util/View/SidebarMenu'
import {makePath} from '../router'

const ComponentSubNavigation = ({component, pathPrefix, search, displayAll, isActive}) => <Container>
  {Object.keys(component.features)
    .map((key) => component.features[key])
    .filter((feature) => displayAll || featureContainsSearch(search)(feature))
    .map((feature) => <FeatureNavigation
      key={feature.name}
      pathPrefix={pathPrefix}
      name={feature.name}
      feature={feature}
      search={search}
      isActive={isActive}
    />)}
</Container>

export default compose(
  withProps(({pathPrefix, component}) => ({
    path: makePath(pathPrefix, component.name)
  })),
  withProps(({isActive, path}) => ({
    active: isActive(path)
  }))
)(({component, search, path, active, isActive, displayAll}) => {
  return <Item isActive={active}>
    <Link to={path}>
      <Highlighter
        searchWords={[search]}
        textToHighlight={component.name}
      />
    </Link>
    {active
      ? <ComponentSubNavigation
        component={component}
        pathPrefix={path}
        search={search}
        displayAll={displayAll || isMatching(search, component.name)}
        isActive={isActive}
      />
      : null}
  </Item>
})
