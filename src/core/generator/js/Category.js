import Component from './Component'

export default class Category {
  constructor (name) {
    this.name = name
    this.subCategories = []
    this.components = []
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

  render () {
    return `
      {
        name: '${this.name}',
        categories: [
          ${this.subCategories
            .map(({name, category}) => `{
              name: '${name}',
              category: ${category.render()}
            }`)
            .join(',')}
        ],
        components: [
          ${this.components
            .map(({name, component}) => `${component.render()}`)
            .join(',')}
        ]
      }
    `
  }
}
