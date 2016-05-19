import React from 'react'
import Feature from './Feature'
import {colors} from './styles'

const styles = {
  container: {
    margin: '0',
  },
  title: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  subTitle: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1.1em'
  },
  strong: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1em'
  },
  featureList: {
    padding: 0,
    margin: '1em 0',
    border: '1px solid ' + colors.white,
    background: colors.white
  },
  featureContainer: {
    display: 'block'
  }
}

export default class Component extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.showComponentDetails = this.showComponentDetails.bind(this)
    this.hideComponentDetails = this.hideComponentDetails.bind(this)
    this.toggleComponentDetails = this.toggleComponentDetails.bind(this)
  }

  showComponentDetails() {
    this.setState({showDetails: true})
  }

  hideComponentDetails() {
    this.setState({showDetails: false})
  }

  toggleComponentDetails() {
    if(this.state.showDetails) {
      this.hideComponentDetails()
    } else {
      this.showComponentDetails()
    }
  }

  render() {
    return <div style={styles.container}>
      <h3 style={styles.title}>{this.props.name}</h3>
      <button onClick={this.toggleComponentDetails}>Show Details</button>

      <ul style={styles.featureList}>
        {Object.keys(this.props.component.features)
            .filter((featureKey) => featureKey !== '__doc')
            .map(featureKey => <li key={featureKey} style={styles.featureContainer}>
              <Feature
                name={featureKey}
                detailed={this.state.showDetails}
                {...this.props.component.features[featureKey]}
              />
            </li>)}
      </ul>
    </div>
  }
}
