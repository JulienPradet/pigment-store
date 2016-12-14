import React from 'react'
import PigmentStore from 'pigment-store'
import Zoom from '../../../../../../src/core/display/App/util/View/HorizontalMenu/Zoom'

const aZoomConfig = {
  zoom: 100,
  onChange: function onChange (newZoom) {
    console.log(newZoom)
  }
}

export default PigmentStore.React.describe('Zoom', Zoom)
  .featureJsx(
    'Default',
    <Zoom {...aZoomConfig} />
  )
  .featureJsx(
    'With max value',
    <Zoom {...aZoomConfig} zoom={200} />
  )
  .featureJsx(
    'With min value',
    <Zoom {...aZoomConfig} zoom={10} />
  )
