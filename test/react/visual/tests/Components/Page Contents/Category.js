import React from 'react'
import PigmentStore from '../../../../../../dist/index'
import Category from '../../../../../../src/react/display/Category/Current'
import {DisplayOptionsProvider} from '../../../../../../src/react/display/DisplayOptions/ContextProvider'
import {ConfigProvider} from '../../../../../../src/react/display/util/ConfigProvider'

import fixtures from '../fixtures/index'

export default PigmentStore.React.describe('Category', Category)
  .featureJsx('Default', <Category category={fixtures} pathname='' />)
  .featureJsx(
    'With components',
    (
      <ConfigProvider config={{}}>
        <DisplayOptionsProvider>
          <Category category={fixtures.categories[0]} />
        </DisplayOptionsProvider>
      </ConfigProvider>
    )
  )
