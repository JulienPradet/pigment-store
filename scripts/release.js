#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec
var parseArgs = require('minimist')

const argsOptions = parseArgs(process.argv.slice(2), {
  strings: ['version']
})

var version = argsOptions.version

if (!(/\d+\.\d+\.\d+(-.+)?/.test(version))) {
  console.error(`Version '${version}' is not valid`)
} else {
  // Test project
  var testCmd = 'npm test'
  exec(testCmd, function (error) {
    if (error) {
      console.error('Fix your tests first')
      throw error
    }

    // Update version
    var currentPackage = require('../package')
    currentPackage.version = version
    fs.writeFile(
      path.join(__dirname, '../package.json'),
      JSON.stringify(currentPackage, null, 2),
      function (error) {
        if (error) {
          console.error(`Impossible to update package.json to version ${version}`)
          throw error
        }

        // Create git tag
        exec(`sh ${path.join(__dirname, './git-release.sh')} ${version}`, function (error) {
          if (error) {
            console.error(`Impossible to create new git tag ${version}`)
            throw error
          }

          // Publish npm package
          exec('npm publish', function (error) {
            if (error) {
              console.error(`Impossible to create new git tag ${version}`)
              throw error
            }

            console.log(`Version ${version} published`)
          })
        })
      }
    )
  })
}
