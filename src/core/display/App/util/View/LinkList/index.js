import React from 'react'
import styles from './link-list.m.css'

export const Container = ({children}) => <div className={styles.container}>{children}</div>
Container.displayName = 'LinkList.Container'

export const Title = ({children}) => <div className={styles.title}>{children}</div>
Title.displayName = 'LinkList.Title'

export const Content = ({children}) => <div className={styles.content}>{children}</div>
Content.displayName = 'LinkList.Content'
