import React from 'react'
import styles from './card.css'

export const Container = ({children}) => <div className={styles.container}>{children}</div>

export const Title = ({children}) => <div className={styles.title}>{children}</div>

export const Content = ({children}) => <div className={styles.content}>{children}</div>
