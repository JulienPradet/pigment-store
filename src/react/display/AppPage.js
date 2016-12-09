import React from 'react'
import {Match, Redirect, Link} from 'react-router'
import BasicLayout from './util/View/Layout/Basic'
import VerticalNavigation from './Navigation/Vertical'
import MinimalLayout from './util/View/Layout/Minimal'
import HorizontalNavigation from './Navigation/Horizontal'
import DisplayOptions from './DisplayOptions'
import {DisplayOptionsProvider} from './DisplayOptions/ContextProvider'
import Category from './Category/Main'
import FullPreview from './FullPreview/index'

const renderDocs = (indexCategory) => () => {
  const nav = <VerticalNavigation indexCategory={indexCategory} prefix='/docs' />
  const displayOptions = <DisplayOptions />

  return (
    <BasicLayout nav={nav} horizontalNav={displayOptions}>
      <Category pathname='/docs' category={indexCategory} />
    </BasicLayout>
  )
}

const renderPreview = (indexCategory) => ({location}) => {
  const nav = <HorizontalNavigation indexCategory={indexCategory} prefix='/full' />
  const displayOptions = <div></div>//<DisplayOptions />
  const goBackToDocs = <Link
    to={location.pathname.replace(/^\/full/, '/docs').replace(/\/feature-.*$/, '')}
    title='Go back to documentation'
  >
    &times;
  </Link>

  return (
    <MinimalLayout nav={nav} hiddenNav={displayOptions} returnNav={goBackToDocs}>
      <FullPreview prefix='/full' category={indexCategory} />
    </MinimalLayout>
  )
}

const AppPage = ({indexCategory}) => (
  <DisplayOptionsProvider>
    <div>
      <Match pattern='/docs' render={renderDocs(indexCategory)} />
      <Match pattern='/full' render={renderPreview(indexCategory)} />
      <Match pattern='/' exactly render={() => <Redirect to='/docs' />} />
    </div>
  </DisplayOptionsProvider>
)

export default AppPage
