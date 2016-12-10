import React from 'react'
import classnames from 'classnames'
import {withHandlers} from 'recompose'
import Slider from 'rc-slider'
import './slider.css'
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
    <Slider
      min={25}
      max={400}
      value={parseInt(zoom)}
      onChange={onChange}
      tipFormatter={null}
    />
  </div>
</div>)

Zoom.displayName = 'Zoom'

export default Zoom
