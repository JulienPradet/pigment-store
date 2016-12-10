import React from 'react'
import {compose, lifecycle, withState, withHandlers} from 'recompose'
import Switch from 'rc-switch'
import './switch.css'
import styles from './horizontalmenu.css'

const SizeInput = compose(
  withState('auto', 'setAuto', (props) => props.value === 'auto'),
  withState('lastValue', 'setLastValue', (props) => props.value === 'auto' ? 0 : props.value),
  lifecycle({
    componentWillReceiveProps (props) {
      if ((props.auto && props.value === 'auto') || (!props.auto && props.value !== 'auto')) {
        return
      }

      props.setAuto(props.value === 'auto')
      if (props.value !== 'auto') {
        props.setLastValue(props.value)
      }
    }
  }),
  withHandlers({
    toggle: ({name, value, onChange, lastValue, setLastValue, auto, setAuto}) => (active) => {
      if (!active) {
        setAuto(true)
        setLastValue(value)
        onChange({[name]: 'auto'})
      } else {
        setAuto(false)
        onChange({[name]: lastValue})
      }
    },
    onChange: ({name, onChange, setLastValue, auto}) => (e) => {
      if (!auto) {
        setLastValue(e.target.value)
        onChange({[name]: e.target.value})
      }
    }
  })
)(({label, name, value, lastValue, toggle, onChange, auto}) => <div className={styles.sizeInput}>
  <div>
    <Switch checked={!auto} onChange={toggle} />
  </div>
  <div>
    {label}
  </div>
  <div>
    <input type='number' value={value === 'auto' ? lastValue : value} onChange={onChange} disabled={auto} />
    px
  </div>
</div>)

const Size = (
  withHandlers({
    onChange: ({size, onChange}) => (newSize) => onChange({size: Object.assign({}, size, newSize)})
  })
)(({size, onChange}) => <div className={styles.size}>
  <SizeInput label='Width' name='width' value={size.width} onChange={onChange} />
  <SizeInput label='Height' name='height' value={size.height} onChange={onChange} />
</div>)

Size.displayName = 'Size'

export default Size
