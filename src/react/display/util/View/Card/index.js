import React from 'react'
import Transition from 'react-motion-ui-pack'
import Collapse from 'react-collapse'
import { spring } from 'react-motion'
import {compose, branch, withHandlers, withState} from 'recompose'
import styles from './card.css'

const Title = ({closed, onClick, children}) => <div className={styles.title}>
  <div className={styles.titleContent}>
    {children}
  </div>
  {onClick
    ? <div className={styles.titleButton}>
      <button onClick={onClick}>{closed ? 'v' : '^'}</button>
    </div>
    : null}
</div>

const Content = ({children}) => <div className={styles.content}>{children}</div>

const Card = ({closed, title, subTitle, children, toggle}) => {
  return <div className={styles.container}>
    <Title closed={closed} onClick={toggle}>{title}</Title>
    {subTitle ? <Content>{subTitle}</Content> : null}
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
