import React from 'react'

const styles = {
  link: {
    padding: '0.5em 1em',
    background: '#57f',
    color: '#fff',
    fontWeight: 'bold',
    textDecoration: 'none',
    pointer: 'cursor',
    display: 'inline-block',
    margin: '0.1em 0.3em',
    borderRadius: '5px'
  }
}

export default class Link extends React.Component {
  constructor() {
    super()

    this.state = {
      hovered: false
    }

    this.onHover = this.onHover.bind(this)
    this.onLeave = this.onLeave.bind(this)
  }

  onHover() {
    this.setState({hovered: true})
  }
  onLeave() {
    this.setState({hovered: false})
  }

  render() {
    const content = this.state.hovered ? '> ' + this.props.children + ' <' : this.props.children
    return <a href={this.props.href} onMouseOver={this.onHover} onMouseLeave={this.onLeave} style={styles.link}>{content}</a>
  }
}

Link.PropTypes = {
  to: React.PropTypes.string.isRequired
}
