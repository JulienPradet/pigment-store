import React from 'react'
import { HashRouter } from 'react-router'
import AppPage from './AppPage'

const App = ({indexCategory}) => {
  return <HashRouter>
    <AppPage indexCategory={indexCategory} />
  </HashRouter>
}

export default App
