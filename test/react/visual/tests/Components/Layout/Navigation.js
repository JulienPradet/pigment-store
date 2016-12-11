import React from 'react'
import {MemoryRouter} from 'react-router'
import PigmentStore from '../../../../../../src/index'
import Navigation from '../../../../../../src/core/display/App/Navigation/Vertical/index'
import indexCategory from '../fixtures/index'

export default PigmentStore.React.describe('Navigation', Navigation)
  .setDescription(`
The left navigation that allows to explore the styleguide
  `)
  .featureJsx(
    'Default',
    (
      <MemoryRouter>
        <Navigation indexCategory={indexCategory} />
      </MemoryRouter>
    )
  )
  .featureJsx(
    'With an active category',
    (
      <MemoryRouter location='/category-Atom'>
        <Navigation indexCategory={indexCategory} />
      </MemoryRouter>
    )
  )
  .featureJsx(
    'With an active component',
    (
      <MemoryRouter location='/category-Atom/component-Avatar'>
        <Navigation indexCategory={indexCategory} />
      </MemoryRouter>
    )
  )
