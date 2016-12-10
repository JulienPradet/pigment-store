export default class Config {
  constructor (file) {
    this.file = file
  }

  render () {
    return `require('./${this.file}').default`
  }
}
