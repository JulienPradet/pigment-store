import React from 'react'
import styles from './stacked-list.css'

export const Container = ({children}) => <div className={styles.container}>
  {children}
</div>

export const Row = ({children}) => <div className={styles.row}>
  {children}
</div>

export const Item = ({children}) => <div className={styles.item}>
  {children}
</div>
