import React from 'react'
import Layout from './util/View/Layout'
import Navigation from './Navigation'

export default (suites, overview) => ({children}) => {
  const nav = <Navigation suites={suites} />

  return <Layout nav={nav}>
    {children}
  </Layout>
}
