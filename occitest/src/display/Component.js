import React from 'react'
import {compose, withState, withHandlers} from 'recompose'
import {Feature, Preview} from './Feature'
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
  featureContainerBlock: {
    display: 'block'
  },
  featureContainerInline: {
    display: 'inline-block',
    margin: '1em'
  }
}

export default compose(
  withState('showDetails', 'setShowDetails', false),
  withHandlers({
    showComponentDetails: ({setShowDetails}) => () => setShowDetails(true),
    hideComponentDetails: ({setShowDetails}) => () => setShowDetails(false)
  }),
  withHandlers({
    toggleComponentDetails: ({showComponentDetails, hideComponentDetails, showDetails}) => () => showDetails
      ? hideComponentDetails()
      : showComponentDetails()
  })
)((props) => <div style={styles.container}>
  <h3 style={styles.title}>{props.name}</h3>
  <button onClick={props.toggleComponentDetails}>Show Details</button>

  <ul style={styles.featureList}>
    {Object.keys(props.component.features)
      .filter((featureKey) => featureKey !== '__doc')
      .map(featureKey => <li key={featureKey} style={props.showDetails ? styles.featureContainerBlock : styles.featureContainerInline}>
        {props.showDetails
          ? <Feature
              name={featureKey}
              detailed={props.showDetails}
              {...props.component.features[featureKey]}
            />
          : <Preview {...props.component.features[featureKey]} />}
      </li>)}
  </ul>
</div>)
