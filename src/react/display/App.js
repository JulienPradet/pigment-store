import React from 'react'
import { BrowserRouter } from 'react-router'
import AppPage from './AppPage'

const App = ({indexCategory}) => {
  return <BrowserRouter>
    <AppPage indexCategory={indexCategory} />
  </BrowserRouter>
}

export default App
