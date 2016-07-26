import React from 'react'
import TextField from '../form/TextField'
import InputField from '../form/NumberField'

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
  },
  hover: {
    background: '#69f'
  }
}

export default class Link extends React.Component {
  constructor () {
    super()

    this.state = {
      hovered: false
    }

    this.onHover = this.onHover.bind(this)
    this.onLeave = this.onLeave.bind(this)
  }

  onHover () {
    this.setState({hovered: true})
  }
  onLeave () {
    this.setState({hovered: false})
  }

  render () {
    const style = Object.assign(
      {},
      styles.link,
      this.state.hovered && styles.hover
    )
    return <a href={this.props.href} onMouseOver={this.onHover} onMouseLeave={this.onLeave} style={style}>
      {this.props.children}
    </a>
  }
}

Link.PropTypes = {
  to: React.PropTypes.string.isRequired
}
