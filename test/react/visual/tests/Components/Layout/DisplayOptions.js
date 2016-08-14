import React from 'react'
import PigmentStore from '../../../../../../dist/index'
import {DisplayOptionsProvider} from '../../../../../../src/react/display/DisplayOptions/ContextProvider'
import DisplayOptions from '../../../../../../src/react/display/DisplayOptions/index'

export default PigmentStore.React.describe('DisplayOptions', DisplayOptions)
  .setDescription(`
The left navigation that allows to explore the styleguide
  `)
  .featureJsx(
    'Default',
    <DisplayOptionsProvider>
      <DisplayOptions />
    </DisplayOptionsProvider>
  )
