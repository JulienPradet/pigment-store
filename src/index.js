import React from 'react'
import Occitest from './Occitest'

class Link extends React.Component {
  constructor() {
    super()

    this.state = {
      hovered: false
    }
  }

  render() {
    console.log(this.state);
    const content = this.state.hovered ? '>' + this.props.children + '<' : this.props.children
    return <a href={this.props.href}>{content}</a>
  }
}

const tests = Occitest.describe('Call to actions')
  .component('Simple link', Link, function(component) {
    component
      .feature(
        'default',
        {
          href: 'http://google.com',
          children: 'Google'
        }
      )
      .feature(
        'hovered',
        {
          href: 'http://google.com',
          children: 'Google'
        },
        {
          hovered: true
        }
      )
  })


Occitest.render(tests, document.getElementById('tests'))
