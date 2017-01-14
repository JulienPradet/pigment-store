var parseArgs = require('minimist')
var path = require('path')
var generator = require('../src/core/generator')
var browserifyBundler = require('../src/core/generator/js/bundler/browserify')
var webpackBundler = require('../src/core/generator/js/bundler/webpack')

function generate (argv) {
  var argsOptions = parseArgs(argv, {
    boolean: ['dev', 'help'],
    strings: ['source', 'test', 'output', 's', 't', 'o', 'bundler']
  })

  var source = argsOptions.source || argsOptions.s
  var test = argsOptions.test || argsOptions.t
  var output = argsOptions.output || argsOptions.o

  if (argsOptions.help || !source || !output || !test) {
    console.log('\
    Welcome to PigmentStore!\n\
\n\
    Usage : pigment-store generate [arguments]\n\
\n\
    Arguments :\n\
    --source, -s    <string> relative path to your tests directory\n\
    --output, -o    <string> relative path to your styleguide directory\n\
    --dev           [<bool>] watch file changes\n\
    --bundler, -b   <string> choose your bundler (webpack|browserify)\n\
')
  } else {
    var bundler = argsOptions.bundler || argsOptions.b
    var bundlers = {
      webpack: webpackBundler,
      browserify: browserifyBundler
    }
    var options = Object.assign({
      bundler: bundler && bundlers.hasOwnProperty(bundler)
      ? bundlers[bundler]
      : webpackBundler,
      dev: argsOptions.dev || false
    })

    var generator$ = generator(source, test, output, options)

    var styleguideRelativeDir = path.relative(process.cwd(), output)
    var runStyleguideCmd = path.resolve(styleguideRelativeDir, 'index.html')

    generator$.subscribe(
      function () {},
      function () {
        console.log('\nAn error occured. Feel free to leave an issue at https://github.com/JulienPradet/pigment-store if you need help solving your issue.')
        process.exit(1)
      },
      function () { console.log('\nYou can now open your styleguide by opening the index.html in your browser:\n' + runStyleguideCmd) }
    )
  }
}

module.exports = generate
