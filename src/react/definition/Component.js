import Feature from './Feature'

export default (name, Component) => {
  return {
    Component,
    name,
    description: null,
    setDescription (description) {
      this.description = description
      return this
    },
    decorators: [],
    addDecorator (decorator) {
      this.decorators.push(decorator)
      return this
    },
    features: [],
    feature (featureName, props, actions) {
      this.features.push(Feature(Component, featureName, props, actions))
      return this
    },
    featureJsx (featureName, jsx, actions) {
      this.features.push(Feature(jsx.type, featureName, jsx.props, actions))
      return this
    }
  }
}
