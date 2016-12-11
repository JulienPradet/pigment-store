import React from 'react'
import PigmentStore from 'pigment-store'
import Layout from '../../../../../src/core/display/App/util/View/Layout/Basic/index'

export default PigmentStore.React.describe('Layout', Layout)
  .featureJsx(
    'Default',
    <Layout nav='Left navigation' horizontalNav='Top navigation'>
      Content
    </Layout>
  )
