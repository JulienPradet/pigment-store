import React from 'react'
import describe from 'pigment-store/react/describe'
import Zoom from '../../../../../../src/core/display/App/util/View/HorizontalMenu/Zoom'

const aZoomConfig = {
  zoom: 100,
  onChange: function onChange (newZoom) {
    console.log(newZoom)
  }
}

export default describe('Zoom', Zoom)
  .featureJsx(
    'Default',
    () => <Zoom {...aZoomConfig} />
  )
  .featureJsx(
    'With max value',
    () => <Zoom {...aZoomConfig} zoom={200} />
  )
  .featureJsx(
    'With min value',
    () => <Zoom {...aZoomConfig} zoom={10} />
  )
