import TestComponent from './Component'

export default function Suite(name) {
  return {
    name,
    components: {},
    component(componentName, Component, callback) {
      this.components[componentName] = TestComponent(Component)
      callback(this.components[componentName])
      return this
    }
  }
}
