import React from 'react'
import describe from 'pigment-store/react/describe'
import Component from '../../../../../../src/core/display/App/Component/Current'
import rendererDecorator from '../../__decorators__/.renderer.decorator'
import routerDecorator from '../../__decorators__/.router.decorator'
import configDecorator from '../../__decorators__/.config.decorator'
import displayOptionsDecorator from '../../__decorators__/.displayOptions.decorator'
import fixtures from '../__fixtures__/index'

export default describe('Component', Component)
  .addDecorator(rendererDecorator)
  .addDecorator(routerDecorator)
  .addDecorator(configDecorator)
  .addDecorator(displayOptionsDecorator)
  .featureJsx(
    'Default',
    () => (
      <Component pathname='' component={fixtures.categories[0].components[0]} />
    )
  )
  .featureJsx(
    'With multiple features',
    () => (
      <Component pathname='' component={fixtures.categories[0].components[1]} />
    )
  )
