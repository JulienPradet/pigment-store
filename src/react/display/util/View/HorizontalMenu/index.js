import React from 'react'
import styles from './horizontalmenu.css'

export const Container = ({children}) => <div className={styles.container}>{children}</div>
Container.displayName = 'HorizontalMenu.Container'

export const Group = ({children}) => <div className={styles.group}>{children}</div>
Group.displayName = 'HorizontalMenu.Group'

export const Item = ({children}) => <div className={styles.item}>{children}</div>
Item.displayName = 'HorizontalMenu.Item'
