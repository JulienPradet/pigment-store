import React from 'react'
import {MemoryRouter} from 'react-router'
import describe from 'pigment-store/react/describe'
import Navigation from '../../../../../../src/core/display/App/Navigation/Vertical/index'
import indexCategory from '../__fixtures__/index'

export default describe('Navigation', Navigation)
  .setDescription(`
The left navigation that allows to explore the styleguide
  `)
  .featureJsx(
    'Default',
    () => (
      <MemoryRouter>
        <Navigation indexCategory={indexCategory} />
      </MemoryRouter>
    )
  )
  .featureJsx(
    'With an active category',
    () => (
      <MemoryRouter location='/category-Atom'>
        <Navigation indexCategory={indexCategory} />
      </MemoryRouter>
    )
  )
  .featureJsx(
    'With an active component',
    () => (
      <MemoryRouter location='/category-Atom/component-Avatar'>
        <Navigation indexCategory={indexCategory} />
      </MemoryRouter>
    )
  )
