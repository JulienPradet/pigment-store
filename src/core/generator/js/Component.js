export default class Component {
  constructor (file) {
    this.file = file
  }

  render () {
    return `require('./${this.file}').default`
  }
}
