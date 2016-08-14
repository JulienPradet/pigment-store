import React from 'react'
import {compose, withHandlers} from 'recompose'
import Size from '../util/View/HorizontalMenu/Size'
import Zoom from '../util/View/HorizontalMenu/Zoom'
import PresetList from '../util/View/HorizontalMenu/Preset'
import {getDisplayOptions} from './ContextProvider'
import {Container, Group} from '../util/View/HorizontalMenu'
import presets from './presets'

const DisplayOptions = ({displayOptions, updateOptions, setOptions}) => <Container>
  <Group>
    <Size size={displayOptions.size} onChange={updateOptions} />
  </Group>
  <Group>
    <Zoom zoom={displayOptions.zoom} onChange={updateOptions} />
  </Group>
  <Group>
    <PresetList selected={displayOptions} presets={presets} onSelect={setOptions} />
  </Group>
</Container>

const SmartDisplayOptions = compose(
  getDisplayOptions(),
  withHandlers({
    updateOptions: ({setDisplayOptions, displayOptions}) => (options) => {
      setDisplayOptions(Object.assign(
        {},
        displayOptions,
        options
      ))
    },
    setOptions: ({setDisplayOptions}) => (options) => {
      setDisplayOptions(options)
    }
  })
)(DisplayOptions)

SmartDisplayOptions.displayName = 'DisplayOptions'

export default SmartDisplayOptions
