import React from 'react'
import classnames from 'classnames'
import styles from './horizontalmenu.css'

export const PresetList = ({presets, onSelect, selected}) => <div className={styles.presetList}>
  {presets.map((preset, index) => <Preset key={index} active={preset.preset === selected} preset={preset} onSelect={onSelect} />)}
</div>

export const Preset = ({active, preset, onSelect}) => <div className={classnames(styles.preset, {[styles.presetActive]: active})}>
  <button onClick={() => onSelect(preset.preset)}>{preset.label}</button>
</div>
