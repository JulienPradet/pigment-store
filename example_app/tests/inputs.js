import Occitest from 'occitest'
import TextField from '../src/components/form/TextField'
import NumberField from '../src/components/form/NumberField'

export default Occitest.describe('Inputs')
  .component('Text input', TextField, function(component) {
    component
      .feature(
        'Default text field',
        {
          value: 'value',
          name: 'name'
        }
      )
      .feature(
        'With placeholder',
        {
          name: 'palceholder',
          placeholder: 'placeholder...'
        }
      )
  })
  .component('Number input', NumberField, function(component) {
    component
      .feature(
        'Default number field',
        {
          value: 'value',
          name: 'name'
        }
      )
  })
