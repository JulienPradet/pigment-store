import React from 'react'
import styles from './layout.css'

export default ({nav, children}) => <div className={styles.container}>
  <div className={styles.nav}>{nav}</div>
  <div className={styles.content}>{children}</div>
</div>
