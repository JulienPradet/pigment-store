import React from 'react'
import PigmentStore from '../../../../../../dist/index'
import Category from '../../../../../../src/react/display/Category/Global'
import {DisplayOptionsProvider} from '../../../../../../src/react/display/DisplayOptions/ContextProvider'
import {ConfigProvider} from '../../../../../../src/react/display/util/ConfigProvider'

import fixtures from '../fixtures/index'

const CategoryWithSubCategories = Category({
  category: fixtures,
  prefix: ''
})

const CategoryWithComponents = Category({
  category: fixtures.categories[0].category,
  prefix: ''
})

export default PigmentStore.React.describe('Category', Category)
  .featureJsx(
    'Default',
    <CategoryWithSubCategories />
  )
  .featureJsx(
    'With components',
    <ConfigProvider config={{}}>
      <DisplayOptionsProvider>
        <CategoryWithComponents />
      </DisplayOptionsProvider>
    </ConfigProvider>
  )
