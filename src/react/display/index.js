import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

export default (...suites) => {
  ReactDOM.render(
    <App suites={suites} />,
    document.getElementById('tests')
  )
}
