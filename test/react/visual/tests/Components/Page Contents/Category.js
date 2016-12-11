import React from 'react'
import PigmentStore from '../../../../../../src/index'
import Category from '../../../../../../src/core/display/App/Category/Current'
import routerDecorator from '../../.router.decorator'
import configDecorator from '../../.config.decorator'
import displayOptionsDecorator from '../../.displayOptions.decorator'

import fixtures from '../fixtures/index'

export default PigmentStore.React.describe('Category', Category)
  .addDecorator(routerDecorator)
  .addDecorator(configDecorator)
  .addDecorator(displayOptionsDecorator)
  .featureJsx('Default', <Category category={fixtures} pathname='' />)
  .featureJsx(
    'With components',
    (
      <Category category={fixtures.categories[0]} />
    )
  )