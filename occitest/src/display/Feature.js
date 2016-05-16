import React from 'react'
import ReactDOM from 'react-dom'

export default class Feature extends React.Component {
  componentDidMount() {
    const { Component, props, state } = this.props
    const component = ReactDOM.render(
      <Component {...props} />,
      ReactDOM.findDOMNode(this.refs.container)
    )

    if(state) {
      console.log(component)
      component.setState(state)
    }
  }

  render() {
    return <span ref="container"></span>
  }
}
