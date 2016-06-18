import React from 'react'
import styles from './layout.css'

export default ({nav, horizontalNav, children}) => <div className={styles.container}>
  <div className={styles.nav}>{nav}</div>
  <div className={styles.contentContainer}>
    <div className={styles.horizontalNav}>{horizontalNav}</div>
    <div className={styles.content}>{children}</div>
  </div>
</div>
