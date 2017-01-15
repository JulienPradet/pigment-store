import React from 'react'
import {Match} from 'react-router'

const asyncComponent = (getImport, render) => {
  return class AsyncComponent extends React.Component {
    constructor () {
      super()
      this.state = {}
    }

    componentWillMount () {
      getImport().then((module) => {
        this.setState({
          module
        })
      })
    }

    render () {
      if (this.state.module) {
        return render(this.state.module)(this.props.matchProps)
      } else {
        return null
      }
    }
  }
}

export default class SplitMatch extends React.Component {
  componentWillMount () {
    this.Component = asyncComponent(this.props.import, this.props.render)
  }

  render () {
    const Component = this.Component
    return <Match {...this.props} render={(matchProps) => <Component matchProps={matchProps} />} />
  }
}
