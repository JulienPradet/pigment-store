import React from 'react'

export default class Switch extends React.Component {
  constructor () {
    super()
    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.props.onChange(event.target.checked)
  }

  render () {
    return <div>
      <input type='checkbox' checked={this.props.checked} onChange={this.onChange} />
    </div>
  }
}
