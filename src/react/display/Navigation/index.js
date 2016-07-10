import React from 'react'
import {Link} from 'react-router'
import {compose, withState, withHandlers} from 'recompose'
import {Container, MenuTitle, Item} from '../util/View/SidebarMenu'
import {CategorySubNavigation} from './CategoryNavigation'

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

export const categoryContainsSearch = (search) => ({name, category}) => {
  return isMatching(search, name) ||
    category.suites.some(suiteContainsSearch(search)) ||
    category.categories.some(categoryContainsSearch(search))
}

const Navigation = ({search, onSearchChange, indexCategory, isActive}) => <div>
  <MenuTitle><Link to='/'>Pigment Store</Link></MenuTitle>
  <Item>
    <input type='text' value={search} onChange={onSearchChange} placeholder='Search...' />
  </Item>
  <CategorySubNavigation category={indexCategory} pathPrefix='' search={search} isActive={isActive} />
</div>

export default compose(
  withState('search', 'setSearch', ''),
  withHandlers({
    onSearchChange: ({setSearch}) => (event) => setSearch(event.currentTarget.value),
    isActive: ({location}) => (path) => location.pathname.startsWith(path)
  })
)(Navigation)
