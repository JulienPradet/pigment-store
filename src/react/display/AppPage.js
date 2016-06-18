import React from 'react'
import Layout from './util/View/Layout'
import Navigation from './Navigation'
import DisplayOptions from './DisplayOptions'
import {DisplayOptionsProvider} from './DisplayOptions/ContextProvider'

export default (suites, overview) => ({children}) => {
  const nav = <Navigation suites={suites} />
  const displayOptions = <DisplayOptions />

  return <DisplayOptionsProvider>
    <Layout nav={nav} horizontalNav={displayOptions}>
      {children}
    </Layout>
  </DisplayOptionsProvider>
}
