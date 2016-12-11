import React from 'react'
import PigmentStore from 'pigment-store'
import Category from '../../../../../../src/core/display/App/Category/Current'
import routerDecorator from '../../__decorators__/.router.decorator'
import configDecorator from '../../__decorators__/.config.decorator'
import displayOptionsDecorator from '../../__decorators__/.displayOptions.decorator'

import fixtures from '../__fixtures__/index'

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
