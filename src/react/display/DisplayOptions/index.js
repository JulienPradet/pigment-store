import React from 'react'
import {compose, withHandlers} from 'recompose'
import Size from './Size'
import Zoom from './Zoom'
import {PresetList} from '../util/View/HorizontalMenu/Preset'
import {getDisplayOptions} from './ContextProvider'
import {Container} from '../util/View/HorizontalMenu'
import presets from './presets'

const DisplayOptions = ({displayOptions, updateOptions, setOptions}) => <Container>
  <Size size={displayOptions.size} onChange={updateOptions} />
  <Zoom zoom={displayOptions.zoom} onChange={updateOptions} />
  <PresetList selected={displayOptions} presets={presets} onSelect={setOptions} />
</Container>

export default compose(
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
