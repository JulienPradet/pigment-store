import React from 'react'
import CategoryNavigation from './CategoryNavigation'

const Navigation = ({indexCategory, prefix}) => (
  <CategoryNavigation category={indexCategory} prefix={prefix} parentPattern={prefix} />
)

export default Navigation
