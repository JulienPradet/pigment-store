import React from 'react'
import styles from './horizontalmenu.css'

export const Container = ({children}) => <div className={styles.container}>{children}</div>

export const Group = ({children}) => <div className={styles.group}>{children}</div>

export const Item = ({children}) => <div className={styles.item}>{children}</div>
