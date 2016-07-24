import Feature from './Feature'

export default (name, Component) => {
  return {
    Component,
    name,
    features: {},
    feature (featureName, props, actions) {
      this.features[featureName] = Feature(Component, featureName, props, actions)
      return this
    }
  }
}
