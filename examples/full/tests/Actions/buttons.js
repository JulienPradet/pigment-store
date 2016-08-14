import PigmentStore from 'pigment-store'
import Link from '../../src/components/buttons/Link'

export default PigmentStore.React.describe('Link', Link)
  .setDescription(`
A link is a super awesome stuff that links to another page.
  `)
  .feature(
    'Default',
    { href: 'http://google.com', children: 'Google' }
  )
  .feature(
    'Hovered button',
    { href: 'http://google.com', children: 'Google' },
    (component) => component.onHover()
  )
