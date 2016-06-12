import React from 'react'
import {makeRoutesFromDefinition} from './router'
import {Router, browserHistory} from 'react-router'

const App = ({suites, overview}) => {
  const routes = makeRoutesFromDefinition({suites, overview})

  return <Router history={browserHistory} routes={routes} />
}

export default App
