import React from 'react'
import ReactDOM from 'react-dom'
import {getDisplayOptions} from '../DisplayOptions/ContextProvider'

const makeWrapperStyle = ({size, zoom}) => ({
  width: size.width === 'auto' ? 'auto' : `${size.width * zoom / 100}px`,
  height: size.height === 'auto' ? 'auto' : `${size.height * zoom / 100}px`
})

const makeStyle = ({size, zoom}) => ({
  width: size.width === 'auto' ? 'auto' : `${size.width}px`,
  height: size.height === 'auto' ? 'auto' : `${size.height}px`,
  transform: `scale(${zoom / 100})`,
  transformOrigin: 'top left'
})

class Display extends React.Component {
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
    return <div style={makeWrapperStyle(this.props.displayOptions)}>
      <div style={makeStyle(this.props.displayOptions)} ref={(ref) => { this.container = ref }}></div>
    </div>
  }
}

export default (
  getDisplayOptions()
)(Display)
