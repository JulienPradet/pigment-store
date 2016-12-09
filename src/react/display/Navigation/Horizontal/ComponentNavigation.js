import React from 'react'
import {Match, Miss, Link} from 'react-router'
import {Container, Item} from '../../util/View/HorizontalList'
import FeatureNavigation from './FeatureNavigation'
import ChildrenLinks from './ChildrenLinks'

const extractComponentChildren = (prefix, component) => (
  component.features.map((feature) => ({
    pattern: `${prefix}/feature-${feature.name}`,
    name: feature.name,
    render: ({pattern}) => <FeatureNavigation parentPattern={prefix} feature={feature} />
  }))
)

const ComponentNavigation = ({component, prefix, parentPattern}) => (
  <Container>
    <Item>
      <Link to={parentPattern}>{component.name}</Link>
    </Item>
    {extractComponentChildren(prefix, component).map(({pattern, render}) => (
      <Match key={pattern} pattern={pattern} render={(...args) => <Item>{render(...args)}</Item>} />
    ))}
    <Miss render={() => (
      <Item>
        <ChildrenLinks children={extractComponentChildren(prefix, component)} />
      </Item>
    )} />
  </Container>
)

export default ComponentNavigation
