import React from 'react'
import PigmentStore from '../../../../../../src/index'
import Component from '../../../../../../src/core/display/App/Component/Current'
import routerDecorator from '../../.router.decorator'
import configDecorator from '../../.config.decorator'
import displayOptionsDecorator from '../../.displayOptions.decorator'
import fixtures from '../fixtures/index'

export default PigmentStore.React.describe('Component', Component)
  .addDecorator(routerDecorator)
  .addDecorator(configDecorator)
  .addDecorator(displayOptionsDecorator)
  .featureJsx(
    'Default',
    (
      <Component pathname='' component={fixtures.categories[0].components[0]} />
    )
  )
  .featureJsx(
    'With multiple features',
    (
      <Component pathname='' component={fixtures.categories[0].components[1]} />
    )
  )
