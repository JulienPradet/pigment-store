import PigmentStore from 'pigment-store'
import TextField from '../../../src/components/form/TextField'

export default PigmentStore.React.describe('Text Field', TextField)
  .feature(
    'Default',
    { value: 'value', name: 'name' }
  )
  .feature(
    'With placeholder',
    { name: 'palceholder', placeholder: 'placeholder...' }
  )
