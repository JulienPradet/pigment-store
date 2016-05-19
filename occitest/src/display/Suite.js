import React from 'react'
import {compose, withContext, getContext} from 'recompose'
import Component from './Component'
import {colors} from './styles'

const styles = {
  container: {
    margin: 0,
    background: colors.lightGray,
    color: colors.darkGray,
    fontFamily: '\'DejaVu Sans\', sans-serif',
    padding: '1em'
  },
  title: {
    margin: (1 / 1.5) + 'em',
    fontWeight: 'bold',
    fontSize: '1.5em'
  },
  componentList: {
    padding: '0',
    margin: '0',
    border: '1px solid ' + colors.white
  },
  componentContainer: {
    display: 'block',
    margin: '1em'
  }
}

const Suite = (props) => <div style={styles.container}>
  <h2 style={styles.title}>{props.suite.name}</h2>

  <ul style={styles.componentList}>
    {Object.keys(props.suite.components)
        .map(componentKey => <li key={componentKey} style={styles.componentContainer}>
          <Component
            component={props.suite.components[componentKey]}
            name={componentKey}
          />
        </li>)}
  </ul>
</div>

export default compose(
  setState()
  withContext(
    { previewKey: React.PropTypes.number.isRequired },
    ({previewKey, incrementKey}) => ({ previewKey })
  )
)(class extends React.Component {
  constructor(props) {
    super()

    document.title = props.suite.name
  }

  render() {
    return <Suite {...this.props} />
  }
})
