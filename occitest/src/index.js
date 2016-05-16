import React from 'react'
import ReactDOM from 'react-dom'

import describeSuite from './definition/Suite'
import Suite from './display/Suite'

let currentSuite

function render(element, suite) {
  if(typeof suite === "undefined") suite = currentSuite
  ReactDOM.render(
    <Suite suite={suite} />,
    element
  )
}

function describe(name) {
  currentSuite = describeSuite(name)
  return currentSuite
}

export {
  render,
  describe
}
