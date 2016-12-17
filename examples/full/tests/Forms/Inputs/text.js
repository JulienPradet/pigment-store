import describe from 'pigment-store/react/describe'
import TextField from '../../../src/components/form/TextField'

export default describe('TextField', TextField)
  .feature(
    'Default',
    { value: 'value', name: 'name' }
  )
  .feature(
    'With placeholder',
    { name: 'palceholder', placeholder: 'placeholder...' }
  )
