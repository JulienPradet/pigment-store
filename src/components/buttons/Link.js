import React from 'react'

class Link extends React.Component {
  constructor() {
    super()

    this.state = {
      hovered: false
    }
  }

  render() {
    const content = this.state.hovered ? '>' + this.props.children + '<' : this.props.children
    return <a href={this.props.href}>{content}</a>
  }
}
