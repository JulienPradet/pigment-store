import React from 'react'
import PigmentStore from '../../../../../dist/index'
import Meta from '../../../../../src/core/display/App/util/View/Meta/index'

export default PigmentStore.React.describe('Meta', Meta)
  .featureJsx(
    'Default',
    <Meta>Faded text</Meta>
  )
