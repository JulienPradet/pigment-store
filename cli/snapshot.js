const parseArgs = require('minimist')
const snapshoter = require('../src/core/tests/snapshot')

const snapshot = (argv) => {
  const argsOptions = parseArgs(argv, {
    boolean: ['help'],
    strings: ['source', 'output']
  })

  const source = argsOptions.source || argsOptions.s
  const output = argsOptions.output || argsOptions.o

  if (argsOptions.help || !source || !output) {
    console.log('\
    Welcome to PigmentStore!\n\
\n\
    Usage: pigment-store snapshot [arguments] -- [options]\n\
\n\
    Arguments:\n\
    --source, -s    <string> relative path to your tests directory\n\
    --output, -o    <string> relative path to your styleguide directory\n\
    --config        <string> relative path to your jest config. If none\n\
                             given, one will be generated in your styleguide\n\
                             directory\n\
\n\
    Options:\n\
    The additional options are the one you want to pass directly to jest\'s\n\
    command\n\
')
  } else {
    snapshoter(source, output, { jestOptions: argsOptions._ }).subscribe(
      function () {},
      function (error) {
        console.log(error)
        console.log('An error occured. Feel free to leave an issue at https://github.com/JulienPradet/pigment-store if you need help solving your issue.')
        process.exit(1)
      },
      function () { console.log('Done.') }
    )
  }
}

module.exports = snapshot
