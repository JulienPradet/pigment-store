import React from 'react'
import describe from 'pigment-store/react/describe'
import Size from '../../../../../../src/core/display/App/util/View/HorizontalMenu/Size'

const aSizeConfig = {
  size: {
    width: '1920',
    height: 'auto'
  },
  onChange: function onChange (newSize) {
    console.log(newSize)
  }
}

export default describe('Size', Size)
  .featureJsx(
    'Default',
    <Size {...aSizeConfig} />
  )
  .featureJsx(
    'With auto values',
    <Size {...aSizeConfig} size={{height: 'auto', width: 'auto'}} />
  )
  .featureJsx(
    'With fixed values',
    <Size {...aSizeConfig} size={{height: '720', width: '360'}} />
  )
