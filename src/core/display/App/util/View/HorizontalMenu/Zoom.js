import React from 'react'
import classnames from 'classnames'
import {withHandlers} from 'recompose'
import styles from './horizontalmenu.css'

const Zoom = (
  withHandlers({
    onChange: ({onChange}) => (value) => onChange({zoom: value})
  })
)(({zoom, onChange}) => <div className={styles.zoom}>
  <div className={styles.zoomItem}>
    Zoom
    <input type='number' step='5' value={zoom} onChange={(event) => onChange(event.currentTarget.value)} />
    %
  </div>
  <div className={classnames(styles.zoomItem, styles.zoomSlider)}>
  </div>
</div>)

Zoom.displayName = 'Zoom'

export default Zoom
