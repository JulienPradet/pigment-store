import describe from 'pigment-store/react/describe'
import NumberField from '../../../src/components/form/NumberField'

export default describe('NumberField', NumberField)
  .feature(
    'Default number field',
    { value: 'value', name: 'name' }
  )
