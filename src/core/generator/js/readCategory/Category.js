const Component = require('./Component')

const renderString = (string) => {
  return string && `'${string.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\n/g, '\\n')}'`
}

module.exports = class Category {
  constructor (name) {
    this.name = name
    this.subCategories = []
    this.components = []
    this.description = null
  }

  addCategory ({name, category}) {
    if (!(category instanceof Category)) {
      console.warn(`The category should be an instance of Category. ${typeof category} given.`)
    } else {
      this.subCategories.push({
        name,
        category
      })
    }
    return this
  }

  addComponent ({name, component}) {
    if (!(component instanceof Component)) {
      console.warn(`The component should be an instance of Component. ${typeof component} given.`)
    } else {
      this.components.push({
        name,
        component
      })
    }
    return this
  }

  setDescription (description) {
    this.description = description
    return this
  }

  render () {
    const render = `{
      name: ${renderString(this.name)},
      description: ${renderString(this.description)},
      categories: [${this.subCategories.map(
        ({name, category}) => category.render()
      ).join(',')}],
      components: [${this.components.map(
        ({name, component}) => component.render()
      ).join(',')}]
    }`

    return render
  }
}
