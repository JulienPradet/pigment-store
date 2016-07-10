export default class Suite {
  constructor (file) {
    this.file = file
  }

  render () {
    return `require('./${this.file}').default`
  }
}
