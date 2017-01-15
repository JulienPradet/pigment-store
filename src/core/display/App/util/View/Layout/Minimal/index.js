import React from 'react'
import styles from './layout.m.css'

const Layout = class Layout extends React.Component {
  constructor () {
    super()
    this.state = {
      showHiddenNav: false
    }
    this.toggleHiddenNav = this.toggleHiddenNav.bind(this)
  }

  toggleHiddenNav () {
    this.setState((state) => ({
      showHiddenNav: !state.showHiddenNav
    }))
  }

  render () {
    const {nav, hiddenNav, returnNav, children} = this.props
    return (
      <div className={styles.layoutContainer}>
        <div className={styles.navWrapper}>
          <div className={styles.navContainer}>
            <div className={styles.backButton}>{returnNav}</div>
            <div className={styles.mainNav}>{nav}</div>
            <div className={styles.hiddenNavButton}>
              <button onClick={this.toggleHiddenNav}>
                <i className='material-icons'>settings</i>
              </button>
            </div>
          </div>
          {this.state.showHiddenNav && hiddenNav}
        </div>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </div>
    )
  }
}

export default Layout
