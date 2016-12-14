# Pigment Store

Welcome to Pigment Store repository!

This project aims at creating a Living Documentation for React components. That means that it will create for you a web page that lists all your React components and present them as a Styleguide.

In order to add a React component to your Styleguide, you only have to write a basic description about how to use your component. That would look like this :

```jsx
PigmentStore.React.describe('Link', Link)
  .featureJsx('Default', <Link href='/path'>My super link</Link>)
  .featureJsx('With no title', <Link href='/path' />)
```

The page would then look like this :

![Preview of Pigment Store basic example](https://github.com/JulienPradet/pigment-store/raw/master/doc/images/global-preview.png)

Some other cool things are coming such as automatic Snapshot testing, automatic Visual testing, complete overview of your Components dependencies, etc. Stay tuned! :)

/!\ It is still in early stages of development.  
However if you are interested, feel free to open an issue or to contact me however you want.

## Usage

### Installation

```
npm install --save-dev pigment-store
```

#### Compute components dependencies inside your Pigment Store

Configure babel by adding the following plugin (`.babelrc` example):
```
["./node_modules/pigment-store/dist/core/babel-meta-plugin/index.js", {
  "rootDir": "."
}]
```

### Generate the styleguide

#### With CLI

> Nota Bene: If pigment store is installed locally, either use the npm scripts or use directly ./node_modules/.bin/pigment-store

```
pigment-store generate -s tests -o styleguide
```

##### Options :

```
--source, -s   <string> relative path to your tests directory
--output, -o   <string> relative path to your styleguide directory
--dev          [<bool>] watch file changes
--bundler      <string> (webpack|browserify)
```

### Use the snapshot testing

#### With CLI

```
pigment-store snapshot -s tests -- [jestOptions]
```

#### With CLI and watch mode

```
pigment-store snapshot -s tests -- --watch
```

## Development

### Clone repository

* `git clone https://github.com/JulienPradet/pigment-store.git`

### Test example on your machine

* `cd pigment-store`
* `npm run serve`
* `open test/visual/react/styleguide/index.html`

### Run development env on your machine

* `cd pigment-store`
* `npm run serve:watch`

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
* [x] Make screens to show how awesome the styleguide is

### 0.2.0

#### Styleguide

* [ ] Add PropTypes to component description
* [x] Use a index.js or README.md file on test root dir in order to populate the home page
* [x] Use a index.js or README.md file to add a description for each category
* [x] Use an iframe to display elements
* [ ] Disco mode
* [ ] Improve how components are imported in the app bundle - in order to improve the bundle size

#### API

* [ ] Enable CSS link into the previews

#### Testing

* [x] Add snapshot testing tooling
* [ ] Add visual testing tooling

#### Toolchain

* [x] HMR in dev mode
* [x] Move toward webpack (since it's becoming a more serious thing)
* [ ] Read the .babelrc in order to check that the dependencies are used

#### Documentation

* [ ] Add full example for the styleguide itself for view elements
* [ ] Add architecture documentation so that one can add any kind of renderer (Vue.JS, Cycles, etc.)
* [ ] Add architecture documentation so that one can add any kind of bundler (Rollup, etc.)

### 0.3.0

#### Styleguide

* [x] Styleguide display should be in core, and react/display should only have the renderers (component details, etc.)
* [ ] Enable tags that select a specific renderer
* [ ] Add animation on load

#### Testing

* [ ] Add proper testing

## Inpirations

* [react-storybook](https://github.com/kadirahq/react-storybook) : I enjoyed the testing approach for declaring new components. However its aim is to provide a good developping experience for UI Components. It doesn't really suite Styleguide approachs.
* [Pattern Lab](http://patternlab.io/) : It is more suited as a Styleguide. The resizing feature and the patterns dependencies are awesome. However, the needed directory structure felt overcomplicated compared to the testing approach.
