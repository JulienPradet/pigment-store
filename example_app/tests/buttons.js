var Occitest = require('occitest')
import Link from '../src/components/buttons/Link'

Occitest.describe('Call to actions')
  .component('Simple link', Link, function(component) {
    component
      .feature(
        'Default button',
        {
          href: 'http://google.com',
          children: 'Google'
        }
      )
      .feature(
        'Hovered button',
        {
          href: 'http://google.com',
          children: 'Google'
        },
        (component) => component.onHover()
      )
  })
