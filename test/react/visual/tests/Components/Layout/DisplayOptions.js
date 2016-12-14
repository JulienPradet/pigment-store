import React from 'react'
import PigmentStore from 'pigment-store'
import displayOptionsDecorator from '../../__decorators__/.displayOptions.decorator'
import DisplayOptions from '../../../../../../src/core/display/App/DisplayOptions/index'

export default PigmentStore.React.describe('DisplayOptions', DisplayOptions)
  .setDescription(`
The left navigation that allows to explore the styleguide
  `)
  .addDecorator(displayOptionsDecorator)
  .featureJsx(
    'Default',
    (
      <DisplayOptions />
    )
  )
