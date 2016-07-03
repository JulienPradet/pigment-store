import React from 'react'
import {Link} from 'react-router'
import {compose, withState, withHandlers} from 'recompose'
import {Container, MenuTitle, Item} from '../util/View/SidebarMenu'
import SuiteNavigation from './SuiteNavigation'

export const isMatching = (search, name) => name.match(new RegExp(search, 'i'))

export const featureContainsSearch = (search) => feature => {
  return isMatching(search, feature.name)
}

export const componentContainsSearch = (search) => (component) => {
  return isMatching(search, component.name) ||
    Object.keys(component.features)
      .map((key) => component.features[key])
      .some(featureContainsSearch(search))
}

export const suiteContainsSearch = (search) => (suite) => {
  return isMatching(search, suite.name) ||
    Object.keys(suite.components)
      .map((key) => suite.components[key])
      .some(componentContainsSearch(search))
}

const Navigation = ({search, onSearchChange, suites}) => <div>
  <MenuTitle><Link to='/'>Pigment Store</Link></MenuTitle>
  <Container>
    <Item>
      <input type='text' value={search} onChange={onSearchChange} placeholder="Search..."/>
    </Item>
  </Container>
  <Container>
    {suites
      .filter(suiteContainsSearch(search))
      .map((suite) => <SuiteNavigation key={suite.name} pathPrefix='/' suite={suite} search={search} />)}
  </Container>
</div>

export default compose(
  withState('search', 'setSearch', ''),
  withHandlers({
    onSearchChange: ({setSearch}) => (event) => setSearch(event.currentTarget.value)
  })
)(Navigation)
