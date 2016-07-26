import React from 'react'
import IframeContainer from './IframeContainer'

class Display extends React.Component {
  render () {
    const { Component, props, actions } = this.props.feature
    return <IframeContainer>
      {() => <Component ref={(ref) => { this.component = ref }} {...props} />}
      {(component) => actions && actions(component)}
    </IframeContainer>
  }
}

export default Display
