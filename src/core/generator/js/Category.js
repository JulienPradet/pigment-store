import Suite from './Suite'

export default class Category {
  constructor () {
    this.subCategories = []
    this.suites = []
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

  addSuite ({name, suite}) {
    if (!(suite instanceof Suite)) {
      console.warn(`The suite should be an instance of Suite. ${typeof suite} given.`)
    } else {
      this.suites.push({
        name,
        suite
      })
    }
    return this
  }

  render () {
    return `
      {
        categories: [
          ${this.subCategories
            .map(({name, category}) => `{
              name: '${name}',
              category: ${category.render()}
            }`)
            .join(',')}
        ],
        suites: [
          ${this.suites
            .map(({name, suite}) => `${suite.render()}`)
            .join(',')}
        ]
      }
    `
  }
}
