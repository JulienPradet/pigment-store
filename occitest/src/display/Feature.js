import React from 'react'
import ReactDOM from 'react-dom'
import {colors} from './styles'

const styles = {
  container: {
    padding: '1em',
    borderBottom: '1px solid ' + colors.darkGray
  },
  title: {
    margin: '0 0 ' + (1.1 / 1) + 'em 0',
    fontWeight: 'bold',
    fontSize: '1.1em'
  },
  strong: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1em'
  },
  content: {
    margin: 0,
    border: '1px solid ' + colors.white,
    background: colors.white,
  }
}

const getUsageFromFeature = (feature) => {
  const ComponentName = feature.Component.name
  const ComponentProps = feature.props || {}

  const propTypes = Object.keys(ComponentProps)
    .filter((key) => key !== 'children')
    .map((key) => `${key}='${ComponentProps[key]}'`)

  if(ComponentProps.hasOwnProperty('children')) {
    return `<${ComponentName} ${propTypes.join(' ')}>${ComponentProps.children}</${ComponentName}>`
  } else {
    return `<${ComponentName} ${propTypes.join(' ')} />`
  }
}

const FeatureDetails = (props) => {
  return <div>
    <div style={styles.content}>
      <h5 style={styles.strong}>Usage:</h5>
      <pre>{getUsageFromFeature(props)}</pre>
    </div>
    {props.actions
      ? <div style={styles.content}>
          <h5 style={styles.strong}>Actions taken:</h5>
          <pre>{props.actions.toString()}</pre>
        </div>
      : null}
  </div>
}

export class Preview extends React.Component {
  componentDidMount() {
    const { Component, props, actions } = this.props
    const component = ReactDOM.render(
      <Component {...props} />,
      ReactDOM.findDOMNode(this.refs.container)
    )

    if(actions) {
      actions(component)
    }
  }

  render() {
    return <span ref='container' className='casper-preview'></span>
  }
}

export const Feature = (props) => <div style={styles.container}>
  {props.detailed ? <h4 style={styles.title}>{props.name}:</h4> : null}
  {props.detailed ? <FeatureDetails {...props} /> : null}
  <div style={styles.content}><Preview {...props} /></div>
</div>
