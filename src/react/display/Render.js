import React from 'react'

class Render extends React.Component {
  componentDidMount () {
    const { actions } = this.props.feature
    const afterRender = (component) => actions && actions(component)

    afterRender(this.component)
  }

  render () {
    const { Component, props } = this.props.feature

    const decorators = this.props.component.decorators
    const render = () => <Component ref={(ref) => { this.component = ref }} {...props} />
    const finalRender = decorators.reduce((render, decorator) => decorator(render), render)

    return finalRender()
  }
}

export default Render
