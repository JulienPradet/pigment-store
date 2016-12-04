import React from 'react'
import {ConfigProvider} from '../../../../src/react/display/util/ConfigProvider'

const configDecorator = (renderFn) => () => (
  <ConfigProvider config={{}}>
    {renderFn()}
  </ConfigProvider>
)

export default configDecorator
