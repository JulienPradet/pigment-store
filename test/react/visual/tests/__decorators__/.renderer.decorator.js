import React from 'react'
import {RendererProvider} from '../../../../../src/core/display/util/Renderer'
import Render from '../../../../../src/react/display/Render'
import Usage from '../../../../../src/react/display/Usage'

const rendererDecorator = (renderFn) => () => (
  <RendererProvider Render={Render} Usage={Usage}>
    {renderFn()}
  </RendererProvider>
)

export default rendererDecorator
