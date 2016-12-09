import React from 'react'
import CategoryNavigation from './CategoryNavigation'

const Navigation = ({indexCategory, prefix}) => (
  <CategoryNavigation category={indexCategory} prefix={prefix} parentPathname={prefix} />
)

export default Navigation
