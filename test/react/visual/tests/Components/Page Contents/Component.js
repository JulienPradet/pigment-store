import React from 'react'
import PigmentStore from '../../../../../../dist/index'
import Component from '../../../../../../src/react/display/Component/Current'
import {DisplayOptionsProvider} from '../../../../../../src/react/display/DisplayOptions/ContextProvider'
import {ConfigProvider} from '../../../../../../src/react/display/util/ConfigProvider'

import fixtures from '../fixtures/index'

export default PigmentStore.React.describe('Component', Component)
  .featureJsx(
    'Default',
    (
      <ConfigProvider config={{}}>
        <DisplayOptionsProvider>
          <Component pathname='' component={fixtures.categories[0].components[0]} />
        </DisplayOptionsProvider>
      </ConfigProvider>
    )
  )
  .featureJsx(
    'With multiple features',
    (
      <ConfigProvider config={{}}>
        <DisplayOptionsProvider>
          <Component pathname='' component={fixtures.categories[0].components[1]} />
        </DisplayOptionsProvider>
      </ConfigProvider>
    )
  )
