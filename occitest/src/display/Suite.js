import React from 'react'
import Component from './Component'
import {colors} from './styles'

const styles = {
  container: {
    padding: '1em 2em',
    margin: 0,
    background: colors.lightGray,
    color: colors.darkGray
  },
  title: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1.5em'
  },
  componentList: {
    padding: '1em',
    margin: '0',
    border: '1px solid ' + colors.white
  },
  componentContainer: {
    display: 'block'
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

export default Suite
