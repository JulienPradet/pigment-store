import React from 'react'
import {compose, withState, withContext, getContext} from 'recompose'

const displayOptionsContextType = {
  displayOptions: React.PropTypes.object.isRequired,
  setDisplayOptions: React.PropTypes.func.isRequired
}

export const DisplayOptionsProvider = compose(
  withState('displayOptions', 'setDisplayOptions', {
    size: {
      width: 'auto',
      height: 'auto'
    },
    zoom: 100
  }),
  withContext(
    displayOptionsContextType,
    ({displayOptions, setDisplayOptions}) => ({
      displayOptions,
      setDisplayOptions
    })
  )
)(({children}) => React.Children.only(children))
DisplayOptionsProvider.displayName = 'DisplayOptionsProvider'

export const getDisplayOptions = () => getContext(displayOptionsContextType)
