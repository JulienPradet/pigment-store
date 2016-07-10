import React from 'react'
import {makeRoutesFromDefinition} from './router'
import {Router, browserHistory} from 'react-router'

const App = ({indexCategory, previews}) => {
  const routes = makeRoutesFromDefinition(indexCategory, previews)
  return <Router history={browserHistory} routes={routes} />
}

export default App
