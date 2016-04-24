import Occitest from 'occitest'
import Link from '../../src/components/buttons/Link'

Occitest.describe('Call to actions')
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
