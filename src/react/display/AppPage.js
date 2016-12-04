import React from 'react'
import {Match} from 'react-router'
import Layout from './util/View/Layout'
import Navigation from './Navigation'
import DisplayOptions from './DisplayOptions'
import {DisplayOptionsProvider} from './DisplayOptions/ContextProvider'
import Category from './Category/Main'

const AppPage = ({indexCategory}) => {
  const nav = <Navigation indexCategory={indexCategory} />
  const displayOptions = <DisplayOptions />

  return <DisplayOptionsProvider>
    <Layout nav={nav} horizontalNav={displayOptions}>
      <Match pattern='/' render={() => <Category pathname='' category={indexCategory} />} />
    </Layout>
  </DisplayOptionsProvider>
}

export default AppPage
