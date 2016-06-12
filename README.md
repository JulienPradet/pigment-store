# Launch :

## production

* Broken

## dev mode

* npm run dev
* npm run serve:watch
* node examples/basic/styleguide/server.js

# TODO

## Styleguide itself

- Add hierarchy to suites (a suite should be able to contain another suite ?)
- Make a proper menu with disco mode, etc.
- Add more place to documentation
- Previews should be in iframes : think about CSS issues
- Think about styleguide customisation (ex: only display 'default' feature and show the other ones on 'show details' trigger)
- Style code snippets and add tooltips (types from Component.PropTypes, etc.)
- Display a single component with HMR

## Building steps

- Make it CLI-able directly from app
- DONE - Add watcher for styleguide
- Add React hot loader (3? with babel)
- Import test suites directly from fs rather than from a file

## Testing

- Create either one page per feature or create an id mecanisme
- Make it CLI-able

## Self tested

- Once the API settles down a bit, unit test everything
- Visually test the styleguide too althought there wont be much components

#### feedback

- Render actions directly in html
- Tag views in order to let users display information however they want
- detective in order to find deps
