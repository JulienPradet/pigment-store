import React from 'react'
import describe from 'pigment-store/react/describe'
import Layout from '../../../../../src/core/display/App/util/View/Layout/Basic/index'

export default describe('Layout', Layout)
  .featureJsx(
    'Default',
    () => (
      <Layout nav='Left navigation' horizontalNav='Top navigation'>
        Content
      </Layout>
    )
  )
