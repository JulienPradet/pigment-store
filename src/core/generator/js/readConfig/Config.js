module.exports = class Config {
  constructor (file) {
    this.file = file
  }

  render () {
    if (this.file) {
      return `(() => {
        const config = require('./${this.file}')
        return config && config.default ? config.default : {}
      })()`
    } else {
      return '{}'
    }
  }
}
