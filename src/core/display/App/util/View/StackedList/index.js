import React from 'react'
import styles from './stacked-list.m.css'

export const Container = ({children}) => <div className={styles.container}>
  {children}
</div>
Container.displayName = 'StackedList.Container'

export const Row = ({children}) => <div className={styles.row}>
  {children}
</div>
Row.displayName = 'StackedList.Row'

export const Item = ({children}) => <div className={styles.item}>
  {children}
</div>
Item.displayName = 'StackedList.Item'
