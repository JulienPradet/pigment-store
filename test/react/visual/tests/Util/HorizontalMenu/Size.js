import React from 'react'
import PigmentStore from 'pigment-store'
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

export default PigmentStore.React.describe('Size', Size)
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
