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
    features: {},
    feature (featureName, props, actions) {
      this.features[featureName] = Feature(Component, featureName, props, actions)
      return this
    },
    featureJsx (featureName, jsx, actions) {
      this.features[featureName] = Feature(Component, featureName, jsx.props, actions)
      return this
    }
  }
}
