import React from 'react'
import {DisplayOptionsProvider} from './DisplayOptions/ContextProvider'

const TestPage = ({children}) => {
  return <DisplayOptionsProvider>
    {children}
  </DisplayOptionsProvider>
}

export default TestPage
