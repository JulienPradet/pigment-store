import React from 'react'
import PigmentStore from '../../../../../../dist/index'
import PresetList from '../../../../../../src/core/display/App/util/View/HorizontalMenu/Preset'

const aPresetListConfig = {
  presets: [{
    label: 'S',
    preset: {
      size: {
        width: '360',
        height: 'auto'
      },
      zoom: '100'
    }
  }, {
    label: 'M',
    preset: {
      size: {
        width: '960',
        height: 'auto'
      },
      zoom: '100'
    }
  }, {
    label: 'L',
    preset: {
      size: {
        width: '1920',
        height: 'auto'
      },
      zoom: '50'
    }
  }],
  onSelect: function onSelect (newPreset) {
    console.log(newPreset)
  }
}

export default PigmentStore.React.describe('PresetList', PresetList)
  .featureJsx(
    'Default',
    <PresetList {...aPresetListConfig} />
  )
  .featureJsx(
    'With selected preset',
    <PresetList {...aPresetListConfig} selected={aPresetListConfig.presets[1].preset} />
  )
