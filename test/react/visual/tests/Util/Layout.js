import React from 'react'
import PigmentStore from '../../../../../dist/index'
import Layout from '../../../../../src/react/display/util/View/Layout/Basic/index'

export default PigmentStore.React.describe('Layout', Layout)
  .featureJsx(
    'Default',
    <Layout nav='Left navigation' horizontalNav='Top navigation'>
      Content
    </Layout>
  )
