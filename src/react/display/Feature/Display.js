import React from 'react'
import IframeContainer from './IframeContainer'

class Display extends React.Component {
  render () {
    const { Component, props, actions } = this.props.feature

    const decorators = this.props.component.decorators
    const render = () => <Component ref={(ref) => { this.component = ref }} {...props} />
    const finalRender = decorators.reduce((render, decorator) => decorator(render), render)

    const afterRender = (component) => actions && actions(component)

    return <IframeContainer render={finalRender} afterRender={afterRender} fullHeight={this.props.fullHeight} />
  }
}

export default Display
