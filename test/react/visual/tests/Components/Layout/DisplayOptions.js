import React from 'react'
import PigmentStore from '../../../../../../src/index'
import displayOptionsDecorator from '../../.displayOptions.decorator'
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