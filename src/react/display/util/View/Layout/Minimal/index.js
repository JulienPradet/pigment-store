import React from 'react'
import styles from './layout.css'

const Layout = ({nav, hiddenNav, returnNav, children}) => <div>
  <div className={styles.navContainer}>
    <div className={styles.backButton}>{returnNav}</div>
    <div>{nav}</div>
    <div>{hiddenNav}</div>
  </div>
  <div>{children}</div>
</div>

export default Layout
