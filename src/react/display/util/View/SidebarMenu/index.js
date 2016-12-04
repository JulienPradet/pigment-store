import React from 'react'
import classnames from 'classnames'
import styles from './sidebar.css'

export const SidebarMenu = ({children}) => <div>{children}</div>
SidebarMenu.displayName = 'SidebarMenu.SidebarMenu'

export const MenuTitle = ({children}) => <h2 className={styles.title}>{children}</h2>
MenuTitle.displayName = 'SidebarMenu.MenuTitle'

export const Container = ({children}) => <ul className={styles.list}>
  {children}
</ul>
Container.displayName = 'SidebarMenu.Container'

export const Item = ({isActive, fade, children}) => <li className={classnames(styles.item, {[styles.activeItem]: isActive, [styles.fade]: fade})}>
  {children}
</li>
Item.displayName = 'SidebarMenu.Item'

export const Search = ({search, onChange}) => {
  return <div className={styles.search}>
    <input type='text' value={search} onChange={(e) => onChange(e.target.value)} placeholder='Search...' />
    <button onClick={() => onChange('')}>
      <i className='material-icons'>
        {search ? 'close' : 'search'}
      </i>
    </button>
  </div>
}
Search.displayName = 'SidebarMenu.Search'
