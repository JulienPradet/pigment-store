import React from 'react'
import {Group, Item} from '../util/View/HorizontalMenu'

const randomPreset = () => {
  const width = parseInt(Math.random() * 2000) + 300

  const zoom = window.innerWidth * 0.8 < width ? (window.innerWidth * 0.8 / width * 100).toFixed(0) : '100'

  return ({
    size: {
      width: width,
      height: 'auto'
    },
    zoom: zoom
  })
}

export default ({presets, onSelect}) => <Group>
  {presets.map(({name, preset}) => <Item key={name}>
    <button onClick={() => onSelect(preset)}>{name}</button>
  </Item>)}
  <Item>
    <button onClick={() => onSelect(randomPreset())}>Random</button>
  </Item>
</Group>
