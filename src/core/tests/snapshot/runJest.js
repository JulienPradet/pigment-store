const path = require('path')
const spawn = require('child_process').spawn
const Observable = require('rx').Observable

const runJest = (testDir, configPath, options) => {
  return Observable.create((observer) => {
    const child = spawn(
      'jest',
      options
        .concat(['--config', configPath])
        .concat(['--colors']),
      {
        env: Object.assign({}, process.env, { NODE_ENV: 'test' }),
        stdio: 'inherit'
      }
    )

    child.on('close', function () {
      observer.onCompleted()
    })
  })
}

module.exports = runJest
