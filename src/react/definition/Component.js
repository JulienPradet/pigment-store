import Feature from './Feature'

export default (Component, name) => {
  return {
    Component,
    name,
    features: {},
    default (props, actions) {
      this.features.Default = Feature(Component, 'Default', props, actions)
      return this
    },
    feature (featureName, props, actions) {
      this.features[featureName] = Feature(Component, featureName, props, actions)
      return this
    }
  }
}
