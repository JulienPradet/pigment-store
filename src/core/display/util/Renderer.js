import React from 'react'

class RendererProvider extends React.Component {
  getChildContext () {
    return {
      Renderer: {
        Render: this.props.Render,
        Usage: this.props.Usage
      }
    }
  }

  render () {
    return (
      React.Children.only(this.props.children)
    )
  }
}

RendererProvider.childContextTypes = {
  Renderer: React.PropTypes.shape({
    Render: React.PropTypes.any.isRequired,
    Usage: React.PropTypes.any.isRequired
  }).isRequired
}

const RendererContextType = RendererProvider.childContextTypes.Renderer

export {
  RendererProvider,
  RendererContextType
}
