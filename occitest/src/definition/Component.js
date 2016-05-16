import Feature from './Feature'

export default function (Component, displayName) {
  return {
    Component,
    displayName,
    features: {},
    feature(featureName, props, state) {
      this.features[featureName] = Feature(Component, props, state)
      return this
    },
    document(props, state) {
      this.features.__doc = Feature(Component, props, state)
      return this
    }
  }
}
