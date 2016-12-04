import React from 'react'
import {Match} from 'react-router'
import CurrentCategory from './Current'
import Component from '../Component/Main'

const Category = ({category, pathname}) => {
  return <div>
    <Match
      exactly
      pattern={`${pathname}`}
      render={(matchProps) => <CurrentCategory category={category} pathname={pathname} />}
    />
    <Match
      pattern={`${pathname}/category-:categoryName`}
      render={({pathname, params}) => {
        const categoryName = params.categoryName
        const subCategory = category.categories.find((category) => category.name === categoryName)
        return <Category category={subCategory} pathname={pathname} />
      }}
    />
    <Match
      pattern={`${pathname}/component-:componentName`}
      render={({pathname, params}) => {
        const componentName = params.componentName
        const component = category.components.find((component) => component.name === componentName)
        return <Component component={component} pathname={pathname} />
      }}
    />
  </div>
}

export default Category
