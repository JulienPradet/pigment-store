import React from 'react'
import ReactDOM from 'react-dom'

import describe from './definition/Suite'
import Suite from './display/Suite'

function render(suite, element) {
  ReactDOM.render(
    <Suite suite={suite} />,
    element
  )
}

export default {
  describe,
  render
}
