import React from 'react'
import Feature from './Feature'
import {colors} from './styles'

const styles = {
  container: {
    margin: 0
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
    padding: '1em',
    margin: '1em 0',
    border: '1px solid ' + colors.white,
    background: colors.white,
  },
  featureContainer: {
    display: 'block'
  }
}

const getUsageFromComponent = (component) => {
  console.log(component.features.__doc)
  const ComponentName = component.Component.name
  const ComponentPropTypes = component.features.__doc
    ? component.features.__doc.props
    : component.features.default ? component.features.default.props : {}

  const propTypes = Object.keys(ComponentPropTypes)
    .filter((key) => key !== 'children')
    .map((key) => {
      if(ComponentPropTypes[key].type === 'string') {
        return `${key}='${ComponentPropTypes[key].text}'`
      }
    })

  if(ComponentPropTypes.hasOwnProperty('children')) {
    return `<${ComponentName} ${propTypes.join(' ')}>${ComponentPropTypes.children.text}</${ComponentName}>`
  } else {
    return `<${ComponentName} ${propTypes.join(' ')} />`
  }
}

const ComponentDetails = ({component}) => {
  return <div>
    <h4 style={styles.subTitle}>Details :</h4>
    <div style={styles.featureList}>
      <h5 style={styles.strong}>Usage :</h5>
      <pre>{getUsageFromComponent(component)}</pre>
    </div>
  </div>
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

      {this.state.showDetails ? <ComponentDetails component={this.props.component} /> : null}

      {this.state.showDetails ?   <h4 style={styles.subTitle}>Test cases :</h4> : null}
      <ul style={styles.featureList}>
        {
          Object.keys(this.props.component.features)
            .filter((featureKey) => featureKey !== '__doc')
            .map(featureKey => <li key={featureKey} style={styles.featureContainer}>
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
