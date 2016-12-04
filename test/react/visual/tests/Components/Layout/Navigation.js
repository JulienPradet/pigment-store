import React from 'react'
import {StaticRouter} from 'react-router'
import PigmentStore from '../../../../../../dist/index'
import Navigation from '../../../../../../src/react/display/Navigation/index'
import indexCategory from '../fixtures/index'

const requiredRouterProps = {
  location: '/',
  action: 'POP',
  createHref: () => {},
  blockTransitions: () => {},
  onPush: () => {},
  onReplace: () => {}
}

export default PigmentStore.React.describe('Navigation', Navigation)
  .setDescription(`
The left navigation that allows to explore the styleguide
  `)
  .featureJsx(
    'Default',
    (
      <StaticRouter {...requiredRouterProps}>
        <Navigation indexCategory={indexCategory} />
      </StaticRouter>
    )
  )
  .featureJsx(
    'With an active category',
    (
      <StaticRouter {...requiredRouterProps} location='/category-Atom'>
        <Navigation indexCategory={indexCategory} />
      </StaticRouter>
    )
  )
  .featureJsx(
    'With an active component',
    (
      <StaticRouter {...requiredRouterProps} location='/category-Atom/component-Avatar'>
        <Navigation indexCategory={indexCategory} />
      </StaticRouter>
    )
  )
