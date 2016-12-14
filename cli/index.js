#!/usr/bin/env node

var generate = require('./generate')
var snapshot = require('./snapshot')

const usage = () => {
  console.log('Welcome to PigmentStore!\n\
  \n\
  Usage : pigment-store [command] [options]\n\
  \n\
  Commands :\n\
  \n\
  help        displays usage information\n\
  generate    generates the styleguide that of your application\n\
  snapshot    tests regressions of your app using Jest\'s snapshots\n\
  ')
}

if (process.argv.length < 2 || process.argv[2] === 'help') {
  usage()
} else if (process.argv[2] === 'generate') {
  generate(process.argv.slice(3))
} else if (process.argv[2] === 'snapshot') {
  snapshot(process.argv.slice(3))
} else {
  usage()
  process.exit(1)
}
