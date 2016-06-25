import React from 'react'
import Highlighter from 'react-highlight-words'
import {compose, withProps} from 'recompose'
import {Link, withRouter} from 'react-router'

import {isMatching, featureContainsSearch} from './index'
import FeatureNavigation from './FeatureNavigation'
import {Container, Item} from '../util/View/SidebarMenu'
import {componentNameToPath} from '../router'

const ComponentSubNavigation = ({component, pathPrefix, search, displayAll}) => <Container>
  {Object.keys(component.features)
    .map((key) => component.features[key])
    .filter((feature) => displayAll || featureContainsSearch(search)(feature))
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
)(({name, component, search, path, isActive, displayAll}) => {
  return <Item isActive={isActive}>
    <Link to={path}>
      <Highlighter
        searchWords={[search]}
        textToHighlight={name}
      />
    </Link>
    {isActive
      ? <ComponentSubNavigation component={component} pathPrefix={path} search={search} displayAll={displayAll || isMatching(search, name)} />
      : null}
  </Item>
})
