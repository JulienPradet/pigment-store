import Feature from './Feature'

export default function (Component, displayName) {
  return {
    Component,
    displayName,
    features: {},
    feature(featureName, props, actions) {
      this.features[featureName] = Feature(Component, props, actions)
      return this
    },
    document(props) {
      this.features.__doc = Feature(Component, props)
      return this
    }
  }
}
