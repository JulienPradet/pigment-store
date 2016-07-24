# Pigment Store Guides

## How to write your own test files ?

A test file documents and tests one Component. A Component can have several features attached. Those are the different ways the Component could be displayed in the application.

*For now when I'm talking about a Component it is a React Component. However, in the future, my aim is to support different libraries. It means that it could be a sass file, a cycle.js component, etc.*

Here is an example for a Link button.

```jsx
// file: tests/Link.js
import PigmentStore from 'pigment-store'

// Link is directly the React component
// It can be Stateless or a Class. It doesn't matter as long as you can do
// React.render(<Link {...props} />, domElement)
import Link from '../src/Link'

// Create your test suite for a component
const component = PigmentStore.React.describe('Simple link', Link)
  // Add a feature
  .feature(
    'Default',
    { href: 'http://google.com', children: 'Google' }
  )
  // Add another feature
  .feature(
    'Hovered button',
    { href: 'http://google.com', children: 'Google' },
    (component) => component.onHover()
  )

// The component must be exported in order to be used.
// If there is none, a warning should appear in your browser's console
export default component
```

### Feature API

Arguments:

* name: String

  The name is the one that will be displayed in the application. It will also be
  used in order create a slug that will be used in the URL that links to the
  preview page. Thus make it unique if you don't want to have weird errors

* properties: object

  These are the properties passed to your React Component. For instance if you
  want to render `<Link to="/url" className="link-class" />`, you need to pass
  the properties `{ to: '/url', className: 'link-class'}`.

* actions (optional): function

  The function that will be applied on the component when it is mounted. The
  function has a reference to the component as an argument, meaning that you can
  call whatever function that exists in your component if it's a class.

### How is the default feature chosen ?

If there is a feature named `Default`, it will be the one displayed. If none is
named `Default`, the first to be declared will be used.

The default feature is displayed when a Component is displayed in a list of
components. You've got this situation when you click on a Category.

### How are dependecies computed ?

If you have Babel running in your project, you need to add the following plugin to your .babelrc or equivalent :
```
["pigment-store/dist/core/babel-meta-plugin/index.js", {
  "rootDir": "."
}]
```

The purpose of the rootDir is to target the root of your project. It will allow
your users to know where to look for your components.

It will guess the dependencies according to the files imported in your Component
file. For now, it's not yet super clever. For instance if you import an unused
component, it will still declare it as a dependency. Thus, try as much as possible
to create only one component per file in your source code.

## How are my tests organized ?

In order to keep it clean, you can use folders and put each test file in it. They
will be automatically detected by Pigment Store, and you will notice a nice hierarchy
in the left navigation.

If you are using the Atomic Design principle, you can consider having 4 root
directories : Atom, Molecules, Organisms and Templates.

### What if I want to have more control over the categories ?

If the directory structure does not suite your usage, you can still create your
own index.js file at the root of your test directory. It should look like so :

```js
// file: tests/index.js
import PigmentStore from 'pigment-store'
import Link from './Link'

// Index category that can contain components and sub categories
const category = {
  // First level categories that have the exact same structure as the index
  // category. The only difference is that each subcategories must have a `name`
  // property
  categories: [
    {
      name: 'Atom',
      // Second level categories which behave the exact same way as first level
      // categories
      categories: [],
      // Second level components which behave the exact same way as first level
      // components
      components: [
        {
          name: 'Link',
          component: Link
        }
      ]
    }
  ],
  // First level components which should have a name and a component test
  // description (see Link component in Atom category above.)
  components: []
}

// Render the application
// Pigment store is juste a regular React application. You can look at the source
// code in `pigment-store/src/react/display/index.js`
PigmentStore.React.render(category)
```

## Configure the rendering pipeline

For now there is only a basic pipeline that uses browserify, babel and
CSSmodules. If you are willing to use your own pipeline, you need to create your
own bundler definition. It will still need to support babel and CSSmodules, but
you could also add more plugins or add HMR.

A bundler is an object that contains :

* config: A configuration function that defines how the bundler should work.

  The function's signature is : `(testDir: string, styleguideDir: string, options: object) => (stream: Readable) => Bundler`

  The first set of arguments is the same that was passed down to the generator
  (either by the CLI command or in your custom script).

  The stream is a [https://nodejs.org/api/stream.html#stream_readable_streams](Readable Stream)
  that contains the content of the file to be compiled.

  The Bundler is the configured pipeline that will be used directly in the
  render method.

* render: A render function that outputs the file to compile

  The function's signature is : `(testDir: string, styleguideDir: string, options: object) => (bundler: Bundler) => Rx.Observable`

  The first set of arguments is the same that was passed down to the generator
  (either by the CLI command or in your custom script).

  The bundler is the one returned by the config function.

  The result of this function should be an Rx.Observable. This stream must
  output string(s) that represents the compiled file.

The current API certainly is too much coupled to browserify. However, I am
willing to make it as flexible as possible. Thus if you have knownledge in
Webpack, Rollup, etc. feel free to contact me or submit a PR.