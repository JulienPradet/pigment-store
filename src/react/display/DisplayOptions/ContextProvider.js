import React from 'react'
import {compose, withState, withContext, getContext} from 'recompose'

const displayOptionsContextType = {
  displayOptions: React.PropTypes.object.isRequired,
  setDisplayOptions: React.PropTypes.func.isRequired
}

export const DisplayOptionsProvider = compose(
  withState('displayOptions', 'setDisplayOptions', {
    size: {
      width: '1000',
      height: 'auto'
    },
    zoom: '50'
  }),
  withContext(
    displayOptionsContextType,
    ({displayOptions, setDisplayOptions}) => ({
      displayOptions,
      setDisplayOptions
    })
  )
)(({children}) => React.Children.only(children))

export const getDisplayOptions = () => getContext(displayOptionsContextType)
