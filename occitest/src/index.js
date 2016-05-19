import React from 'react'
import ReactDOM from 'react-dom'

import describe from './definition/Suite'
import App from './display/App'

function render(...suites) {
  ReactDOM.render(
    <App suites={suites} />,
    document.getElementById('tests')
  )
}

export default {
  render,
  describe
}
