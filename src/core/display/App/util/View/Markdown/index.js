import React from 'react'
import styles from './index.m.css'

export default class Markdown extends React.Component {
  render () {
    return <div className={styles.container} dangerouslySetInnerHTML={{
      __html: typeof this.props.children === 'string'
        ? this.props.children
        : this.props.children.join('\n')
    }} />
  }
}
