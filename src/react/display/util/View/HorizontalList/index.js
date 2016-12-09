import React from 'react'
import classnames from 'classnames'
import styles from './index.css'

export const Item = ({children, active}) => <li className={classnames(styles.item, {[styles.itemActive]: active})}>{children}</li>
export const Container = ({children}) => <ul className={styles.container}>{children}</ul>
