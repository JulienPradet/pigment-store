import React from 'react'
import {Match} from 'react-router'
import SplitMatch from '../util/Router/SplitMatch'

const Category = ({category, pathname}) => {
  return <div>
    <SplitMatch
      exactly
      pattern={`${pathname}`}
      import={() => System.import('./Current').then((module) => module.default)}
      render={(CurrentCategory) => (matchProps) => {
        return <CurrentCategory category={category} pathname={pathname} />
      }}
    />
    <Match
      pattern={`${pathname}/category-:categoryName`}
      render={({pathname, params}) => {
        const categoryName = params.categoryName
        const subCategory = category.categories.find((category) => category.name === categoryName)
        return <Category category={subCategory} pathname={pathname} />
      }}
    />
    <SplitMatch
      pattern={`${pathname}/component-:componentName`}
      import={() => System.import('../Component/Main').then((module) => module.default)}
      render={(Component) => ({pathname, params}) => {
        const componentName = params.componentName
        const component = category.components.find((component) => component.name === componentName)
        return <Component component={component} pathname={pathname} />
      }}
    />
  </div>
}

export default Category
