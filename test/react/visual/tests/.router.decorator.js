import React from 'react'
import {StaticRouter} from 'react-router'

const requiredRouterProps = {
  location: '/',
  action: 'POP',
  createHref: () => {},
  blockTransitions: () => {},
  onPush: () => {},
  onReplace: () => {}
}

export default (renderFn) => () => <StaticRouter {...requiredRouterProps}>{renderFn}</StaticRouter>
