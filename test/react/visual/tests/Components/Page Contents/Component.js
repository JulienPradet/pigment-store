import React from 'react'
import PigmentStore from '../../../../../../dist/index'
import Component from '../../../../../../src/react/display/Component/Global'
import {DisplayOptionsProvider} from '../../../../../../src/react/display/DisplayOptions/ContextProvider'
import {ConfigProvider} from '../../../../../../src/react/display/util/ConfigProvider'

import fixtures from '../fixtures/index'

const ComponentWithDefaultFeature = Component({
  component: fixtures.categories[0].category.components[0],
  prefix: ''
})

const ComponentWithMultipleFeatures = Component({
  component: fixtures.categories[0].category.components[1],
  prefix: ''
})

export default PigmentStore.React.describe('Component', Component)
  .featureJsx(
    'Default',
    <ConfigProvider config={{}}>
      <DisplayOptionsProvider>
        <ComponentWithDefaultFeature />
      </DisplayOptionsProvider>
    </ConfigProvider>
  )
  .featureJsx(
    'With multiple features',
    <ConfigProvider config={{}}>
      <DisplayOptionsProvider>
        <ComponentWithMultipleFeatures />
      </DisplayOptionsProvider>
    </ConfigProvider>
  )
