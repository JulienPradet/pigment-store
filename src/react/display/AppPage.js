import React from 'react'
import {compose, withProps} from 'recompose'
import Layout from './util/View/Layout'
import Navigation from './Navigation'
import DisplayOptions from './DisplayOptions'
import {DisplayOptionsProvider} from './DisplayOptions/ContextProvider'

const AppPage = ({suites, overview, children}) => {
  const nav = <Navigation suites={suites} />
  const displayOptions = <DisplayOptions />

  return <DisplayOptionsProvider>
    <Layout nav={nav} horizontalNav={displayOptions}>
      {children}
    </Layout>
  </DisplayOptionsProvider>
}

export default (suites, overview) => compose(
  withProps({
    suites,
    overview
  }),
)(AppPage)
