# Usage

## Installation

The project is not released under npm yet.

You need to declare dependency using Git URLs as Dependencies

Add the following line to your package.json in `devDependencies`
```
"pigment-store": "git://github.com/julienpradet/pigment-store.git"
```

## With a custom script file

```js
import path from 'path'
import browserifyBundler from 'pigment-store/dist/core/generator/js/bundler/browserify'

// Define where are your tests (here it is {YOUR_PROJECT}/tests)
const testDir = path.join(__dirname, 'tests')
// Define where will your styleguide is built (here it is {YOUR_PROJECT}/tests)
const styleguideDir = path.join(__dirname, 'styleguide')

generator(testDir, styleguideDir, {
  bundler: browserifyBundler, // See `doc/Bundlers.md`
  dev: true // default to false
})
```

## With CLI

> Nota Bene: If pigment store is installed locally, either use the npm scripts or use directly ./node_modules/.bin/pigment-store

```
pigment-store -s tests -o styleguide
```

### Options :

  --source, -s   <string> relative path to your tests directory
  --output, -o   <string> relative path to your styleguide directory
  --dev          [<bool>] watch file changes

# Development

## Test example on your machine

* `npm run build`
* `npm run serve`
* `node examples/basic/styleguide/server.js`

## Run development env on your machine

* `npm run dev`
* `npm run serve:watch`
* `node examples/basic/styleguide/server.js`

# Roadmap

## 0.1.0

### Styleguide
[~] Finish card design : icon + bigger toggle button area
[~] Make feature links an anchor rather than a popin
[~] Add categories based on folders architecture
[~] Style horizontal menu
[~] Add button to reset search menu

### API
[~] Improve the pigment-store cli
[~] Improve fluent API for tests

### Documentation
[~] Describe how to use the CLI
[ ] Descrbie how to write a test file
[ ] Make screens to show how awesome the styleguide is

## 0.2.0

### Styleguide
[ ] Add proptypes to component description
[ ] Use a index.js or README.md file on test root dir in order to populate the home page
[ ] Use a index.js or README.md file to add a description for each category
[ ] Use an iframe to display elements
[ ] Disco mode

### API
[ ] Enable CSS inline and relative

### Testing
[ ] Add visual testing tooling

### Toolchain ~ need contribution help
[ ] HMR in dev mode
[ ] Move toward webpack (since it's becoming a more serious thing)

### Documentation
[ ] Add full example for the styleguide itself for view elements
[ ] Add architecture documentation so that one can add any kind of renderer

## 0.3.0

### Styleguide
[ ] Styleguide display should be in core, and react/display should only have the renderers (component details, etc.)
[ ] Enable tags that select a specific renderer
[ ] Add animation on load

### Testing
[ ] Add proper testing

# Discussions

[ ] Render actions directly in html -> not a big fan of this
