import React from 'react'
import {Link} from 'react-router'
import {compose, withState, withHandlers} from 'recompose'
import {MenuTitle, Item, Search} from '../../util/View/SidebarMenu'
import {CategorySubNavigation} from './CategoryNavigation'

export const isMatching = (search, name) => search !== '' && name.match(new RegExp(search, 'i'))

export const featureContainsSearch = (search) => feature => {
  return isMatching(search, feature.name)
}

export const componentContainsSearch = (search) => (component) => {
  return isMatching(search, component.name) ||
    component.features.some(featureContainsSearch(search))
}

export const categoryContainsSearch = (search) => (category) => {
  return isMatching(search, category.name) ||
      category.components.some(componentContainsSearch(search)) ||
      category.categories.some(categoryContainsSearch(search))
}

const Navigation = ({search, onSearchChange, indexCategory, isActive, prefix = ''}) => <div>
  <MenuTitle><Link to='/'>Pigment Store</Link></MenuTitle>
  <Item>
    <Search search={search} onChange={onSearchChange} />
  </Item>
  <Item>
    <CategorySubNavigation category={indexCategory} pathname={prefix} search={search} />
  </Item>
</div>

const SmartNavigation = compose(
  withState('search', 'setSearch', ''),
  withHandlers({
    onSearchChange: ({setSearch}) => (search) => setSearch(search)
  })
)(Navigation)

SmartNavigation.displayName = 'Navigation'

export default SmartNavigation
