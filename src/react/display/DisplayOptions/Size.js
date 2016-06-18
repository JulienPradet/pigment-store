import React from 'react'
import {Group, Item} from '../util/View/HorizontalMenu'

const Size = ({size, onChange}) => <Group>
  <Item>
    <input type='text' value={size.width} onChange={(event) => onChange({ width: event.currentTarget.value })} />
    px
  </Item>
  <Item>
    <input type='text' value={size.height} onChange={(event) => onChange({ height: event.currentTarget.value })} />
    px
  </Item>
</Group>

export default Size
