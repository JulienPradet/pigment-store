import PigmentStore from 'pigment-store'
import Link from '../../src/components/buttons/Link'

export default PigmentStore.React.describe('Simple link', Link)
  .feature(
    'Default',
    { href: 'http://google.com', children: 'Google' }
  )
  .feature(
    'Hovered button',
    { href: 'http://google.com', children: 'Google' },
    (component) => component.onHover()
  )
