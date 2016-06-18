import React from 'react'
import {compose, withHandlers} from 'recompose'
import Size from './Size'
import Zoom from './Zoom'
import Presets from './Presets'
import {getDisplayOptions} from './ContextProvider'
import {Container} from '../util/View/HorizontalMenu'

const presets = [{
  name: 'Small',
  preset: {
    size: {
      width: '360',
      height: 'auto'
    },
    zoom: '100'
  }
}, {
  name: 'Medium',
  preset: {
    size: {
      width: '960',
      height: 'auto'
    },
    zoom: '100'
  }
}, {
  name: 'Large',
  preset: {
    size: {
      width: '1920',
      height: 'auto'
    },
    zoom: '50'
  }
}]

const DisplayOptions = ({displayOptions, updateOptions, setOptions}) => <Container>
  <Size size={displayOptions.size} onChange={updateOptions} />
  <Zoom zoom={displayOptions.zoom} onChange={updateOptions} />
  <Presets presets={presets} onSelect={setOptions} />
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
