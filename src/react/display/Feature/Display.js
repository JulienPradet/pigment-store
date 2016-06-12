import React from 'react'
import ReactDOM from 'react-dom'

export default class Display extends React.Component {
  componentDidMount () {
    const { Component, props, actions } = this.props.feature
    const component = ReactDOM.render(
      <Component {...props} />,
      ReactDOM.findDOMNode(this.container)
    )

    if (actions) {
      actions(component)
    }
  }

  render () {
    return <span ref={(ref) => { this.container = ref }}></span>
  }
}
