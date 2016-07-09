import React from 'react'
import Collapse from 'react-collapse'
import {compose, branch, withHandlers, withState} from 'recompose'
import styles from './card.css'

const Title = ({closed, onClick, children}) => <div className={styles.title}>
  <div className={styles.titleContent}>
    {children}
  </div>
  {onClick
    ? <div className={styles.titleButton}>
      <button onClick={onClick}>
        <i className='material-icons'>{closed ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</i>
      </button>
    </div>
    : null}
</div>

const Content = ({children}) => <div className={styles.content}>{children}</div>

const Card = ({id, closed, title, subTitle, children, toggle}) => {
  return <div className={styles.container} id={id}>
    <div className={styles.titleContainer} onClick={toggle}>
      <Title closed={closed} onClick={toggle}>{title}</Title>
      {subTitle ? <Content>{subTitle}</Content> : null}
    </div>
    {children
      ? <Collapse
        isOpened={!closed}
      >
        <div className={styles.collapsibleContent}>
          {children}
        </div>
      </Collapse>
      : null}
  </div>
}

export default compose(
  branch(
    (props) => props.closable,
    (BaseComponent) => BaseComponent,
    () => Card
  ),
  withState('closed', 'setClosed', (props) => props.defaultClosed),
  withHandlers({
    toggle: (props) => () => props.setClosed(!props.closed)
  })
)(Card)
