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
      component.setState(state)
    }
  }

  render() {
    return <div>
      {this.props.name}
      <div ref="container"></div>
    </div>
  }
}
