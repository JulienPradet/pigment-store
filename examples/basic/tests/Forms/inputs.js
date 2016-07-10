import PigmentStore from 'pigment-store'
import TextField from '../../src/components/form/TextField'
import NumberField from '../../src/components/form/NumberField'

export default PigmentStore.React.describe('Inputs')
  .component('Text input', TextField, (component) => component
    .default(
      { value: 'value', name: 'name' }
    )
    .feature(
      'With placeholder',
      { name: 'palceholder', placeholder: 'placeholder...' }
    ))
  .component('Number input', NumberField, (component) => component
    .feature(
      'Default number field',
      { value: 'value', name: 'name' }
    ))
