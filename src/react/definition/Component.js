import Feature from './Feature'

export default function (Component, displayName) {
  return {
    Component,
    displayName,
    features: {},
    default (props, actions) {
      this.features.Default = Feature(Component, props, actions)
      return this
    },
    feature (featureName, props, actions) {
      this.features[featureName] = Feature(Component, props, actions)
      return this
    },
    document (props) {
      this.features.__doc = Feature(Component, props)
      return this
    }
  }
}
