import React from 'react'
import classnames from 'classnames'
import styles from './sidebar.css'

export const MenuTitle = ({children}) => <h2 className={styles.title}>{children}</h2>

export const Container = ({children}) => <ul className={styles.list}>
  {children}
</ul>

export const Item = ({isActive, fade, children}) => <li className={classnames(styles.item, {[styles.activeItem]: isActive, [styles.fade]: fade})}>
  {children}
</li>

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
