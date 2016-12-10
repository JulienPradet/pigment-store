import React from 'react'
import {ConfigProvider} from '../../../../src/core/display/App/util/ConfigProvider'

const configDecorator = (renderFn) => () => (
  <ConfigProvider config={{}}>
    {renderFn()}
  </ConfigProvider>
)

export default configDecorator
