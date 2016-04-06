import React from 'react'
import Component from './Component'

const styles = {
  container: {
    padding: 0,
    margin: 0
  },

}

export default class Suite extends React.Component {
  render() {
    return <div style={styles.container}>
      { this.props.suite.name }

      <ul>
        {
          Object.keys(this.props.suite.components)
            .map(componentKey => <li key={componentKey}>
              <Component
                component={this.props.suite.components[componentKey]}
                name={componentKey}
              />
            </li>)
        }
      </ul>
    </div>
  }
}
