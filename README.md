# Pigment Store

Welcome to Pigment Store repository!

This project aims at creating a Living Documentation of React components. It is still in early stages of development, however if you are interested, feel free to open an issue or to contact me however you want.

![Preview of Pigment Store basic example](https://github.com/JulienPradet/pigment-store/raw/master/doc/images/global-preview.png)

## Usage

### Installation

The project is not released under npm yet.

You need to declare dependency using Git URLs as Dependencies

Add the following line to your package.json in `devDependencies`
```
"pigment-store": "git://github.com/julienpradet/pigment-store.git"
```

I'll try to make it available on npm soon.

#### Compute components dependencies inside your Pigment Store

Configure babel by adding the following plugin (`.babelrc` example):
```
["pigment-store/dist/core/babel-meta-plugin/index.js", {
  "rootDir": "."
}]
```

### Generate the styleguide

#### With CLI

> Nota Bene: If pigment store is installed locally, either use the npm scripts or use directly ./node_modules/.bin/pigment-store

```
pigment-store -s tests -o styleguide
```

##### Options :

```
--source, -s   <string> relative path to your tests directory
--output, -o   <string> relative path to your styleguide directory
--dev          [<bool>] watch file changes
```

#### With a custom script file

Create the following file :
```js
// file: scripts/generateStyleguide.js
import path from 'path'
import browserifyBundler from 'pigment-store/dist/core/generator/js/bundler/browserify'

// Define where are your tests (here it is {YOUR_PROJECT}/tests)
const testDir = path.join(__dirname, 'tests')
// Define where will your styleguide is built (here it is {YOUR_PROJECT}/tests)
const styleguideDir = path.join(__dirname, 'styleguide')

generator(testDir, styleguideDir, {
  bundler: browserifyBundler, // See `Configure the rendering pipeline` in `doc/README.md`
})
```

Add it to your task runner pipeline or directly use it :
```
node scripts/generateStyleguide
```

## Development

### Clone repository

* `git clone https://github.com/JulienPradet/pigment-store.git`

### Test example on your machine

* `cd pigment-store`
* `npm run build`
* `npm run serve`
* `node examples/basic/styleguide/server.js`

### Run development env on your machine

* `cd pigment-store`
* `npm run dev`
* `npm run serve:watch`
* `node examples/basic/styleguide/server.js`

## Roadmap

### 0.1.0

#### Styleguide

* [x] Finish card design : icon + bigger toggle button area
* [x] Make feature links an anchor rather than a popin
* [x] Add categories based on folders architecture
* [x] Style horizontal menu
* [x] Add button to reset search menu

#### API

* [x] Improve the pigment-store cli
* [x] Improve fluent API for tests

#### Documentation

* [x] Describe how to use the CLI
* [x] Descrbie how to write a test file
* [ ] Make screens to show how awesome the styleguide is

### 0.2.0

#### Styleguide

* [ ] Add proptypes to component description
* [ ] Use a index.js or README.md file on test root dir in order to populate the home page
* [ ] Use a index.js or README.md file to add a description for each category
* [ ] Use an iframe to display elements
* [ ] Disco mode

#### API

* [ ] Enable CSS inline and relative

#### Testing

* [ ] Add visual testing tooling

#### Toolchain ~ need contribution help

* [ ] HMR in dev mode
* [ ] Move toward webpack (since it's becoming a more serious thing)

#### Documentation

* [ ] Add full example for the styleguide itself for view elements
* [ ] Add architecture documentation so that one can add any kind of renderer

### 0.3.0

#### Styleguide

* [ ] Styleguide display should be in core, and react/display should only have the renderers (component details, etc.)
* [ ] Enable tags that select a specific renderer
* [ ] Add animation on load

#### Testing

* [ ] Add proper testing

## Inpirations

* [react-storybook](https://github.com/kadirahq/react-storybook) : I enjoyed the testing approach for declaring new components. However its aim is to provide a good developping experience for UI Components. It doesn't really suite Styleguide approachs.
* [http://patternlab.io/](Pattern Lab) : It is more suited as a Styleguide. The resizing feature and the patterns dependencies are awesome. However, the needed directory structure felt overcomplicated compared to the testing approach.
