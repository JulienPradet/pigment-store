import React from 'react'
import {Link} from 'react-router'
import {compose, withState, withHandlers} from 'recompose'
import {MenuTitle, Item, Search} from '../util/View/SidebarMenu'
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

export const categoryContainsSearch = (search) => ({name, category}) => {
  return isMatching(search, name) ||
    category.components.some(componentContainsSearch(search)) ||
    category.categories.some(categoryContainsSearch(search))
}

const Navigation = ({search, onSearchChange, indexCategory, isActive}) => <div>
  <MenuTitle><Link to='/'>Pigment Store</Link></MenuTitle>
  <Item>
    <Search search={search} onChange={onSearchChange} />
  </Item>
  <CategorySubNavigation category={indexCategory} pathPrefix='' search={search} isActive={isActive} />
</div>

export default compose(
  withState('search', 'setSearch', ''),
  withHandlers({
    onSearchChange: ({setSearch}) => (search) => setSearch(search),
    isActive: ({location}) => (path) => location.pathname.startsWith(path) || location.pathname.startsWith('/preview' + path)
  })
)(Navigation)
