import React from 'react'
import Feature from './Feature'

export default class Component extends React.Component {
  render() {
    return <div>
      {this.props.name}

      <ul>
        {
          Object.keys(this.props.component.features)
            .map(featureKey => <li key={featureKey}>
              <Feature
                name={featureKey}
                {...this.props.component.features[featureKey]}
              />
            </li>)
        }
      </ul>
    </div>
  }
}
