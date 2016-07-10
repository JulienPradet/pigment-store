import React from 'react'
import {compose, withState, withContext, getContext} from 'recompose'
import presets from './presets'

const displayOptionsContextType = {
  displayOptions: React.PropTypes.object.isRequired,
  setDisplayOptions: React.PropTypes.func.isRequired
}

export const DisplayOptionsProvider = compose(
  withState('displayOptions', 'setDisplayOptions', presets[1].preset),
  withContext(
    displayOptionsContextType,
    ({displayOptions, setDisplayOptions}) => ({
      displayOptions,
      setDisplayOptions
    })
  )
)(({children}) => React.Children.only(children))

export const getDisplayOptions = () => getContext(displayOptionsContextType)
