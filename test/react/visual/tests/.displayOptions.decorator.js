import React from 'react'
import {DisplayOptionsProvider} from '../../../../src/react/display/DisplayOptions/ContextProvider'

const displayOptionsDecorator = (renderFn) => () => (
  <DisplayOptionsProvider>
    {renderFn()}
  </DisplayOptionsProvider>
)

export default displayOptionsDecorator
