import Feature from './Feature'

export default function (Component) {
  return {
    features: {},
    feature(featureName, props, state) {
      this.features[featureName] = Feature(Component, props, state)
      return this
    }
  }
}
