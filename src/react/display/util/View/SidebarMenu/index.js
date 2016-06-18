import React from 'react'
import classnames from 'classnames'
import styles from './sidebar.css'

export const MenuTitle = ({children}) => <h2 className={styles.title}>{children}</h2>

export const Container = ({children}) => <ul className={styles.list}>
  {children}
</ul>

export const Item = ({isActive, children}) => <li className={classnames(styles.item, {[styles.activeItem]: isActive})}>
  {children}
</li>
