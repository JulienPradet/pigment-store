import React from 'react'
import describe from 'pigment-store/react/describe'
import Meta from '../../../../../src/core/display/App/util/View/Meta/index'

export default describe('Meta', Meta)
  .featureJsx(
    'Default',
    () => <Meta>Faded text</Meta>
  )
