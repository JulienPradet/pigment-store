import Occitest from 'occitest'
import Link from '../src/components/buttons/Link'

export default Occitest.describe('Buttons')
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
