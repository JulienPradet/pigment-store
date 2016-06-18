import ComponentDefinition from './Component'

export default (name) => {
  return {
    name,
    components: {},
    component (componentName, Component, callback) {
      this.components[componentName] = ComponentDefinition(Component, componentName)
      callback(this.components[componentName])
      return this
    }
  }
}
