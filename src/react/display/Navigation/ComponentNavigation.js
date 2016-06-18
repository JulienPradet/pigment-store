import React from 'react'
import Highlighter from 'react-highlight-words'
import {compose, withProps} from 'recompose'
import {Link, withRouter} from 'react-router'

import {featureContainsSearch} from './index'
import FeatureNavigation from './FeatureNavigation'
import {Container, Item} from '../util/View/SidebarMenu'
import {componentNameToPath} from '../router'

const ComponentSubNavigation = ({component, pathPrefix, search}) => <Container>
  {Object.keys(component.features)
    .map((key) => component.features[key])
    .filter(featureContainsSearch(search))
    .map((feature) => <FeatureNavigation key={feature.name} pathPrefix={pathPrefix} name={feature.name} feature={feature} search={search} />)}
</Container>

export default compose(
  withRouter,
  withProps(({pathPrefix, name}) => ({
    path: `${pathPrefix}/${componentNameToPath(name)}`
  })),
  withProps(({router, path}) => ({
    isActive: router.isActive(path)
  }))
)(({name, component, search, path, isActive}) => {
  return <Item isActive={isActive}>
    <Link to={path}>
      <Highlighter
        searchWords={[search]}
        textToHighlight={name}
      />
    </Link>
    {isActive
      ? <ComponentSubNavigation component={component} pathPrefix={path} search={search} />
      : null}
  </Item>
})
