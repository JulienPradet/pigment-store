import Title from './Title'
import Avatar from './Avatar'
import Profile from './Profile'

export default {
  name: 'Index Category',
  description: 'The main description of the styleguide.',
  categories: [
    {
      name: 'Atom',
      category: {
        name: 'Atom',
        categories: [],
        components: [
          {
            Component: Title,
            name: 'Title',
            features: {
              'Default': {
                Component: Title,
                name: 'Default',
                props: {children: 'Title'}
              }
            }
          },
          {
            Component: Avatar,
            name: 'Avatar',
            features: {
              'Default': {
                Component: Avatar,
                name: 'Default',
                props: {src: 'https://avatars3.githubusercontent.com/u/4851789?v=3&s=460'}
              },
              'Placeholder': {
                Component: Avatar,
                name: 'Placeholder',
                props: {}
              }
            }
          }
        ]
      }
    },
    {
      name: 'Molecules',
      category: {
        name: 'Molecules',
        categories: [],
        components: [
          {
            Component: Profile,
            name: 'Profile',
            features: [
              {
                Component: Profile,
                name: 'Default',
                props: {src: 'https://avatars3.githubusercontent.com/u/4851789?v=3&s=460', children: 'John Doe'}
              }
            ]
          }
        ]
      }
    }
  ],
  components: []
}
