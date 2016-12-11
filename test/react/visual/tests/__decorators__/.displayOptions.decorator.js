import React from 'react'
import {DisplayOptionsProvider} from '../../../../../src/core/display/App/DisplayOptions/ContextProvider'

const displayOptionsDecorator = (renderFn) => () => (
  <DisplayOptionsProvider>
    {renderFn()}
  </DisplayOptionsProvider>
)

export default displayOptionsDecorator
