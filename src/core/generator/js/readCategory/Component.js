module.exports = class Component {
  constructor (file) {
    this.file = file
  }

  render () {
    return `require('${this.file}').default`
  }
}
