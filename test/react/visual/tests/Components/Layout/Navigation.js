import React from 'react'
import PigmentStore from '../../../../../../dist/index'
import Navigation from '../../../../../../src/react/display/Navigation/index'
import indexCategory from '../fixtures/index'

export default PigmentStore.React.describe('Navigation', Navigation)
  .setDescription(`
The left navigation that allows to explore the styleguide
  `)
  .featureJsx(
    'Default',
    <Navigation indexCategory={indexCategory} location={{pathname: '/'}} />
  )
  .featureJsx(
    'With an active category',
    <Navigation indexCategory={indexCategory} location={{pathname: '/atom'}} />
  )
  .featureJsx(
    'With an active component',
    <Navigation indexCategory={indexCategory} location={{pathname: '/atom/avatar'}} />
  )
