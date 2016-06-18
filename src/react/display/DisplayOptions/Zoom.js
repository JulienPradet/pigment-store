import React from 'react'
import {Group, Item} from '../util/View/HorizontalMenu'

const Zoom = ({zoom, onChange}) => <Group>
  <Item>
    <input type='number' step='5' value={zoom} onChange={(event) => onChange({ zoom: event.currentTarget.value })} />
    %
  </Item>
</Group>

export default Zoom
